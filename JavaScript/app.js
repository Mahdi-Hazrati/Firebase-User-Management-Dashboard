const createNewUserButton = document.getElementById("creare-user-submit");
const userFirstNameInput = document.getElementById("input-first-name");
const userLastNameInput = document.getElementById("input-last-name");
const usernameInput = document.getElementById("input-username");
const userEmailInput = document.getElementById("input-email");
const usersContainer = document.querySelector(".users-container");
const modalMainContainer = document.querySelector(".modal-container");
const modalDeleteUserWindow = document.querySelector(".delete-user-modal");
const modalEditeUserWindow = document.querySelector(".edit-user-modal");
let usersDB = {};
const endPointUrl ="{PUT YOUR PROJECT NAME HERE}.firebaseio.com/";

createNewUserButton.addEventListener("click", () => {
    let firstName = userFirstNameInput.value;
    let lastName = userLastNameInput.value;
    let username = usernameInput.value;
    let email = userEmailInput.value;

    let newUserObject = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        mail: email,
    };
    if (firstName && lastName && username && email) {
        // Call firebase API to create new user
        fetch(`${endPointUrl}/users.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserObject),
        })
            .then((respoonse) => {
                return respoonse.json();
            })
            .then((jsonResponse) => {
                console.log(jsonResponse);
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

        // clean Input Value
        userFirstNameInput.value = "";
        userLastNameInput.value = "";
        usernameInput.value = "";
        userEmailInput.value = "";
    } else {
        console.warn("** Check Input's Value **");
    }
});

window.addEventListener("load", () => {
    usersContainer.insertAdjacentHTML("beforeend", `<p>Loading... </p>`);
    fetch(`${endPointUrl}/users.json`, { method: "GET" })
        .then((respoonse) => {
            if (respoonse.ok) {
                console.log("ok200 GET api success");
                return respoonse.json();
            } else {
                return null;
            }
        })
        .then((JSONResponse) => {
            if (usersDB !== null) {
                usersDB = JSONResponse;
                generateUsersList(Object.entries(usersDB));
            } else {
                usersDB = {};
                console.log("usersDB", null);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

function generateUsersList(usersList) {
    usersContainer.innerHTML = "";
    usersList.forEach((user) => {
        let userDetail = user[1];
        let userTempleteString = `                   
    <div class="user">
        <div class="information">
            <div class="names">
                <div class="first">${userDetail.first_name}</div>
                <div class="last">${userDetail.last_name}</div>
            </div>
            <div class="account">
                <div class="username">@${userDetail.username}</div>
                <div class="email">${userDetail.mail}</div>
            </div>
        </div>
        <div class="action">
            <div class="button-container">
                <input
                    type="button"
                    value="edit"
                    id="edit-user-btn"
                    onclick="openEditUserModal('${user[0]}')"
                />
                <input
                    type="button"
                    value="delete"
                    id="delete-user-btn"
                    onclick="openDeleteUserModal('${user[0]}')"
                />
            </div>
        </div>
    </div>
    `;

        usersContainer.insertAdjacentHTML("beforeend", userTempleteString);
    });
}

function openEditUserModal(ID) {
    console.log("open edit modal", ID);

    handleModal(true, false, true);

    const closeButton = document.querySelector("#close");
    const SaveButton = document.querySelector("#save");

    let db = Object.entries(usersDB);
    let selecetUser = db.find((u) => {
        return u[0] === ID;
    });

    let fname = document.querySelector(
        ".edit-user-modal > form > #input-first-name"
    );
    let lname = document.querySelector(
        ".edit-user-modal > form > #input-last-name"
    );
    let uname = document.querySelector(
        ".edit-user-modal > form > #input-username"
    );
    let email = document.querySelector(
        ".edit-user-modal > form > #input-email"
    );

    fname.value = selecetUser[1].first_name;
    lname.value = selecetUser[1].last_name;
    uname.value = selecetUser[1].username;
    email.value = selecetUser[1].mail;

    closeButton.addEventListener("click", () => {
        handleModal(false, false, false);
        console.log("click on close edit modal");
    });
    SaveButton.addEventListener("click", () => {
        handleModal(false, false, false);
        console.log("click on save edit modal");
        if (fname.value && lname.value && uname.value && email.value) {
            let userNewData = {
                first_name: fname.value,
                last_name: lname.value,
                username: uname.value,
                mail: email.value,
            };
            fetch(`${endPointUrl}/users/${ID}.json`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(userNewData),
            })
                .then((respoonse) => {
                    console.log(respoonse);
                    location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.warn("Check User Edit INPUT");
        }

        // Call Save New Data API
    });
}

function openDeleteUserModal(ID) {
    console.log("open delete modal", ID);
    handleModal(true, true, false);

    const NoKeepIt = document.querySelector("#no");
    const YesDelete = document.querySelector("#yes");
    const usernameContainer = document.querySelector(
        ".delete-user-modal > p > .username"
    );
    let db = Object.entries(usersDB);
    let selecetUser = db.find((u) => {
        return u[0] === ID;
    });

    usernameContainer.innerHTML = `@${selecetUser[1].username}`;

    NoKeepIt.addEventListener("click", () => {
        handleModal(false, false, false);
        console.log("click on close delete modal");
    });
    YesDelete.addEventListener("click", () => {
        handleModal(false, false, false);
        console.log("click on delete user", selecetUser);
        fetch(`${endPointUrl}/users/${ID}.json`, { method: "DELETE" })
            .then((respoonse) => {
                console.log(respoonse.status);
                location.reload();
            })
            .catch((error) => {
                console.warn(error);
            });
    });
}

// handle open of modal
function handleModal(modalContainer, deleteModal, editModal) {
    if (modalContainer === true && editModal === true) {
        modalMainContainer.style.display = "flex";
        modalEditeUserWindow.style.display = "flex";
    } else if (modalContainer === true && deleteModal === true) {
        modalMainContainer.style.display = "flex";
        modalDeleteUserWindow.style.display = "flex";
    } else if (
        modalContainer === false &&
        deleteModal === false &&
        editModal === false
    ) {
        modalMainContainer.style.display = "none";
        modalDeleteUserWindow.style.display = "none";
        modalEditeUserWindow.style.display = "none";
    } else {
        modalMainContainer.style.display = "none";
        modalDeleteUserWindow.style.display = "none";
        modalEditeUserWindow.style.display = "none";
    }
}







// by Mahdi Hazrati at 2023 04 19

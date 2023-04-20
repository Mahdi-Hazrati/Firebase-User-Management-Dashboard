# Firebase Realtime Database User Management Dashboard

This is a simple **client-side dashboard** built with **HTML**, **CSS**, and **JavaScript** that interacts with the** Firebase Realtime Database** API to **create**, **delete**, **show**, and **edit** user information. The project uses** vanilla JavaScript** and does not require any external libraries or frameworks. All **CRUD** operations are performed through **HTTP requests** to the Firebase Realtime Database **API**.


## Features
- Create new users in the Firebase Realtime Database
- Retrieve a list of all users in the database
- Update user information in the database
- Delete users from the database

## Usage
To use the application, simply clone the repository and open the `index.html` file in your browser.
Before running the application, make sure you have set up a Firebase project and updated the Firebase configuration values in `JavaScript/app.js` and  with your own Firebase project credentials.

```JavaScript
const endPointUrl ="{PUT YOUR PROJECT NAME HERE}.firebaseio.com/"
```

## Creating a User

To create a new user, click the "Create User" button and fill out the form fields with the user's name, email address, and password. Click the "Save Changes" button to add the new user to the Firebase Realtime Database.


## Retrieving User Data
To retrieve a list of all users in the database, click the "Show Users" button. The dashboard will display a table of all users in the database, including their name, email address, and unique ID.

## Updating User Data
To update a user's data, click the "Edit User" button next to the user's information in the table. Make any necessary changes to the form fields and click the "Save Changes" button to update the user's information in the Firebase Realtime Database.

## Deleting a User
To delete a user from the database, click the "Delete User" button next to the user's information in the table. The backend will remove the specified user from the Firebase Realtime Database.

### Endpoint URLs
To make **GET**, **DELETE**, **PUT**, and **POST** requests to the Firebase Realtime Database API, use the following endpoint URLs:

- **GET**: `https://<your-firebase-project-id>.firebaseio.com/users.json`
- **DELETE**: `https://<your-firebase-project-id>.firebaseio.com/users/<user-id>.json`
- **PUT**: `https://<your-firebase-project-id>.firebaseio.com/users/<user-id>.json`
- **POST**: `https://<your-firebase-project-id>.firebaseio.com/users.json`

> Replace `<your-firebase-project-id>` with your actual Firebase project ID and `<user-id>` with the unique ID of the user you want to delete or update.

### Contributing
Contributions are always welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

### Support
If you find this project helpful, please consider giving it a star on GitHub. It helps others discover the project and encourages me to keep working on it.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

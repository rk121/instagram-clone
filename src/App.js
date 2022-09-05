import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/header/Header";
import Posts from "./components/post/Posts";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Profile from "./components/profile/Profile";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [isUserloggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    return await fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setCurrentUsers(data));
  };

  const addNewUser = async (data) => {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setCurrentUsers((prevUsers) => [...prevUsers, data]));
  };

  const userAuth = (data) => {
    const userIndex = currentUsers.findIndex(
      (user) => user.email === data.email && user.password === data.password
    );
    if (userIndex !== -1) {
      setIsUserLoggedIn(true);
      setLoggedInUser(currentUsers[userIndex]);
      handleLoginOpen();
    }
  };

  const logOutHandler = () => {
    handleLogOutOpen();
    setIsUserLoggedIn(false);
    setLoggedInUser(null);
  };

  const changeAccountDetailsHandler = (data) => {
    console.log(data);
    fetch(`http://localhost:3000/users/${data.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    const newState = currentUsers.map((obj) => {
      if (obj.id === data.id) {
        return { ...obj, data };
      }
      return obj;
    });

    const newLoggedInUserIndex = currentUsers.findIndex(
      (user) => data.id === user.id
    );

    console.log(currentUsers[newLoggedInUserIndex]);

    setLoggedInUser(currentUsers[newLoggedInUserIndex]);
    setCurrentUsers(newState);
  };

  const [open, setOpen] = useState(false);
  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [logOutAlertOpen, setLogOutAlertOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLoginOpen = () => setLoginAlertOpen(true);
  const handleLoginClose = () => setLoginAlertOpen(false);

  const handleLogOutOpen = () => setLogOutAlertOpen(true);
  const handleLogOutClose = () => setLogOutAlertOpen(false);

  const newPostHandler = (data) => {
    console.log(data);
    fetch(`http://localhost:3000/users/${loggedInUser.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",

      // Fields that to be updated are passed
      body: JSON.stringify({ posts: [data, ...loggedInUser.posts] }),
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });

    const newState = currentUsers.map((obj) => {
      if (obj.id === loggedInUser.id) {
        return { ...obj, posts: [data, ...loggedInUser.posts] };
      }
      return obj;
    });

    setCurrentUsers(newState);
  };

  return (
    <div className="App">
      <Header
        handleOpen={handleOpen}
        isUserloggedIn={isUserloggedIn}
        logOutHandler={logOutHandler}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Posts
              users={currentUsers}
              newPostHandler={newPostHandler}
              open={open}
              handleClose={handleClose}
              loggedInUser={loggedInUser}
            />
          }
        />
        <Route path="/signin" element={<SignIn signInHandler={userAuth} />} />
        <Route
          path="/signup"
          element={<SignUp newUserHandler={addNewUser} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              loggedInUser={loggedInUser}
              isUserloggedIn={isUserloggedIn}
              changeAccountDetailsHandler={changeAccountDetailsHandler}
            />
          }
        />
      </Routes>
      <Snackbar
        open={loginAlertOpen}
        onClose={handleLoginClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleLoginClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Welcome back, You have successfully logged in!
        </Alert>
      </Snackbar>
      <Snackbar
        open={logOutAlertOpen}
        onClose={handleLogOutClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleLogOutClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Good bye! Log out successful
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

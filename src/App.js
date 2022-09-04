import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/header/Header";
import Posts from "./components/post/Posts";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Profile from "./components/profile/Profile";

function App() {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [isUserloggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dogPictureURLS, setDogPictureURLS] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchDogPicture();
  }, []);

  const fetchUsers = async () => {
    return await fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setCurrentUsers(data));
  };

  const fetchDogPicture = async () => {
    return await fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setDogPictureURLS(data.message);
      });
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
    }
  };

  const logOutHandler = () => {
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

      // Fields that to be updated are passed
      body: JSON.stringify(data),
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

    fetchUsers();
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
              dogPictureURLS={dogPictureURLS}
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
    </div>
  );
}

export default App;

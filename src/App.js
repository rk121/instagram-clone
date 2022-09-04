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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUsers();
    setPosts();
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
    console.log(
      currentUsers.filter(
        (user) => user.email === data.email && user.password === data.password
      )
    );
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newPostHandler = (data) => {
    console.log(data);
    // setPosts((prevPosts) => {
    //   return [...prevPosts, data];
    // });
  };

  return (
    <div className="App">
      <Header handleOpen={handleOpen} />
      <Routes>
        <Route
          path="/"
          element={
            <Posts
              currentUsers={currentUsers}
              newPostHandler={newPostHandler}
              open={open}
              handleClose={handleClose}
            />
          }
        />
        <Route path="/signin" element={<SignIn signInHandler={userAuth} />} />
        <Route
          path="/signup"
          element={<SignUp newUserHandler={addNewUser} />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

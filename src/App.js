import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/header/Header";
import Posts from "./components/post/Posts";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Profile from "./components/profile/Profile";

const data = [
  {
    id: 1,
    username: "Roshan",
    img: "./images/post1.jpg",
    caption: "What a great view! Just fabolous",
  },
];

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  useEffect(() => {
    fetchWeather();
  });

  const fetchWeather = async () => {
    await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
    )
      .then((res) => res.json())
      .then((data) => setCurrentWeather(data));
  };

  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState(data);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newPostHandler = (data) => {
    console.log(data);
    setPosts((prevPosts) => {
      return [...prevPosts, data];
    });
  };

  return (
    <div className="App">
      <Header handleOpen={handleOpen} />
      <Routes>
        <Route
          path="/"
          element={
            <Posts
              posts={posts}
              newPostHandler={newPostHandler}
              open={open}
              handleClose={handleClose}
            />
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

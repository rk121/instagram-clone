import React, { useState, useEffect } from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import SideBar from "./SideBar";
import { Grid } from "@mui/material";

function Posts({ users, newPostHandler, open, handleClose, loggedInUser }) {
  const [dogPictureURL, setDogPictureURL] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const fetchWeather = async (lat, lon) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=170130aae1cf135dcaf382cd1bef0ada`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setCurrentWeather(data);
      });
  };

  const fetchDogPicture = async () => {
    return await fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setDogPictureURL(data.message);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      fetchWeather(position.coords.latitude, position.coords.longitude);
    });
    fetchDogPicture();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={12}
      sx={{ mx: "auto" }}
    >
      <Grid item sx={{}}>
        <NewPost
          newPostHandler={newPostHandler}
          open={open}
          handleClose={handleClose}
          loggedInUser={loggedInUser}
        />
        {users.map((user) => (
          <Post posts={user.posts} />
        ))}
      </Grid>
      <Grid item sx={{ my: 4 }}>
        <SideBar dogPictureURL={dogPictureURL} weather={currentWeather} />
      </Grid>
    </Grid>
  );
}

export default Posts;

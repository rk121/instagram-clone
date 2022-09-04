import React, { useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import SideBar from "./SideBar";
import { Grid } from "@mui/material";

function Posts({ currentUsers, newPostHandler, open, handleClose }) {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    currentUsers.forEach((user) => {
      if (user.posts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...user.post]);
      }
    });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item sx={{ mx: "auto" }}>
        <NewPost
          newPostHandler={newPostHandler}
          open={open}
          handleClose={handleClose}
        />
        {}
      </Grid>
      <Grid item sx={{ mx: "auto" }}>
        <SideBar />
      </Grid>
    </Grid>
  );
}

export default Posts;

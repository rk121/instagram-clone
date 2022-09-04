import React from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import SideBar from "./SideBar";
import { Grid } from "@mui/material";

function Posts({ posts, newPostHandler, open, handleClose }) {
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
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </Grid>
      <Grid item sx={{ mx: "auto" }}>
        <SideBar />
      </Grid>
    </Grid>
  );
}

export default Posts;

import React from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import SideBar from "./SideBar";
import { Grid } from "@mui/material";

function Posts({
  users,
  newPostHandler,
  open,
  handleClose,
  loggedInUser,
  dogPictureURLS,
}) {
  return (
    <Grid container direction="row" justifyContent="space-around">
      <Grid item sx={{ mx: "auto" }}>
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
      <Grid item sx={{ mx: "auto", my: 4 }}>
        <SideBar dogPictureURLS={dogPictureURLS} />
      </Grid>
    </Grid>
  );
}

export default Posts;

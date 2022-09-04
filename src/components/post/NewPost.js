import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NewPost({ newPostHandler, open, handleClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState(null);
  const [caption, setCaption] = useState(null);

  const filePickerRef = useRef(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const captionChangeHandler = (e) => {
    setCaption(e.target.value);
  };

  const clickHandler = () => {
    newPostHandler({
      id: Math.round(Math.random() * 999999999),
      username: username,
      img: selectedFile,
      caption: caption,
    });
    setUsername(null);
    setSelectedFile(null);
    setCaption(null);
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Card sx={style}>
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item sx={{ my: 2 }}>
              {selectedFile ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={selectedFile}
                  alt=""
                  onClick={() => setSelectedFile(null)}
                />
              ) : (
                <Tooltip
                  title="Profile"
                  onClick={() => filePickerRef.current.click()}
                >
                  <IconButton>
                    <PhotoCameraBackIcon
                      fontSize="large"
                      sx={{ color: "red" }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item>
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImageToPost}
              />

              <TextField
                onChange={usernameChangeHandler}
                required
                label="Username"
                type="text"
                id="username"
              />
            </Grid>
            <Grid item>
              <TextField
                onChange={captionChangeHandler}
                type="text"
                id="caption"
                required
                label="Enter your caption"
                sx={{ my: 2 }}
              />
            </Grid>
            <Grid item>
              <Button onClick={clickHandler} variant="outlined">
                Post
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </div>
  );
}

export default NewPost;

import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";

export default function Profile(props) {
  console.log(props);
  const [name, setName] = useState("");
  const [changedName, setChangedName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      await fetch(`http://localhost:3000/users/${props.loggedInUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
        });
    };

    fetchUser();

    // if (props.loggedInUser != null) {
    //   setName(props.loggedInUser.name);
    //   setEmail(props.loggedInUser.email);
    // }
  }, [changedName]);

  // const setUserDetailsState = () => {
  //   if (props.loggedInUser != null) {
  //     setName(props.loggedInUser.name);
  //     setEmail(props.loggedInUser.email);
  //   }
  // };

  // setUserDetailsState();

  const handleSubmit = (event) => {
    event.preventDefault();
    setChangedName(name);
    props.changeAccountDetailsHandler({
      id: props.loggedInUser.id,
      name: name,
      email: email,
    });
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      {props.isUserloggedIn ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {/* {post.username.charAt(0)} */}R
              </Avatar>
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                value={name}
                onChange={nameChangeHandler}
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                value={email}
                onChange={emailChangeHandler}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                disabled
                value={props.loggedInUser.password}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <Navigate to="/signin" />
      )}
    </div>
  );
}

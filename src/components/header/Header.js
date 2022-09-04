import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import PetsIcon from "@mui/icons-material/Pets";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function Header({ handleOpen, isUserloggedIn, logOutHandler }) {
  const navigate = useNavigate();

  const clickHandler = () => {
    if (isUserloggedIn) {
      return handleOpen();
    } else {
      navigate("/signin");
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ mb: 2, boxShadow: 3, py: 2 }}
    >
      <Grid item xs={2}>
        <Avatar src="./images/logo.png" alt="" />
      </Grid>
      <Grid item xs={4}>
        <Input
          type="text"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Search"
        />
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Link to="/">
              <Tooltip title="Home">
                <IconButton sx={{ color: "red" }}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item>
            <Tooltip title="New Post" onClick={clickHandler}>
              <IconButton sx={{ color: "red" }}>
                <AddAPhotoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Link to="/profile">
              <Tooltip title="Profile">
                <IconButton sx={{ color: "red" }}>
                  <PetsIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item>
            {isUserloggedIn ? (
              <Link to="/">
                <Tooltip title="Log Out" onClick={logOutHandler}>
                  <IconButton sx={{ color: "red" }}>
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            ) : (
              <Link to="/signin">
                <Tooltip title="Log In">
                  <IconButton sx={{ color: "red" }}>
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Header;

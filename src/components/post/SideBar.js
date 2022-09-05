import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

function SideBar({ dogPictureURL, weather }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  console.log();

  return (
    <div>
      {dogPictureURL != undefined && weather != undefined && weather != null ? (
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            component="img"
            alt="Good dog of the day"
            height="400"
            image={dogPictureURL}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Today's Good boy of the day!
            </Typography>
            <Avatar
              sx={{ bgcolor: "#f3f3", my: 2, mx: "auto" }}
              alt={weather.weather[0].description}
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <Typography gutterBottom variant="h5" component="div">
              Today's weather is{" "}
              {capitalizeFirstLetter(weather.weather[0].description)}.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        "No data found :("
      )}
    </div>
  );
}

export default SideBar;

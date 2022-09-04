import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function SideBar({ dogPictureURLS }) {
  console.log(dogPictureURLS);
  return (
    <div>
      {dogPictureURLS != undefined ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="Good dog of the day"
            height="300"
            image={dogPictureURLS}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Today's Good of the day!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        "Uh no! No dog images :("
      )}
    </div>
  );
}

export default SideBar;

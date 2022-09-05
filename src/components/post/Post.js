import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function Post({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} sx={{ maxWidth: 800, my: 4, mx: "auto" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="profile-logo">
                {post.name !== undefined ? (
                  post.name.charAt(0)
                ) : (
                  <AccountBoxIcon />
                )}
              </Avatar>
            }
            title={post.name}
          />
          <CardMedia
            component="img"
            height="500"
            image={post.img}
            alt={post.caption}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.caption}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

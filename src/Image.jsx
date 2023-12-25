import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Image(props) {
  const [like, liked] = useState(false);
  return (
    <div className="ImageDiv">
      <FavoriteIcon
        className="LikeButton"
        color={like ? "warning" : "disable"}
        onClick={() => {
          liked((prev) => !prev);
          like
            ? props.removePhoto(props.url.id)
            : props.favourite(props.url.id);
        }}
      />
      <img className="Image" src={props.src} alt={props.altText}></img>
      <div className="Photographer">
        <a target="_blank" href={props.url.photographer_url}>
          <PersonIcon /> <p>{props.name}</p>
        </a>
        <a target="_blank" href={props.url.url}>
          <DownloadIcon className="icon" />
        </a>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Favourite(props) {
  const [photo, setPhoto] = useState({ src: { tiny: "" } });

  const API = `https://api.pexels.com/v1/photos/`;

  let AuthKey = process.env.REACT_APP_AUTH;

  const fetchApi = async (URL) => {
    try {
      await fetch(URL, {
        headers: {
          Authorization: AuthKey,
        },
      })
        .then((dataResult) => {
          return dataResult.json();
        })
        .then((res) => {
          setPhoto(res);
        });
    } catch (error) {
      console.log("Error occurs");
    }
  };
  useEffect(() => {
    fetchApi(API + props.src);
  }, [API]);

  return (
    <>
      <div className="favImages">
        <a target="__blank" href={photo.url}>
          <img src={photo.src.tiny} alt="" />
        </a>
        <IconButton
          onClick={() => {
            props.removePhoto(props.id);
          }}
        >
          <DeleteIcon color="action" />
        </IconButton>
      </div>
    </>
  );
}

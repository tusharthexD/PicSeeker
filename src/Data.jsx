import React, { useEffect, useState } from "react";
import Image from "./Image";
import Footer from "./Footer";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Favourite from "./Favourite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Data() {
  const [query, setQuery] = useState("Bird");

  const [page, setPage] = useState(1);

  const [resource, setResource] = useState([]);

  const [favId, setFavId] = useState([]);

  const [favImg, setFavImg] = useState(false);

  const API = `https://api.pexels.com/v1/search/?page=${page}&per_page=15&query=${query}`;

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
          setResource(res);
        });
    } catch (error) {
      console.log("Error occurs");
    }
  };

  useEffect(() => {
    fetchApi(API);
  }, [API]);

  function queryChange(e) {
    setQuery(e.target.value);
  }
  function favourite(id) {
    setFavId((prevVal) => {
      return [...prevVal, id];
    });
  }
  function removePhoto(id) {
    setFavId((prevVal) => {
      return prevVal.filter((items) => {
        return items !== id;
      });
    });
  }

  return (
    <>
      <div id="favBtn">
        <IconButton
          onClick={() => {
            setFavImg((prev) => !prev);
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
        {favImg ? (
          <div id="FavImageSec">
            {favId.length !== 0 ? (
              favId.map((res) => (
                <Favourite
                  src={res}
                  key={res}
                  id={res}
                  removePhoto={removePhoto}
                />
              ))
            ) : (
              <p>No Picture Selected</p>
            )}
          </div>
        ) : null}
      </div>
      <p className="Heading">PicSeeker</p>
      <div className="Searchbar">
        <input value={query} onChange={queryChange}></input>

        <IconButton>
          <SearchIcon className="SearchIcon" />
        </IconButton>
      </div>
      {resource.total_results > 30 ? (
        <div id="nextPage">
          <p>Total page found {Math.round(resource.total_results / 15)}</p>
          <button className="btn" onClick={() => setPage(resource.page - 3)}>
            &#60;
          </button>
          <button id="ActiveBtn" onClick={() => setPage(resource.page)}>
            {resource.page}
          </button>
          <button className="btn" onClick={() => setPage(resource.page + 1)}>
            {resource.page + 1}
          </button>
          <button className="btn" onClick={() => setPage(resource.page + 2)}>
            {resource.page + 2}
          </button>
          ....
          <button className="btn" onClick={() => setPage(page + 3)}>
            Next
          </button>
        </div>
      ) : null}

      <div className="Suggesions">
        <button onClick={(e) => setQuery(e.target.innerText)}>Mountain</button>
        <button onClick={(e) => setQuery(e.target.innerText)}>Beaches</button>
        <button onClick={(e) => setQuery(e.target.innerText)}>Birds</button>
        <button onClick={(e) => setQuery(e.target.innerText)}>Food</button>
      </div>
      {resource.total_results == 0 ? (
        <h1>No result</h1>
      ) : (
        <div className="PictureSection">
          {resource.photos?.map((res, index) => (
            <Image
              key={index}
              src={res.src.medium}
              altText={res.alt}
              name={res.photographer}
              url={res}
              favourite={favourite}
              removePhoto={removePhoto}
            />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}

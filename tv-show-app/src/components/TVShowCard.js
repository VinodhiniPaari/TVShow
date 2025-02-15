import React from "react";
import { Link } from "react-router-dom";
import "../styles/TVShowCard.css";
import alternateImage from "../assets/images/alternateImage.jpg";

const TVShowCard = ({ show }) => {
  const imageUrl = show.image?.medium || show.imageUrl || alternateImage;
  console.log("TV Show Data:", show);

  return (
    <div className="col-md-2" style={{ cursor: "pointer" }}>
      <Link
        to={`/showDetails/${show.id}`}
        state={{ show }}
        className="card-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card tv-show-card">
          <img
            src={imageUrl}
            className="card-img-top"
            alt={show.name || "TV Show"}
            onError={(e) => {
              e.target.src = alternateImage;
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{show.name}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TVShowCard;

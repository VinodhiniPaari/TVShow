import React from "react";
import { Link } from "react-router-dom";
import "../styles/TVShowCard.css";
import alternateImage from "../assets/images/alternateImage.jpg";

const TVShowCard = ({ show }) => {
  const imageUrl = show.image?.medium || show.imageUrl || alternateImage;
  const imageLarge = show.image?.original || imageUrl;

  return (
    <div className="col-md-2 tv-show-card-container">
      <Link
        to={`/showDetails/${show.id}`}
        state={{ show }}
        className="card-link"
      >
        <div className="card tv-show-card">
          <img
            src={imageUrl}
            srcSet={`${imageUrl} 300w, ${imageLarge} 600w`}
            sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 250px"
            className="card-img-top"
            alt={show.name || "TV Show"}
            onError={(e) => {
              e.target.src = alternateImage;
            }}
            loading="lazy"
            width="250"
            height="375"
            fetchPriority="low"
          />
          <div className="hover-content">
            <h3 className="tv-show-title">{show.name}</h3>
            <button className="preview-button">Preview</button>
          </div>
          <div className="card-body">
            <h3 className="card-title">{show.name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TVShowCard;

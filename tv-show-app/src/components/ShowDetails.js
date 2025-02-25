import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../styles/ShowDetails.css";
import alternateImage from "../assets/images/alternateImage.jpg";

const ShowDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = location.state || {};

  if (!show || Object.keys(show).length === 0) {
    return (
      <p className="text-center text-light mt-5" role="alert">
        No Show Details Available
      </p>
    );
  }

  const imageUrl = show?.image?.original || show?.image?.medium || alternateImage;

  return (
    <div className="show-details-container">
      <Button
        variant="outline-light"
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Go back to TV Shows"
      >
        ← Back to TV Shows
      </Button>

      <div className="content-wrapper">
        <div className="image-container">
          <img
            src={imageUrl}
            alt={show?.name || "TV Show Poster"}
            className="show-image"
            onError={(e) => {
              e.target.src = alternateImage;
              e.target.alt = "Fallback TV Show Poster";
            }}
          />
        </div>

        <div className="details-container">
          <h2 className="show-title">{show?.name}</h2>
          <Card className="detail-card summary-card">
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <Card.Text
                dangerouslySetInnerHTML={{
                  __html: show?.summary || "No summary available.",
                }}
                aria-live="polite"
              />
            </Card.Body>
          </Card>

          <div className="show-details-grid">
            {/* Left Column */}
            <Card className="detail-card details-half">
              <Card.Body>
                <Card.Title>Basic Info</Card.Title>
                <ul className="details-list">
                  <li>
                    <strong>Language:</strong> {show?.language || "N/A"}
                  </li>
                  <li>
                    <strong>Genres:</strong> {show?.genres?.join(", ") || "N/A"}
                  </li>
                  <li>
                    <strong>Type:</strong> {show?.type || "N/A"}
                  </li>
                  <li>
                    <strong>Runtime:</strong>{" "}
                    {show?.runtime ? `${show.runtime} mins` : "N/A"}
                  </li>
                </ul>
              </Card.Body>
            </Card>

            {/* Right Column */}
            <Card className="detail-card details-half">
              <Card.Body>
                <Card.Title>Additional Details</Card.Title>
                <ul className="details-list">
                  <li>
                    <strong>Premiered:</strong> {show?.premiered || "N/A"}
                  </li>
                  <li>
                    <strong>Status:</strong> {show?.status || "N/A"}
                  </li>
                  <li>
                    <strong>Official Site:</strong>{" "}
                    {show?.officialSite ? (
                      <a
                        href={show.officialSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit official site for ${show?.name}`}
                      >
                        {show.officialSite}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </li>
                  <li>
                    <strong>Average Rating:</strong>{" "}
                    {show?.rating?.average || "N/A"}
                  </li>
                  <li>
                    <strong>Schedule:</strong>{" "}
                    {show?.schedule?.time
                      ? `${show.schedule.days.join(", ")} at ${
                          show.schedule.time
                        }`
                      : "N/A"}
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;

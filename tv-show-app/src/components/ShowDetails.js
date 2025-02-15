import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../styles/ShowDetails.css";
import alternateImage from "../assets/images/alternateImage.jpg";

const ShowDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = location.state || {};

  if (!show) {
    return (
      <p className="text-center text-light mt-5">No Show Details Available</p>
    );
  }

  const imageUrl = show.image?.original || show.image?.medium || alternateImage;

  return (
    <div className="show-details-container">
      <Button
        variant="outline-light"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back to TV Shows
      </Button>

      <div className="content-wrapper">
        <div className="image-container">
          <img
            src={imageUrl}
            alt={show.name}
            className="show-image"
            onError={(e) => (e.target.src = alternateImage)}
          />
        </div>

        <div className="details-container">
          <h2 className="show-title">{show.name}</h2>
          <Card className="detail-card summary-card">
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <Card.Text
                dangerouslySetInnerHTML={{
                  __html: show.summary || "No summary available.",
                }}
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
                    <strong>Language:</strong> {show.language || "N/A"}
                  </li>
                  <li>
                    <strong>Genres:</strong> {show.genres?.join(", ") || "N/A"}
                  </li>
                  <li>
                    <strong>Type:</strong> {show.type || "N/A"}
                  </li>
                  <li>
                    <strong>Runtime:</strong>{" "}
                    {show.runtime ? `${show.runtime} mins` : "N/A"}
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
                    <strong>Premiered:</strong> {show.premiered || "N/A"}
                  </li>
                  <li>
                    <strong>Status:</strong> {show.status || "N/A"}
                  </li>
                  <li>
                    <strong>Average Rating:</strong>{" "}
                    {show.rating?.average || "N/A"}
                  </li>
                  <li>
                    <strong>Schedule:</strong>{" "}
                    {show.schedule?.time
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

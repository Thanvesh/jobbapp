import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBookmark, FaRegBookmark, FaArrowRight } from 'react-icons/fa'; // Import icons
import { useJobContext } from '../JobContext';
import './JobCard.css'; // Custom CSS file for styling

const JobCard = ({ job, isBookmarked, onBookmark }) => {
  const { setSelectedJob } = useJobContext();

  const handleClick = () => {
    setSelectedJob(job);
  };

  return (
    <Card className="job-card mb-3 shadow-sm">
      {job.creatives && job.creatives.length > 0 && (
        <Card.Img
          className="job-card-image"
          variant="top"
          src={job.creatives[0].thumb_url}
          alt={job.title}
        />
      )}
      <Card.Body className="job-card-body">
        <Card.Title className="job-card-title">{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted job-card-role">{job.job_role}</Card.Subtitle>
        <Card.Text className="job-card-text">
          <div className="job-card-detail">
            <strong>Location:</strong> {job.primary_details?.Place || 'N/A'}
          </div>
          <div className="job-card-detail">
            <strong>Salary:</strong> {job.primary_details?.Salary || 'N/A'}
          </div>
          <div className="job-card-detail">
            <strong>Experience:</strong> {job.primary_details?.Experience || 'N/A'}
          </div>
          <div className="job-card-detail">
            <strong>Page:</strong> {job.page}
          </div> {/* Display page number */}
        </Card.Text>
        {/* Bookmark button with icon */}
        <div className="job-card-actions">
          <button
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={onBookmark}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? <FaBookmark className="bookmark-icon" /> : <FaRegBookmark className="bookmark-icon" />}
          </button>
          {/* View Details with Arrow Icon */}
          <Link 
            to={`/job/${job.id}`} 
            className="btn btn-info view-details-btn"
            onClick={handleClick}
          >
            View Details <FaArrowRight className="arrow-icon" />
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;

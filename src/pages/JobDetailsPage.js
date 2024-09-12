import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useJobContext } from '../JobContext';
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaMoneyBillAlt, FaBookmark, FaRegBookmark, FaArrowLeft } from 'react-icons/fa';
import './JobDetailsPage.css'; // Custom CSS for styling and animations

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, toggleBookmark, isBookmarked } = useJobContext();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const jobDetails = jobs.find(job => parseInt(job.id) === parseInt(id));
    if (jobDetails) {
      setJob(jobDetails);
      setLoading(false);
    } else {
      setError('Job not found');
      setLoading(false);
    }
  }, [id, jobs]);



  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="job-details-container">
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft /> 
      </button>
      <Card className="job-details-card">
        {job.creatives && job.creatives.length > 0 && (
          <Card.Img 
            variant="top" 
            src={job.creatives[0].file} 
            alt={job.title} 
            className="job-image" 
          />
        )}
        <div className="bookmark-icon" onClick={()=>toggleBookmark(job)}>
          {isBookmarked(job.id) ? <FaBookmark /> : <FaRegBookmark />}
        </div>
        <Card.Body>
          <Card.Title className="job-title">{job.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted job-role">{job.job_role}</Card.Subtitle>
          <Card.Text>
            <FaMapMarkerAlt className="icon" /> <strong>Location:</strong> {job.primary_details?.Place || 'N/A'}<br />
            <FaMoneyBillAlt className="icon" /> <strong>Salary:</strong> {job.primary_details?.Salary || 'N/A'}<br />
            <strong>Job Type:</strong> {job.primary_details?.Job_Type || 'N/A'}<br />
            <strong>Experience:</strong> {job.primary_details?.Experience || 'N/A'}<br />
            <strong>Qualification:</strong> {job.primary_details?.Qualification || 'N/A'}<br />
            <strong>Fees Charged:</strong> {job.primary_details?.Fees_Charged || 'N/A'}<br />
          </Card.Text>
          
          <Button 
            variant="primary" 
            href={`tel:${job.custom_link}`} 
            className="contact-button"
          >
            <FaPhoneAlt className="icon" /> Call HR
          </Button>
          {job.whatsapp_no && (
            <Button 
              variant="success" 
              className="mt-2 contact-button"
              href={`https://wa.me/${job.whatsapp_no}?text=Hi%2C+I+am+interested+in+the+job+opening+for+${encodeURIComponent(job.title)}`}
            >
              <FaWhatsapp className="icon" /> Contact via WhatsApp
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobDetailsPage;

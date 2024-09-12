import React, { useState, useEffect } from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import JobCard from '../components/JobCard';
import { getBookmarkedJobs, removeBookmark } from '../JobContext';
import './BookmarksPage.css'; // Add custom styles in a separate file

const BookmarksPage = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const jobs = getBookmarkedJobs();
      setBookmarkedJobs(jobs);
      setError(null);
    } catch (err) {
      setError('Failed to load bookmarks');
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  }, []);

  const handleRemoveBookmark = (job) => {
    removeBookmark(job.id); // Pass job.id to removeBookmark
    setBookmarkedJobs(bookmarkedJobs.filter(ejob => ejob.id !== job.id));
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="bookmarks-page">
      {error && <Alert variant="danger">{error}</Alert>}
      {bookmarkedJobs.length === 0 ? (
        <Alert variant="info">No bookmarks found</Alert>
      ) : (
        <Row>
          {bookmarkedJobs.map(job => (
            <Col key={job.id} xs={12} sm={6} md={4}>
              <JobCard 
                job={job} 
                isBookmarked={true} 
                onBookmark={() => handleRemoveBookmark(job)} // Call handleRemoveBookmark on click
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BookmarksPage;

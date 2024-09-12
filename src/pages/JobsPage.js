import React, { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import JobCard from '../components/JobCard';
import { getBookmarkedJobs, toggleBookmark } from '../JobContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useJobContext } from '../JobContext';
import { ScaleLoader } from 'react-spinners'; // Import ScaleLoader
import { FaBookmark, FaRegBookmark, FaArrowRight } from 'react-icons/fa'; // Import icons
import './JobsPage.css'

const JobsPage = () => {
  const { jobs, setJobs, page, getJobs, setPage, hasMore, setHasMore } = useJobContext();
  const [loading, setLoading] = useState(true); // Initial loading state is true
  const [error, setError] = useState(null);
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Start loading when fetching jobs
      try {
        const response = await getJobs(page);
        if (Array.isArray(response.results)) {
          const jobsWithPage = response.results.map(job => ({ ...job, page }));
          setJobs(prevJobs => [...prevJobs, ...jobsWithPage]);
          setHasMore(response.results.length > 0);
          setError('');
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch jobs');
      }
      setLoading(false); // Stop loading after jobs are fetched
    };

    fetchJobs();
  }, [page, setJobs, setHasMore]);

  useEffect(() => {
    const loadBookmarks = () => {
      const bookmarks = getBookmarkedJobs();
      setBookmarkedJobIds(bookmarks.map(job => job.id));
    };

    loadBookmarks();
  }, []);

  const handleBookmark = (job) => {
    const newBookmarks = toggleBookmark(job);
    setBookmarkedJobIds(newBookmarks.map(job => job.id));
  };
  

  const loadMoreJobs = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (loading && jobs.length === 0) {
    // Show loader when the initial data is being fetched
    return (
      <div className="loader-container">
        <ScaleLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="jobs-page">
      {error && <Alert variant="danger">{error}</Alert>}
      <InfiniteScroll
        dataLength={jobs.length}
        next={loadMoreJobs}
        hasMore={hasMore}
        loader={loading ? <div className="loader-container"><ScaleLoader color="#36d7b7" /></div> : null} 
        endMessage={<p>No more jobs to load</p>}
      >
        <Row className="jobs-row">
          {jobs.map((job, index) => (
            <Col key={`${job.id}-${job.page}-${index}`} xs={12} sm={6} md={4}>
              <JobCard 
                job={job} 
                isBookmarked={bookmarkedJobIds.includes(job.id)} 
                onBookmark={() => handleBookmark(job)}
                bookmarkIcon={bookmarkedJobIds.includes(job.id) ? <FaBookmark /> : <FaRegBookmark />}
                detailIcon={<FaArrowRight />}
              />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </div>
  );
};

export default JobsPage;

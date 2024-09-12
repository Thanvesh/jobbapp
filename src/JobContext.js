import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const JobContext = createContext();

export const useJobContext = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getJobById = async (id) => {
    const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${id}`);
    return response.data;
  };

  const getJobs = async (page) => {
    const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
    return response.data;
  };

  const isBookmarked = (jobId) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    return bookmarks.some(job => job.id === jobId);
  };
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs(page);
        setJobs(prevJobs => [...prevJobs, ...response.results]);
        setHasMore(response.results.length > 0);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, [page]);

  // Update the page and selectedJob in the context
  const handleSelectJob = (job, pageNumber) => {
    setSelectedJob({ ...job, page: pageNumber });
  };

  return (
    <JobContext.Provider value={{ selectedJob, setSelectedJob, isBookmarked ,jobs, setJobs, page, setPage, hasMore, setHasMore, getJobById, getJobs, handleSelectJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const toggleBookmark = (job) => {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  const index = bookmarks.findIndex(bm => bm.id === job.id);

  if (index === -1) {
    bookmarks.push(job);
  } else {
    bookmarks.splice(index, 1);
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  return bookmarks;
};



export const getBookmarkedJobs = () => {
  return JSON.parse(localStorage.getItem('bookmarks')) || [];
};

export const removeBookmark = (jobId) => {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks = bookmarks.filter(job => job.id !== jobId);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

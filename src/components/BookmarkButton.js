import React from 'react';
import { Button } from 'react-bootstrap';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './BookmarkButton.css'; // Add custom styles in a separate file

const BookmarkButton = ({ isBookmarked, onClick }) => {
  return (
    <Button 
      variant="outline-primary" 
      className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
      onClick={onClick}
    >
      {isBookmarked ? (
        <>
          <FaBookmark className="bookmark-icon" /> Remove Bookmark
        </>
      ) : (
        <>
          <FaRegBookmark className="bookmark-icon" /> Bookmark
        </>
      )}
    </Button>
  );
};

export default BookmarkButton;

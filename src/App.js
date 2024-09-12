import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import JobsPage from './pages/JobsPage';
import BookmarksPage from './pages/BookmarksPage';
import JobDetailsPage from './pages/JobDetailsPage';
import { JobProvider } from './JobContext';

function App() {
  return (
    <JobProvider>
      <div className="app-container">
        <Container className="content-container mt-3">
          <Routes>
            <Route path="/" element={<JobsPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
          </Routes>
        </Container>

        {/* Bottom navigation bar */}
        <Navbar bg="dark" variant="dark" fixed="bottom" className="bottom-navbar">
          <Container className="justify-content-center">
            <Nav className="me-auto d-flex justify-content-center g-4 w-100">
              <Link to="/" className="nav-link text-center">
                <span>🏠</span><br />Jobs
              </Link>
              <Link to="/bookmarks" className="nav-link text-center">
                <span>🔖</span><br />Bookmarks
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </JobProvider>
  );
}

export default App;

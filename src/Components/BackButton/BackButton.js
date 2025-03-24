import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on homepage
  if (location.pathname === '/dashboard') {
    return null;
  }

  return (
    <button 
      className="back-button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <FiArrowLeft className="back-icon" />
      <span className="back-text">Back</span>
    </button>
  );
};

export default BackButton;
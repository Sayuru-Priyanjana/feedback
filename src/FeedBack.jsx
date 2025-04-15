
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { ref, get, push } from 'firebase/database';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Rating,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';

const FeedbackContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(4),
}));

const FeedbackPage = () => {
  const { memberId, projectId } = useParams();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [project, setProject] = useState(null);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRef = ref(db, `members/${memberId}/projects/${projectId}`);
        const projectSnapshot = await get(projectRef);
        
        if (!projectSnapshot.exists()) {
          throw new Error('Project not found');
        }

        const projectData = projectSnapshot.val();
        setProject(projectData);

        const ownerRef = ref(db, `members/${memberId}`);
        const ownerSnapshot = await get(ownerRef);
        setOwner(ownerSnapshot.val().name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memberId, projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!rating) {
      setError('Please provide a rating');
      return;
    }

    try {
      const feedbackRef = ref(db, `members/${memberId}/projects/${projectId}/feedbacks`);
      await push(feedbackRef, {
        rating,
        comment,
        timestamp: new Date().toISOString()
      });
      setSuccess(true);
      setComment('');
      setRating(0);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FeedbackContainer>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#2d3748' }}>
        {project?.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#718096' }}>
        Owned by: {owner}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} mt={4}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Feedback submitted successfully!</Alert>}

        <Typography component="legend" sx={{ mb: 1, color: '#4a5568' }}>
          Your Rating
        </Typography>
        <Rating
          name="feedback-rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="large"
          sx={{ mb: 3 }}
        />

        <TextField
          label="Your Feedback"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: '8px',
            backgroundColor: '#4f46e5',
            '&:hover': {
              backgroundColor: '#4338ca'
            }
          }}
        >
          Submit Feedback
        </Button>
      </Box>
    </FeedbackContainer>
  );
};

export default FeedbackPage;
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for custom styling
const ModalContent = styled(Box)({
  width: '90%', // Adjust width to be responsive
  maxWidth: '500px', // Set a max width for larger screens
  padding: '30px',
  margin: 'auto',
  marginTop: '15%',
  backgroundColor: '#fff', // White background for content
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  '@media (max-width: 600px)': {
    padding: '20px',
  },
});

const Title = styled(Typography)({
  fontSize: '28px',
  fontWeight: 700,
  marginBottom: '20px',
  color: '#333', // Keeping the title color neutral
  '@media (max-width: 600px)': {
    fontSize: '24px',
  },
});

const Subtitle = styled(Typography)({
  fontSize: '16px',
  color: '#666', // Subtitle with soft color
  marginBottom: '20px',
  fontWeight: '400',
});

const ErrorMessage = styled(Typography)({
  fontSize: '14px',
  color: '#f44336',
  marginBottom: '20px',
});

const OtpInput = styled(TextField)({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
  '& .MuiInputLabel-root': {
    color: '#333', // Label in neutral color
  },
  '& .MuiOutlinedInput-input': {
    color: '#333',
    textAlign: 'center',
    fontSize: '18px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ccc',
  },
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '20px',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
});

const GradientButton = styled(Button)({
  padding: '12px 30px',
  fontSize: '16px',
  fontWeight: 600,
  borderRadius: '8px',
  background: 'linear-gradient(to left, rgb(220, 111, 0), #f1c40f)', // Gradient applied here
  '&:hover': {
    background: 'linear-gradient(to left, rgb(220, 111, 0), #f1c40f)', // Gradient on hover
  },
});

const EMailOtpModal = ({ open, onClose, onSubmit }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!otp) {
      setError('OTP cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(otp); // Assuming onSubmit sends OTP for verification
      setError('');
      onClose(); // Close modal after successful verification
    } catch (error) {
      setError('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="otp-modal" aria-describedby="otp-verification-modal">
      <ModalContent>
        <Title>OTP Verification</Title>
        <Subtitle>Please enter the OTP sent to your email address.</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <OtpInput
          label="Enter OTP"
          variant="outlined"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          inputProps={{
            maxLength: 6,
            style: { textAlign: 'center', fontSize: '16px' },
          }}
        />

        <ButtonContainer>
          <GradientButton onClick={onClose} variant="outlined" color="secondary" fullWidth>
            Cancel
          </GradientButton>
          <GradientButton
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
          </GradientButton>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

export default EMailOtpModal;

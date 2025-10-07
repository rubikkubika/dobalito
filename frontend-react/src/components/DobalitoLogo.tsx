import React from 'react';
import { Box } from '@mui/material';

const DobalitoLogo: React.FC = () => {
  return (
    <Box
      component="img"
      src="/images/logo.svg"
      alt="Dobalito Logo"
      sx={{
        width: 40,
        height: 40,
        objectFit: 'contain',
      }}
    />
  );
};

export default DobalitoLogo;

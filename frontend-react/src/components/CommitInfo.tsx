import React from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import { Code as CodeIcon } from '@mui/icons-material';

interface CommitInfoProps {
  className?: string;
}

const CommitInfo: React.FC<CommitInfoProps> = ({ className }) => {
  // Hardcoded commit info - update this with each commit/PR to main
  const commitHash = "P7nQ4";

  const shortCommit = commitHash.substring(0, 5);

  return (
    <Box className={className} sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      mt: 2,
      pt: 2,
      borderTop: '1px solid #E0E0E0'
    }}>
      <CodeIcon fontSize="small" color="action" />
      <Typography variant="caption" color="text.secondary">
        Frontend:
      </Typography>
      <Tooltip title={`Full commit: ${commitHash}`}>
        <Chip 
          label={shortCommit} 
          size="small" 
          variant="outlined"
          sx={{ 
            fontSize: '0.7rem',
            height: 20,
            '& .MuiChip-label': {
              px: 1
            }
          }} 
        />
      </Tooltip>
    </Box>
  );
};

export default CommitInfo;

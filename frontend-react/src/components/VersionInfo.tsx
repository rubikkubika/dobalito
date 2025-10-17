import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Tooltip, CircularProgress } from '@mui/material';
import { Code as CodeIcon } from '@mui/icons-material';
import { apiService } from '../services/apiService';

interface VersionInfoProps {
  className?: string;
}

const VersionInfo: React.FC<VersionInfoProps> = ({ className }) => {
  // Hardcoded frontend commit info - update this with each commit/PR to main
  const frontendCommitHash = "b20d2";
  const [backendCommitHash, setBackendCommitHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBackendVersion();
  }, []);

  const loadBackendVersion = async () => {
    try {
      const response = await apiService.getCommitInfo();
      if (response.success && response.data?.commit) {
        setBackendCommitHash(response.data.commit);
      }
    } catch (err) {
      console.error('Failed to load backend version:', err);
    } finally {
      setLoading(false);
    }
  };

  const shortFrontendCommit = frontendCommitHash.substring(0, 5);
  const shortBackendCommit = backendCommitHash?.substring(0, 5);

  return (
    <Box className={className} sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      mt: 2,
      pt: 2,
      borderTop: '1px solid #E0E0E0',
      flexWrap: 'wrap'
    }}>
      <CodeIcon fontSize="small" color="action" />
      
      {/* Frontend Version */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Frontend:
        </Typography>
        <Tooltip title={`Full commit: ${frontendCommitHash}`}>
          <Chip 
            label={shortFrontendCommit} 
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

      {/* Backend Version */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          Backend:
        </Typography>
        {loading ? (
          <CircularProgress size={16} sx={{ ml: 0.5 }} />
        ) : backendCommitHash ? (
          <Tooltip title={`Full commit: ${backendCommitHash}`}>
            <Chip 
              label={shortBackendCommit} 
              size="small" 
              variant="outlined"
              color="primary"
              sx={{ 
                fontSize: '0.7rem',
                height: 20,
                '& .MuiChip-label': {
                  px: 1
                }
              }} 
            />
          </Tooltip>
        ) : (
          <Chip 
            label="N/A" 
            size="small" 
            variant="outlined"
            color="error"
            sx={{ 
              fontSize: '0.7rem',
              height: 20,
              '& .MuiChip-label': {
                px: 1
              }
            }} 
          />
        )}
      </Box>
    </Box>
  );
};

export default VersionInfo;



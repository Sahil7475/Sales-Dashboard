import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Preloader = React.memo(({ isLoading }) => {
    const theme = useTheme();
    
    const styles = useMemo(() => ({
        container: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: isLoading ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
            zIndex: 9999,
            animation: !isLoading ? `${fadeOut} 0.5s ease-out forwards` : 'none',
        },
        logo: {
            width: '200px',
            height: 'auto',
            animation: `${pulse} 2s ease-in-out infinite`,
        },
        text: {
            color: theme.palette.secondary.main,
            marginTop: 3,
            fontWeight: 'bold',
            opacity: 0.9
        }
    }), [isLoading, theme.palette]);
    
    return (
        <Box sx={styles.container}>
            <Box
                component="img"
                src="/salesyze-preloader-logo.svg"
                alt="Salesyze"
                sx={styles.logo}
            />
            <Typography
                variant="h5"
                sx={styles.text}
            >
                Preparing your insights...
            </Typography>
        </Box>
    );
});

Preloader.displayName = 'Preloader';

export default Preloader; 
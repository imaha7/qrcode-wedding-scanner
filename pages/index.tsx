import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box, FormControlLabel, Switch, SwitchProps, ToggleButton, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { Camera } from '@mui/icons-material';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }: any) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Home: NextPage = () => {
  const [data, setData] = useState('No result');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [checked, setChecked] = React.useState(true);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ px: 2, py: 'auto' }}>
      <Head>
        <title>QR Code Wedding Scanner</title>
        <meta name="description" content="QR Code Wedding Scanner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Box sx={{ width: !isMobile ? '100%' : '40%', border: '1px solid #2b2b2b', borderRadius: 5, mx: 'auto', my: 2, px: 'auto' }}>
        <QrReader
          constraints={{ facingMode: checked ? 'user' : 'environment' }}
          scanDelay={100}
          onResult={(result, error) => {
            if (!!result) {
              setData(result.getText());
            }

            if (!!error) {
              console.info(error);
            }
          }}
          videoContainerStyle={{ width: '100%' }}
        />
        <Box sx={{ width: '100%', mb: 2 }}>
          <FormControlLabel
            control={<IOSSwitch checked={checked} onChange={handleChecked} sx={{ m: 1 }} />}
            label="Switch Camera"
            sx={{ mx: 'auto' }}
          />
        </Box>
      </Box>
      <Typography align={'center'} variant={"body1"}>{data}</Typography>
    </Box>
  )
}

export default Home

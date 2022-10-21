import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const Home: NextPage = () => {
  const [data, setData] = useState('No result');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{ px: 2, py: 'auto' }}>
      <Head>
        <title>QR Code Wedding Scanner</title>
        <meta name="description" content="QR Code Wedding Scanner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ width: !isMobile ? '100%' : '40%', border: '1px solid #2b2b2b', borderRadius: 5, mx: 'auto', my: 2 }}>
        <QrReader
          constraints={{ facingMode: 'environment' }}
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
      </Box>
      <Typography align={'center'} variant={"body1"}>{data}</Typography>
    </Box>
  )
}

export default Home

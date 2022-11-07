import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box, CircularProgress, FormControlLabel, Switch, SwitchProps, ToggleButton, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { CheckCircle, CloseRounded } from '@mui/icons-material';
import { updateUser, showUser } from "../actions/userAction";
import { useMutation } from "@tanstack/react-query";

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
  const [checked, setChecked] = React.useState(false);
  const [longitude, setLongitude] = React.useState<any>('');
  const [latitude, setLatitude] = React.useState<any>('');
  const [user, setUser] = React.useState<any>(null);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const showUserRegistration = useMutation((id) => showUser({ id: id }), {
    onMutate: (id: any) => {
      return { id };
    },
    onSuccess: (response) => {
      console.log(response);
      setUser(response);
      updateUserRegistration.mutate(response.id);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const updateUserRegistration = useMutation((id) => updateUser({ id: id, username: user.username, name: user.name, invited_guests_count: user.invited_guests_count, congrats_words: user.congrats_words, status: 'attended' }), {
    onMutate: (id: any) => {
      return { id };
    },
    onSuccess: (response) => {
      console.log(response);
      // getUsersRegistration.refetch();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   setLatitude(position.coords.latitude);
    //   setLongitude(position.coords.longitude);
    //   console.log((position.coords.latitude).toString());
    //   console.log((position.coords.longitude).toString());
    // });
  }, [data, user]);

  return (
    <Box sx={{ px: 2, py: 'auto' }}>
      <Head>
        <title>QR Code Wedding Scanner</title>
        <meta name="description" content="QR Code Wedding Scanner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* 3.551920 */}
      {/* 98.713588 */}
      {/* {(latitude.toString() !== '-6.1752330340965225' && longitude.toString() !== '106.78996000922123') ?
        <Box sx={{ width: '100%', textAlign: 'center', py: 3 }}>
          <Box>
            <Box sx={{ mb: 2 }}>
              <CloseRounded color={'error'} fontSize={'large'} />
            </Box>
            <Box>
              <Typography align={'center'} fontWeight={600} variant={"h6"}>
                Sorry, you&apos;re not in the wedding location right now.
              </Typography>
            </Box>
            <Box>
              <Typography align={'center'} variant={"subtitle1"}>
                Please try again when you are in the wedding location, thank you!
              </Typography>
            </Box>
          </Box>
        </Box> :
        <Box>
          <Box sx={{ width: !isMobile ? '100%' : '40%', border: '1px solid #2b2b2b', borderRadius: 5, mx: 'auto', mt: 2, mb: 5, px: 'auto' }}>
            {checked ? <QrReader
              key={'user'}
              constraints={{ facingMode: 'user' }}
              scanDelay={100}
              onResult={(result, error) => {
                if (result) {
                  setData(result.getText());
                  getUsersRandom.mutate();
                } else {
                  console.error(error);
                }
              }}
              videoContainerStyle={{ width: '100%' }}
              videoStyle={{ width: '100%' }}
            /> : <QrReader
              key={'environment'}
              constraints={{ facingMode: 'environment' }}
              scanDelay={100}
              onResult={(result, error) => {
                if (result) {
                  setData(result.getText());
                  getUsersRandom.mutate();
                } else {
                  console.error(error);
                }
              }}
              videoContainerStyle={{ width: '100%' }}
              videoStyle={{ width: '100%' }}
            />}
            <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
              <FormControlLabel
                control={<IOSSwitch checked={checked} onChange={handleChecked} sx={{ m: 1 }} />}
                label={checked ? "Switch Rare Camera" : "Switch Front Camera"}
                sx={{ mx: 'auto' }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            {getUsersRandom.isLoading ? <CircularProgress /> :
              (getUsersRandom.isSuccess || getUsersRandom.isError ?
                <Box>
                  <Box sx={{ mb: 2 }}>
                    {getUsersRandom.isSuccess ? <CheckCircle color={'success'} fontSize={'large'} /> : <CloseRounded color={'error'} fontSize={'large'} />}
                  </Box>
                  <Box>
                    <Typography align={'center'} fontWeight={600} variant={"h6"}>
                      {user.length > 0 ? user[0]?.name.title + ' ' + user[0]?.name.first + ' ' + user[0]?.name.last : 'No Results'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography align={'center'} variant={"subtitle1"}>
                      {getUsersRandom.isSuccess ? 'Telah Hadir' : 'Gagal Mengubah Status Hadir, Silahkan Coba Lagi!'}
                    </Typography>
                  </Box>
                </Box> : null)
            }
          </Box>
        </Box>
      } */}
      <Box>
        <Box sx={{ width: !isMobile ? '100%' : '40%', border: '1px solid #2b2b2b', borderRadius: 5, mx: 'auto', mt: 2, mb: 5, px: 'auto' }}>
          {checked ? <QrReader
            key={'user'}
            constraints={{ facingMode: 'user' }}
            scanDelay={100}
            onResult={(result, error) => {
              if (result) {
                setData(result.getText());
                showUserRegistration.mutate(parseInt(data));
              } else {
                console.error(error);
              }
            }}
            videoContainerStyle={{ width: '100%' }}
            videoStyle={{ width: '100%' }}
          /> : <QrReader
            key={'environment'}
            constraints={{ facingMode: 'environment' }}
            scanDelay={100}
            onResult={(result, error) => {
              if (result) {
                setData(result.getText());
                showUserRegistration.mutate(parseInt(data));
              } else {
                console.error(error);
              }
            }}
            videoContainerStyle={{ width: '100%' }}
            videoStyle={{ width: '100%' }}
          />}
          <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
            <FormControlLabel
              control={<IOSSwitch checked={checked} onChange={handleChecked} sx={{ m: 1 }} />}
              label={checked ? "Switch Rare Camera" : "Switch Front Camera"}
              sx={{ mx: 'auto' }}
            />
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {showUserRegistration.isLoading || updateUserRegistration.isLoading  ? <CircularProgress /> :
            (updateUserRegistration.isSuccess || updateUserRegistration.isError ?
              <Box>
                <Box sx={{ mb: 2 }}>
                  {updateUserRegistration.isSuccess ? <CheckCircle color={'success'} fontSize={'large'} /> : <CloseRounded color={'error'} fontSize={'large'} />}
                </Box>
                <Box>
                  <Typography align={'center'} fontWeight={600} variant={"h6"}>
                    {user ? user.name : 'No Results'}
                  </Typography>
                </Box>
                <Box>
                  <Typography align={'center'} variant={"subtitle1"}>
                    {updateUserRegistration.isSuccess ? 'Has been attended' : 'Failed to update status, please try again!'}
                  </Typography>
                </Box>
              </Box> : null)
          }
        </Box>
      </Box>
    </Box>
  )
}

export default Home

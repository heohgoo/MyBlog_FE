import React, { useEffect, useState } from 'react'
import Navigation from '../../Navigation'
import { Box } from '@mui/material'
import Authentication from '../../Authentication'
import BoardMain from '../../BoardMain'
import { useUserStore } from '../../../stores'
import { useCookies } from 'react-cookie'
import axios from 'axios'

export default function MainLayout() {

  const [boardResponse, setBoardResponse] = useState<string>('');
  const [cookies] = useCookies();
  const { user } = useUserStore();

  const getBoard = async (token: string) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.get('http://localhost:4040/api/board/', requestOption).then((response) => {
      setBoardResponse(response.data); 
    }).catch((error) => '');
  }

  useEffect(() => {
    const token = cookies.token
    if (token) getBoard(token);
    else setBoardResponse('');
  }, [cookies.token]);

  return (
    <>
    <Navigation />
    {user ? (<BoardMain />) : (<Authentication />)}
    </>
  )
}

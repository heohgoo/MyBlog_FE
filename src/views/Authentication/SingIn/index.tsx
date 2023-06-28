import { Box, Card, CardContent, TextField, Button, CardActions } from '@mui/material'
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';

export default function SignIn() {
    const [userEmail, setEmail] = useState<string>('');
    const [userPassword, setPassword] = useState<string>('');

    const [cookies, setCookies] = useCookies();

    const {user, setUser} = useUserStore();

    const signInHandler = () => {
            if (userEmail.length === 0 || userPassword.length === 0) {
                alert('이메일과 비밀번호를 입력하세요.')
                return;
            }

            const data = {
                userEmail,
                userPassword
            }

            axios.post("http://localhost:4040/api/auth/signIn", data)
            .then((response) => {
                const responsedData = response.data;
                console.log(responsedData);
                if (!responsedData.result){
                    console.log('로그인 실패');
                    return;
                }

                const { token, exprTime, user } = responsedData.data;
                const expires = new Date();
                expires.setMilliseconds(expires.getMilliseconds + exprTime);

                setCookies('token', token, { expires });
                //쿠키가 유지되어 있는 동안은 로그인되어 있다고 가정
                setUser(user);
                //스토어에 저장
            })
            .catch((error) => {
                alert('로그인에 실패했습니다.');
            })
    }

  return (
    <Card sx={{ minWidth: 275, maxWidth: "50%" }}>
        { user != null && (<>{user.userNickname}</>)}
        <CardContent>
            <Box>
                <TextField
                    fullWidth
                    label="이메일"
                    type="email"
                    variant='standard'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="비밀번호"
                    type="password"
                    variant='standard'
                    onChange={(e) => setPassword(e.target.value)}
                />                
            </Box>
        </CardContent>
        <CardActions>
                <Button fullWidth onClick={() => { signInHandler() }} variant="contained" endIcon={<SendIcon />}>
                    로그인
                </Button>
        </CardActions>
    </Card>
  )
}

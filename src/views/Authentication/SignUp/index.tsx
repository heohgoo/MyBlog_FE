import axios from 'axios'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

//mui 라이브러리 => 부트스트랩과 비슷한 역할, TypeScript 지원
//npm install @mui/material @emotion/react @emotion/styled
//npm install @mui/icons-material
export default function SignUp() {
    // const [requestResult, setRequestResult] = useState<string>(""); //함수 컴포넌트의 최상위 훅에서
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userPasswordCheck, setUserPasswordCheck] = useState<string>('');
    const [userNickname, setUserNickname] = useState<string>('');
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
    const [userAddress, setUserAddress] = useState<string>('');
    const [userAddressDetail, setUserAddressDetail] = useState<string>('');

    const signUpHandler = () => {
        const data = {
            userEmail,
            userPassword,
            userPasswordCheck,
            userPhoneNumber,
            userNickname,
            userAddress,
            userAddressDetail,
        };

        axios.post('http://localhost:4040/api/auth/signUp', data)
            .then((response) => {
                // setRequestResult("Success!");
            })
            .catch((error) => {
                // setRequestResult("Failed");
            });
    };

    return (
        <Card sx={{ minWidth: 275, maxWidth: "50%" }}>
            <CardContent>
                <Box>
                    <TextField fullWidth label="이메일 주소" type="email" variant="standard"
                        onChange={(e) => setUserEmail(e.target.value)} />
                    <TextField fullWidth label="비밀번호" type="password" variant="standard"
                        onChange={(e) => setUserPassword(e.target.value)} />
                    <TextField fullWidth label="비밀번호 확인" type="password" variant="standard"
                        onChange={(e) => setUserPasswordCheck(e.target.value)} />
                    <TextField fullWidth label="닉네임" variant="standard"
                        onChange={(e) => setUserNickname(e.target.value)} />
                    <TextField fullWidth label="휴대폰 번호" variant="standard"
                        onChange={(e) => setUserPhoneNumber(e.target.value)} />
                    <TextField fullWidth label="주소" variant="standard"
                        onChange={(e) => setUserAddress(e.target.value)} />
                    <TextField fullWidth label="상세 주소" variant="standard"
                        onChange={(e) => setUserAddressDetail(e.target.value)} />
                </Box>
            </CardContent>
            <CardActions>
                <Button fullWidth onClick={() => { signUpHandler() }} variant="contained" endIcon={<SendIcon />}>
                    회원가입
                </Button>
            </CardActions>
        </Card>
    );
}

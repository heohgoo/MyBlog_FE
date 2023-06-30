import { Box, Card, CardContent, TextField, Button, CardActions, Typography, CardHeader } from '@mui/material'
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';
import { signInApi } from '../../../apis';

interface Props {
    setAuthView: (authView: boolean) => void,
}


export default function SignIn(props: Props) {
    const [userEmail, setEmail] = useState<string>('');
    const [userPassword, setPassword] = useState<string>('');

    const [cookies, setCookies] = useCookies();

    const { user, setUser } = useUserStore();

    const { setAuthView } = props

    const signInHandler = async () => {
        if (userEmail.length === 0 || userPassword.length === 0) {
            alert('이메일과 비밀번호를 입력하세요.')
            return;
        }

        const data = {
            userEmail,
            userPassword
        }

        const signInResponse = await signInApi(data);

        if (!signInResponse) {
            alert('로그인에 실패하였습니다.');
            return;
        }

        if (!signInResponse.result) {
            console.log('로그인에 실패하였습니다.');
            return;
        }

        const { token, exprTime, user } = signInResponse.data;
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + exprTime);

        setCookies('token', token, { expires });
        //쿠키가 유지되어 있는 동안은 로그인되어 있다고 가정
        setUser(user);
        //스토어에 저장
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: "50%", padding: 5 }}>
            <Box>
                <Typography variant='h5'>로그인</Typography>
            </Box>
            <Box height='50vh' mt={5}>
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
            <Box component='div'>
                <Button fullWidth onClick={() => { signInHandler() }} variant="contained" endIcon={<SendIcon />}>
                    로그인
                </Button>
            </Box>
            <Box component='div' display='flex' mt={2}>
                <Typography>신규 사용자이신가요?</Typography>
                <Typography fontWeight={800} ml={1} onClick={() => setAuthView(true)}>회원가입</Typography>
            </Box>
        </Card>
    )
}

import axios from 'axios'
import React, { useState } from 'react'

export default function SignUp() {
    const [requestResult, setRequestResult] = useState<string>(""); //함수 컴포넌트의 최상위 훅에서

    const signUpHandler = () => {
        const data = {
            "userEmail" : "hhg@gmail.com",
            "userPassword" : "qwer1234",
            "userPasswordCheck" : "qwer1234!!",
            "userPhoneNumber" : "010-1234-5678",
            "userAddress" : "대한민국 서울시",
            "userAddressDetail": "광진구",
        };

        axios.post('http://localhost:4040/api/auth/signUp', data)
        .then((response) => {
            setRequestResult("Success!");
        })
        .catch((error) => {
            setRequestResult("Fail");
        });
    };

  return (
    <div>
        <h3>{requestResult}</h3>
        <button onClick={() => {signUpHandler()}}>회원가입</button>
    </div>
  )
}

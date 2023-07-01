import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import MainLayout from './views/layouts/MainLayout';
import Navigation from './views/Navigation';
import Authentication from './views/Authentication';

export default function App() {
  // const [connection, setConnection] = useState<string>('');
  // //const [state, setState] = useState(초기값);
  // const connectionTest = () => {
  //   axios.get('http://localhost:4040/').then((response) =>{
  //     setConnection(response.data);
  //   }).catch((error) => {
  //     setConnection(error.message);
  //   })
  // }

  // //React 훅, useEffect함수가 포함된 컴포넌트가 처음 마운트되거나 컴포넌트가 리렌더링될 때,
  // //선언된 변수의 값이 변경되거나 redux store값이 변경될 때 실행한 구문 정의
  // useEffect(() => {
  //   connectionTest();
  // }, []);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>
    //   <SignUp />
    // </div>
    <>
      <MainLayout />
      {/* <Navigation />
      <Authentication /> */}
    </>
  );
}

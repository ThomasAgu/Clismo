import React from 'react'
import { useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
//components
import NavBar from './components/NavBar'
import InputComponent from './components/InputComponent'
import PopupMessage from './components/PopupMessage';
//styles
import  styles from '../styles/Login.module.css'
//image
import logo from '../public/images/Logo.png'
//API
import { login } from './api/ApiLogin';
import { BASE_URL } from './api/url';
//Store
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions/actions';
const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  //Feedback
  const [popUp, setPopUp] = useState(false)

  const dispatch = useDispatch();

  const handleChangeUserName = (e) => {
    setUserName(userName => e.target.value);
  }

  const handleChangePassword = (e) =>{
    setPassword(password => e.target.value);
  }


  const handleIniciarSesion = (e) =>{
    e.preventDefault();
    if(userName === ''){
      console.log('ingrese nombre de usuario')
    }
    else 
      if(password === ''){
      //Input label legend ingrese constrase;a
      console.log('ingrese nombre de contrasenia')
      }
      
      else{
        const user ={ username: userName, password: password }
        
        fetch(`${BASE_URL}auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(response => response.json())
          .then(result => {
              if(result.id !== undefined){
                user['id'] = result.id
                dispatch(loginSuccess(user));
                router.push('/Home')
              }
              else{
                setUserName('')
                setPassword('')
                setPopUp(true)
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
    }
  }

  const router = useRouter();

  return (
    <div id={styles.loginComponent}>
      <NavBar />
      <div className='w-50 m-auto flex-column d-flex align-items-center' id={styles.mainContent}>
          <div id={styles.logo}>
            <Image src={logo}
              width={100}
              height={80} 
              alt={'Logo'}/>  
          </div>
          <div id={styles.content}>
            <h3 id={styles.contentTitle}>Clismo</h3>
            <div id={styles.formDiv}>
              <form id={styles.form} className='d-flex flex-column justify-content-center'>
                <InputComponent label={'Nombre de usuario'} type={'text'} valor={userName} setValue={handleChangeUserName} tabIndex={4} ariaLabel={'Ingresa tu nombre de usuario'}/>
                <InputComponent label={'Contraseña'} type={'password'} valor={password} setValue={handleChangePassword} tabIndex={5} ariaLabel={'Ingresa tu contraseña'}/>
                <div className=' d-flex justify-content-center align-items-center mt-4'><button className='' id={styles.iniciarBtn} onClick={handleIniciarSesion} >Iniciar Sesion</button></div>
              </form>
          </div>
          <hr />
            <div className=' d-flex justify-content-center align-items-center'><button id={styles.registrarseBtn} onClick={() => router.push('/Register')}>Registrarse</button></div>
        </div>
      </div>
      { popUp ? 
        <PopupMessage msg={'El usuario y/o contraseña no son validos'} todoBienOtodoMal={'todoMal'} active={popUp} setActive={setPopUp} tiempo={10}/>
      :
        <></>
      }
    </div>
    
  )
}

export default Login
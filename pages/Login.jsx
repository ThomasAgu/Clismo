import React from 'react'
import { useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
//components
import NavBar from './components/NavBar'
import InputComponent from './components/InputComponent'
//styles
import  styles from '../styles/Login.module.css'
//image
import logo from '../public/images/Logo.png'
//API
import { login } from './api/ApiLogin';
//Store
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions/actions';
const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChangeUserName = (e) => {
    setUserName(userName => e.target.value);
  }

  const handleChangePassword = (e) =>{
    setPassword(password => e.target.value);
  }

  const handleIniciarSesion = (e) =>{
    e.preventDefault();
    console.log('aca hacer el llamado a la API')
    console.log('Chequear que este el usuario y sino devolver credenciales erroneas')
    console.log('Si esta todo bien setear la sesion iniciada')
    //const response = login({user: userName, pass: password})
    console.log(userName, password)
    const user ={ username: userName }
    dispatch(loginSuccess(user));
    router.push('/Home')
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
                <button className='' id={styles.iniciarBtn} onClick={handleIniciarSesion} >Iniciar Sesion</button>
              </form>
          </div>
          <hr />
            <div className=' d-flex justify-content-center'><button id={styles.registrarseBtn} onClick={() => router.push('/Register')}>Registrarse</button></div>
        </div>
      </div>
    </div>
    
  )
}

export default Login
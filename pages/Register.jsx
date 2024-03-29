import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
//components
import NavBar from './components/NavBar'
import InputComponent from './components/InputComponent'
import logo from '../public/images/Logo.png'
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css'
//api URL
import { BASE_URL } from './api/url';

import PopupMessage from './components/PopupMessage'
//Store
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions/actions';

const Register = () => {

  const dispatch = useDispatch();

  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatetPassword] = useState('');
  const [role, setRole] = useState();

  const [popUp, setPopUp] = useState(false)
  const [feedBackMsg, setFeedBackMsg] = useState('')

  const handleChangeUserName = (e) => {
    setUserName(userName => e.target.value);
  }

  const handleChangePassword = (e) =>{
    setPassword(password => e.target.value);
  }

  const handleChangeRepeaterPassword = (e) =>{
    setRepeatetPassword(repeatedPassword => e.target.value);
  }

  const handleChangeSetRadio = (e) =>{
    console.log(e.target.value)
    setRole(e.target.value)
  }

  const handleClickRegister = () =>{
    //const response = register({user: userName, pass: password, role: role })
    //chequear si no existe 
    if(userName === ''){
      setFeedBackMsg('No ha ingresado nombre de usuario')
      setPopUp(true)
      console.log('ingrese nombre de usuario')
    }
    
    else if(password === ''){
      setFeedBackMsg('No ha ingresado ninguna contraseña')
      setPopUp(true)
      console.log('ingrese nombre de contrasenia')
      //falt aocntorllar que se repita la conmtrase;a repetida
    }
    else{
      let usernameSinEspacios = userName.replace(/\s/g, "");
      let passwordSinEspacios = password.replace(/\s/g, "")
      const user ={ username: usernameSinEspacios.toLowerCase(), password: passwordSinEspacios, role: role }
      console.log(user)

      fetch(`${BASE_URL}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response  => response.json())
      .then(result => {
        if(result.id !== undefined){
          user['id'] = result.id
          dispatch(loginSuccess(user));
          router.push('/RegisterExtra');
        }
        else{
          setUserName(value => '')
          setPopUp(true)
        }
      })
      .catch(error => {
        console.error('Error:', error);
    });
    }
  }

  const handleKeyDown =(event) => {
    if (event.keyCode === 13) {
      const labelForAttribute = event.target.getAttribute('aria-labelledby');
      setRole(labelForAttribute)
      /* handleChangeSetRadio(event.target.for) */
    }

  }


  return (
    <div id={styles.RegisterComponent}>
      <Head>
        <title>Registrarse</title>
        <meta name="description" content="Registro de la pagina de clismo." />
      </Head>
      <NavBar />
      <div className=' w-50 m-auto flex-column d-flex align-items-center' id={styles.mainContent}>
        <div id={styles.logo}>
        <Image src={logo}
              width={100}
              height={80} 
              alt={'Logo de clismo'}/> 
        </div>
        <div id={styles.content}>
          <h1 id={styles.contentTilte}>Registrarse</h1>
          <div id={styles.formDiv}>
            <form id={styles.form} className='d-flex flex-column justify-content-center'>
              <InputComponent label={'Nombre de usuario'} type={'text'} valor={userName} setValue={handleChangeUserName}ariaLabel={'Ingresa tu nombre de usuario'} tabIndex={0}/>
              <InputComponent label={'Contraseña'} type={'password'} valor={password} setValue={handleChangePassword}  ariaLabel={'Ingresa tu contraseña'} tabIndex={0}/>
              <InputComponent label={'Repetir contraseña'} type={'password'} valor={repeatedPassword} setValue={handleChangeRepeaterPassword} ariaLabel={'Repetir contraseña'} tabIndex={0}/>
              <label htmlFor="" className='pt-3' id={styles.labelForRol}  ariaLabel={'Selecciona tu rol'} tabIndex={0}>Rol
              <div className='d-flex w-100 justify-content-center  pb-3'>
                <label for="opcion1" className={role === 'STUDENT' ? styles.labelRadioActive : styles.labelRadio} tabIndex={0} onKeyDown={handleKeyDown} aria-labelledby='STUDENT'>Alumno
                  <input type="radio" id="opcion1" name="opciones" value="STUDENT" className={styles.radio} aria-label='Rol de alumno' aria-labelledby='opcion1' onChange={handleChangeSetRadio}  />
                </label>
                <label for="opcion2" className={role === 'TEACHER' ? styles.labelRadioActive : styles.labelRadio} tabIndex={0} onKeyDown={handleKeyDown} aria-labelledby='TEACHER'>Profesor
                  <input type="radio" id="opcion2" name="opciones" value="TEACHER" className={styles.radio} aria-label='Rol de profesor' aria-labelledby='opcion2' onChange={handleChangeSetRadio} />
                </label>
              </div>
              </label>
            </form>
          </div>
          <div className=' d-flex justify-content-center'><button id={styles.registrarseBtn} onClick={handleClickRegister} >Registrarse</button></div>
          <hr />
          <div id={styles.linkContent}><Link href={'/Login'}  className='text-center'  id={styles.linktologin}>¿Ya tenes cuenta? Iniciar sesion</Link></div>
        </div>
      </div>
      { popUp ?
        <PopupMessage msg={feedBackMsg} todoBienOtodoMal={'todoMal'} active={popUp} setActive={setPopUp} tiempo={10}/>
      :
        <></>
      }
      
    </div>
  )
}

export default Register
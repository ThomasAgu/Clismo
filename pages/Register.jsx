import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
    setRole(e.target.value)
  }

  const handleClickRegister = () =>{
    //const response = register({user: userName, pass: password, role: role })
    //chequear si no existe 
    if(userName === ''){
      console.log('ingrese nombre de usuario')
    }
    
    else if(password === ''){
      console.log('ingrese nombre de contrasenia')
      //falt aocntorllar que se repita la conmtrase;a repetida
    }
    else{
      const user ={ username: userName, password: password, role: role }
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



  return (
    <div id={styles.RegisterComponent}>
      <NavBar />
      <div className=' w-50 m-auto flex-column d-flex align-items-center' id={styles.mainContent}>
        <div id={styles.logo}>
        <Image src={logo}
              width={100}
              height={80} 
              alt={'Logo'}/> 
        </div>
        <div id={styles.content}>
          <h3 id={styles.contentTilte}>Clismo</h3>
          <div id={styles.formDiv}>
            <form id={styles.form} className='d-flex flex-column justify-content-center'>
              <InputComponent label={'Nombre de usuario'} type={'text'} valor={userName} setValue={handleChangeUserName} tabIndex={4} ariaLabel={'Ingresa tu nombre de usuario'}/>
              <InputComponent label={'Contraseña'} type={'password'} valor={password} setValue={handleChangePassword} tabIndex={5} ariaLabel={'Ingresa tu contraseña'}/>
              <InputComponent label={'Repetir contraseña'} type={'password'} valor={repeatedPassword} setValue={handleChangeRepeaterPassword} tabIndex={6} ariaLabel={'Repetir contraseña'}/>
              <label htmlFor="" className='pt-3' id={styles.labelForRol} tabIndex={7} ariaLabel={'Selecciona tu rol'}>Rol</label>
              <div className='d-flex w-100 justify-content-center  pb-3'>
                <input type="radio" id="opcion1" name="opciones" value="STUDENT" className={styles.radio} tabIndex='8' aria-label='Rol de alumno' onChange={handleChangeSetRadio}/>
                <label for="opcion1" className={styles.labelRadio}>Alumno</label>
                <input type="radio" id="opcion2" name="opciones" value="TEACHER" className={styles.radio} tabIndex='9' aria-label='Rol de profesor' onChange={handleChangeSetRadio}/>
                <label for="opcion2" className={styles.labelRadio}>Profesor</label>
              </div>
            </form>
          </div>
          <div className=' d-flex justify-content-center'><button id={styles.registrarseBtn} onClick={handleClickRegister} >Registrarse</button></div>
          <hr />
          <Link href={'/Login'}>
            <p className='text-center' id={styles.linktologin}>¿Ya tenes cuenta? <a onClick={() => router.push('/Login')}>Iniciar Sesion</a></p>
          </Link>
        </div>
      </div>
      { popUp ?
        <PopupMessage msg={'El nombre de usuario ya existe'} todoBienOtodoMal={'todoMal'} active={popUp} setActive={setPopUp} tiempo={10}/>
      :
        <></>
      }
      
    </div>
  )
}

export default Register
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
//components
import NavBar from './components/NavBar'
import InputComponent from './components/InputComponent'
//styles
import  styles from '../styles/Login.module.css'
//image
import logo from '../public/images/Logo.png'
const Login = () => {

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
                <InputComponent label={'Nombre de usuario'} type={'text'} />
                <InputComponent label={'Contraseña'} type={'password'} />
                <button className='' id={styles.iniciarBtn}>Iniciar Sesion</button>
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
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
//components
import NavBar from './components/NavBar'
import InputComponent from './components/InputComponent'
import logo from '../public/images/Logo.png'
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css'
const options = [{name: "profesor", label: "profesor"}, {name: "alumno", label: "alumno"}]


const Register = () => {

  const router = useRouter();

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
              <InputComponent label={'Nombre de usuario'} type={'text'}/>
              <InputComponent label={'Contraseña'} type={'password'}/>
              <InputComponent label={'Repetir contraseña'} type={'password'}/>
              <label htmlFor="" className='pt-3' id={styles.labelForRol}>Rol</label>
              <div className='d-flex w-100 justify-content-center  pb-3'>
                <input type="radio" id="opcion1" name="opciones" value="opcion1" className={styles.radio}/>
                <label for="opcion1" className={styles.labelRadio}>Alumno</label>

                <input type="radio" id="opcion2" name="opciones" value="opcion2" className={styles.radio}/>
                <label for="opcion2" className={styles.labelRadio}>Profesor</label>

              </div>
            </form>
          </div>
          <div className=' d-flex justify-content-center'><button id={styles.registrarseBtn} onClick={() => router.push('/RegisterExtra')} >Registrarse</button></div>
          <hr />
          <Link href={'/Login'}>
            <p className='text-center'>¿Ya tenes cuenta? <a>Iniciar Sesion</a></p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
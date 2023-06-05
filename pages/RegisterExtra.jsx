import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
//components
import NavBar from './components/NavBar'
import InputComponent from './components/InputComponent';
import RangeComponent from './components/RangeComponent'
//logo
import logo from '../public/images/Logo.png'
//styles
import styles from '../styles/RegisterExtra.module.css'
const RegisterExtra = () => {

  const router = useRouter();
  return (
    <div id={styles.RegisterComponent}>
      <NavBar  />
      <div className='w-50 m-auto flex-column d-flex align-items-center' id={styles.mainContent}>
        <div>
          <Image src={logo}
                width={100}
                height={80} 
                alt={'Logo'}/> 
        </div>
          <div id={styles.content}>
            <div className='text-center'>
              <h3 id={styles.contentTitle}>Clismo</h3>
              <p id={styles.contentParagraph}>Datos opcionales para optimizar tus estadisticas y entrenamientos</p>
            </div>
          <div id={styles.formDiv}>
            <form className='d-flex flex-column justify-content-center' id={styles.form}>
                <RangeComponent label={'Edad'} min={'10'} max={'100'}  type={'Años'}/>
                <RangeComponent label={'Altura'} min={'140'} max={'300'}  type={'Cm'}/>
                <RangeComponent label={'Peso'} min={'30'} max={'200'}  type={'Kgr.'}/>
            </form>

            <hr />
            <div className=' d-flex justify-content-center'><button onClick={() => router.push('/')} id={styles.registrarseBtn} >Registrarse</button></div>
          </div>
        </div>
        <p className='text-center pt-3'>Ninguno de estos datos se compartiran con otras personas mas que el profesor.</p>
      </div>
    </div>
  )
}

export default RegisterExtra
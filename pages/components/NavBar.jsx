import React from 'react'
import { useRouter } from 'next/router';
//style
import styles from '../../styles/NavBar.module.css'

const NavBar = () => {

  const router = useRouter();

  return (
    <nav className='d-flex justify-content-between' id={styles.NavBar}>
        <h3 id={styles.title}>Clismo</h3>
        <div className='w-25 d-flex justify-content-around align-items-center'>
            <button id={styles.loginBtn} onClick={() => router.push('/Login')}>Iniciar Sesion</button>
            <button id={styles.logupBtn} onClick={() => router.push('/Register')}>Registrarse</button>
        </div>
    </nav>
  )
}

export default NavBar
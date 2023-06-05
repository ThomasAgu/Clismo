import React from 'react'
import { useRouter } from 'next/router';
//style
import styles from '../../styles/NavBar.module.css'

const NavBar = () => {

  const router = useRouter();

  return (
    <nav className='d-flex justify-content-between' id={styles.NavBar}>
        <h3 id={styles.title} tabIndex={1}>Clismo</h3>
        <div className='d-flex justify-content-around align-items-center' id={styles.navBarDiv}>
            <button id={styles.loginBtn} onClick={() => router.push('/Login')}  tabIndex={2}>Iniciar Sesion</button>
            <button id={styles.logupBtn} onClick={() => router.push('/Register')}  tabIndex={3}>Registrarse</button>
        </div>
    </nav>
  )
}

export default NavBar
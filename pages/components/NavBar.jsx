import React from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
//style
import styles from '../../styles/NavBar.module.css'
//store
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/actions';

const NavBar = () => {

  const dispatch = useDispatch();

  const UserProfile = () => {
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const user = useSelector((state) => state.login.user);
    
    (console.log('Usuario logeado'))
    console.log(useSelector((state) => state.login.isLoggedIn))
    if (isLoggedIn) {
      return (
        <div className='d-flex justify-content-end align-items-end me-3' id={styles.navBarDiv}>
            <button id={styles.logoutBtn} onClick={()=>dispatch(logout())}>Cerrar Sesion</button>
        </div>
      )
      } 
    else {
      return (
        <div className='d-flex justify-content-around align-items-center' id={styles.navBarDiv}>
            <button id={styles.loginBtn} onClick={() => router.push('/Login')}  tabIndex={2}>Iniciar Sesion</button>
            <button id={styles.logupBtn} onClick={() => router.push('/Register')}  tabIndex={3}>Registrarse</button>
        </div>
      )
    }
  };

  const router = useRouter();

  return (
    <nav className='d-flex justify-content-between' id={styles.NavBar}>
        <h3 id={styles.title} tabIndex={1}>Clismo</h3>
        <UserProfile />
    </nav>
  )
}

export default NavBar
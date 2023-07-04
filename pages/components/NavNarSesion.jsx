import React from 'react'
import { useRouter } from 'next/router'
import { useState , useEffect} from 'react'
//Styles
import styles from '../../styles/NavBarSesion.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { get_route, set_route } from '../../store/actions/actions'
const NavNarSesion = () => {

    const [opcion, setOpcion] = useState(useSelector(state => state.navbar.route));
    const dispatch = useDispatch();
    const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario
    //Cada vez que se carga el navbar se verifica si el usuario esta logueado. Sino va al home
    useEffect(() => {

      if( user_id === -1){
        router.push('/')
      } 
    }, [])

    const handleClickSetOpcion = (e) => {
      e.preventDefault()
      dispatch(set_route(e.target.value))
      router.push(e.target.value);
    }

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const router = useRouter();
    if (!isLoggedIn){
      return (<></>)
    }
      else{
      return (
      
        <nav className='' id={styles.bigDiv}>
            <div className={styles.navDiv}><button onClick={handleClickSetOpcion} value={'/Home'} className={`${styles.btnNav} ${opcion === '/Home' ? styles.btnNavActive : ''}`}>Inicio</button></div>
            <div className={styles.navDiv}><button onClick={handleClickSetOpcion} value={'/Entrenamientos'} className={`${styles.btnNav} ${opcion === '/Entrenamientos' ? styles.btnNavActive : ''}`} >Entrenamientos</button></div>
            <div className={styles.navDiv}><button onClick={handleClickSetOpcion} value={'/Grupos'} className={`${styles.btnNav} ${opcion === '/Grupos' ? styles.btnNavActive : ''}`} >Grupos</button></div>
            <div className={styles.navDiv}><button onClick={handleClickSetOpcion} value={'/Yo'} className={`${styles.btnNav} ${opcion === '/Yo' ? styles.btnNavActive : ''}`}>Yo </button></div>
        </nav>
      )
    }
    
}

export default NavNarSesion
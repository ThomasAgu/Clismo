import React from 'react'
import Image from 'next/image';
import Head from 'next/head';
//store
import { useSelector } from 'react-redux';
//Components
import NavBar from './components/NavBar';
import NavNarSesion from './components/NavNarSesion';
import StatGlobal from './components/StatGlobal';
import StatsComparadas from './components/StatsComparadas';
//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGaugeSimple, faHeart, faWeightScale, faClock } from '@fortawesome/free-solid-svg-icons';
//styles
import foto from '../public/images/foto.jpg'
import profile from '../public/images/profilePic.png'
import styles from '../styles/yo.module.css'




const Yo = () => {

  const user = useSelector(state=> state.login.user) //trae el id del usuario


  return (
    <div id={styles.content}>
      <Head>
        <title>Clismo</title>
        <meta name="description" content="Seccion del usuario." />
      </Head>
      <NavBar/>
      <NavNarSesion/>
      <main>
        <div className='d-flex flex-column text-center mt-3' id={styles.titleDiv}>
            <div id={styles.iconBigDiv}><FontAwesomeIcon icon={faUser} id={styles.icon}/></div>
            <h1 id={styles.title}>Yo</h1>
        </div>
        <div>
        <h2 className={styles.subtitle}>Informacion personal</h2>
          <div className='row' id={styles.infoPersonalRow}>
            <div className='col-5' id={styles.informacionGeneralDiv}>
              <div id={styles.profileImg}><Image src={profile} id={styles.img} alt='Foto de perfil'/></div>
              <div id={styles.profileData}>
                <h3>{user.username}</h3>
                <p>{user.role === 'TEACHER' ? 'Profesor': 'Estudiante'}</p>
              </div>
            </div>
            <div className='col-7' id={styles.caracteristicas}>
              <div id={styles.caracteristicasContent}>
                <div className={styles.carItem}>
                  <p className={styles.carClave}>Peso</p>
                  <p className={styles.carValor}>{user.weight === null ? "N/A": `${user.weight}Kgh.`}.</p>
                </div>
                <div className={styles.carItem}>
                  <p className={styles.carClave}>Altura</p>
                  <p className={styles.carValor}>{user.height === null ? "N/A": `${user.height}Cm.`}</p>
                </div>
                <div className={styles.carItem}>
                  <p className={styles.carClave}>Edad</p>
                  <p className={styles.carValor}>{user.age === null ? "N/A": user.age}</p>
                </div>
                <div className={styles.carItem}>
                  <p className={styles.carClave}>Genero</p>
                  <p className={styles.carValor}>{user.gender === undefined ? "N/A": user.gender}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='row' id={styles.infoEstadisticasRow}>
            <div className="col-8" id={styles.infoEstadisticas}>
              <StatGlobal name={'Dias completados'} value={350} color={'#4ED0A2'}/>
              <StatGlobal name={'Horas totales'} value={400} color={'#FFA62B'}/>
              <StatGlobal name={'Max. Velocidad'} value={67} color={'#DC7F9B'}/>
              <StatGlobal name={'Cant. Grupos'} value={12} color={'#FCF7F8'}/>
            </div>
            <div className="col-4" id={styles.infoEstadisticasComparadas}>
              <StatsComparadas nombre={'Velocidad Promedio'} valorAct={30} valorComparado={60} type={'Kmh'} valorMax={200} icon={faGaugeSimple} color={'#4ED0A2'}/>
              <StatsComparadas nombre={'Frec. Cardiaca'} valorAct={160} valorComparado={130} type={'BPM'} valorMax={220} icon={faHeart} color={'#DC7F9B'}/>
              <StatsComparadas nombre={'Kcal quemadas'} valorAct={2000} valorComparado={1500} type={''} valorMax={10000} icon={faWeightScale} color={'#292424'}/>
              <StatsComparadas nombre={'Tiempo'} valorAct={150} valorComparado={180} type={'Mins'} valorMax={300} icon={faClock} color={'#FFA62B'}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Yo
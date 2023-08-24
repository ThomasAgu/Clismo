import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
//components
import NavBar from './components/NavBar'
import ImageComponent from './components/ImageComponent'
//images
import bike from '../public/images/BiciReal.png'
import group from '../public/images/GrupoReal.svg'
import lupa from '../public/images/lupaReal.png'

export default function Home() {

  
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Clismo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> {/* Esto no se hace D: */}
      </Head>
      
      <main className={styles.main}>
        <NavBar/>
        <div className='position-relative'>
          <ImageComponent src={'/../public/images/clismoappimg.jpg'} alt={'Alterna'}/>
          <div tabIndex={0}>
            <h1 id={styles.title}>Decile</h1>
            <h1 id={styles.titleAbajo}>SI a <strong id={styles.strongNameTitle}>Clismo</strong></h1>
          </div>
        </div>
        <div className='row text-center'>
          <div className='' id={styles.firstSeccion}>
            <Image 
            src={group}
            width={250}
            height={250}
            alt='Imagen de grupos'
            />
            <div id={styles.textDiv}>
              <h2 className={styles.legend} tabIndex={0}>Conecta con tu entrenador</h2>
              <div id={styles.conectaDiv}><p id={styles.conectaText} tabIndex={0}>Accede a entrenamientos personalizados conectándote con un entrenador. Disfruta de rutinas diseñadas para ti y ajustadas según tu progreso. Alcanza tus metas con un seguimiento cercano y motivación constante. ¡Eleva tu rendimiento y alcanza la mejor versión de ti mismo con la ayuda de expertos!</p></div>
            </div>
          </div>

          <div id={styles.SecondPart}>
            <div className='' id={styles.secondDiv}>
              <div id={styles.textDiv}>
                <h2 className={styles.legend} tabIndex={0}>Realiza los entrenamientos</h2>
                <div id={styles.conectaDiv}><p id={styles.conectaText} tabIndex={0}>Realiza entrenamientos personalizados de la app con ejercicios diseñados por expertos. Supera tus límites y alcanza tus objetivos con seguimiento y apoyo constante</p></div>
              </div> 
              <Image 
              src={bike}
              width={250}
              height={250}
              alt='Imagen de bicicleta'
              className={styles.icon}/>              
            </div>
          </div>
          <div id={styles.terceraParteDiv}>
            <div className='' id={styles.tercerdiv}>
              <Image 
              src={lupa}
              width={250}
              height={250}
              alt='Imagen de busqueda'
              className={styles.icon}/>
              <div id={styles.textDiv}>
                <h2 className={styles.legend} tabIndex={0}>Comprueba tu rendimiento</h2>
                <div id={styles.conectaDiv}><p id={styles.conectaText} tabIndex={0}>Mide tu progreso y rendimiento de usuario en tiempo real. Gráficos y estadísticas detalladas te permiten comprobar tus avances y celebrar tus logros en la aplicación.</p></div>
              </div>
            </div>
          </div>
        </div>
        <div id={styles.footer} className=''>
          <div id={styles.creditos} >Prototipo creado por Thomas Aguado y Santiago Ponte</div>
        </div>
      </main>
    </div>
  )
}

import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/ImagenPortada.module.css'
import img from '../../public/clismoappimg.jpg'

function getViewportValue(unit) {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  if (unit === 'vw') {
    return viewportWidth;
  } else if (unit === 'vh') {
    return viewportHeight;
  } else {
    throw new Error('Invalid unit. Please use "vw" or "vh".');
  }
}

const ImageComponent = ({src, alt}) => {

  const [viewportWidth, setViewportWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

     // Agrega el evento de escucha para actualizar el valor de viewportWidth en cada cambio de tamaño de la ventana
     window.addEventListener('resize', handleResize);

     // Limpia el evento de escucha cuando el componente se desmonta
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);

  console.log(`URL: `, src);

  const imageWidth = `${viewportWidth * 1}`; // Utiliza el 80% del ancho del viewport

  return (
    <Image 
      src={img} 
      alt={alt}
      width={imageWidth} 
      height={400} 
      id={styles.portadaImg}
      priority
    />

  )
}

export default ImageComponent
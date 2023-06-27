import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
//URL
import { BASE_URL } from './api/url';
//components
import NavBar from './components/NavBar'
import InputComponent from './components/InputComponent';
import RangeComponent from './components/RangeComponent'
//logo
import logo from '../public/images/Logo.png'
//styles
import styles from '../styles/RegisterExtra.module.css'
//store
import { useSelector } from 'react-redux';
const RegisterExtra = () => {

  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario

  
  const handleClickOptionalData = (e) =>{
    const alturaFloat = parseFloat(altura) + 0.01
    const pesoFloat = parseFloat(peso) + 0.01   
    e.preventDefault();
    const user = {
      height: alturaFloat,
      weight: pesoFloat,
      age: Number(edad),
    };
    console.log(user)
    console.log(pesoFloat)
    fetch(`${BASE_URL}users/update/${user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response  => response.json())
    .then(result => {router.push('/Home')})
    //Faltaria agregar boton omitir y decir si slaio bien o mal
  }

  const handleChangeValorEdad = (e) =>{
      setEdad(e.target.value);
  }

  const handleChangeAltura = (e) =>{
    setAltura(e.target.value)
  }

  const handleChangePeso = (e) =>{
    setPeso(e.target.value)
  }

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
                <RangeComponent label={'Edad'} min={'0'} max={'100'}  type={'Años'} valor={edad} setValor={handleChangeValorEdad} />
                <RangeComponent label={'Altura'} min={'0'} max={'300'}  type={'Cm.'} valor={altura} setValor={handleChangeAltura}/>
                <RangeComponent label={'Peso'} min={'0'} max={'200'}  type={'Kgr.'} valor={peso} setValor={handleChangePeso}/>
            </form>

            <hr />
            <div className=' d-flex justify-content-center'><button onClick={handleClickOptionalData} id={styles.registrarseBtn} >Registrarse</button></div>
          </div>
        </div>
        <p className='text-center pt-3'>Ninguno de estos datos se compartiran con otras personas mas que el profesor.</p>
      </div>
    </div>
  )
}

export default RegisterExtra
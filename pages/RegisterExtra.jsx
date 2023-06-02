import React from 'react'
import { useRouter } from 'next/router';
//components
import NavBar from './components/NavBar'
import InputComponent from './components/InputComponent';

const RegisterExtra = () => {

  const router = useRouter();
  return (
    <div>
      <NavBar />
      <div className='border border-2 w-50 m-auto flex-column d-flex align-items-center'>
        <p>icon</p>
        <form className='d-flex flex-wrap '>
          <div className='flex-row'>
            <InputComponent label={'Edad'} type={'number'}/>
            <InputComponent label={'Altura cm'} type={'number'}/>
          </div>
          <div className='flex-row'>
            <InputComponent label={'Peso'} type={'number'}/>
          </div>
        </form>

        <hr />
        <button onClick={() => router.push('/')} >Registrarse</button>
      </div>
    </div>
  )
}

export default RegisterExtra
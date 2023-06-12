import React from 'react'

const GrupoCard = ({nombre, descripcion, privacidad, cantIntegrantes, capacidad, dificultad, setMisGrupos, setGrupos, grupos}) => {
  
  const handleClickChange = () => {
    const gruposName = grupos.map(el=> el.nombre);
    const index  =gruposName.indexOf(nombre)
    const grupo = grupos[index];
    setMisGrupos((misGrupos) => [...misGrupos, grupo])
    const gruposLibres = grupos.filter((el) => el.nombre !== nombre)
    setGrupos(gruposLibres)
  }
  
  return (
    <div className='col-lg-3 col-md-6 col-sm-10 col-10'>
      <div>{nombre}</div>
      <div>{descripcion}</div>
      <div className="d-flex justify-content-between">
        <p> Capacidad{cantIntegrantes}/{capacidad}</p>
        <p>Nivel: {dificultad}</p>
      </div>
      <button onClick={handleClickChange}>Anotarme</button>
    </div>
  )
}

export default GrupoCard
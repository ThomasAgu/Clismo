import React from 'react'

const HistorialCard = ({data}) => {

  const formatearHora = (hora) =>{
    if(hora !== undefined){
      const formated = hora.split(':')
      return `${formated[0]}: ${formated[1]}`
    }
    return ''
  }

  console.log(data,'historial card')
  return (
    <div>{data == undefined ? '' : data.day}</div>
  )
}

export default HistorialCard
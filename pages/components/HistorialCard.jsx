import React, {useEffect, useState} from 'react'
import styles from '../../styles/Calendar.module.css'
import { BASE_URL } from '../api/url'

const HistorialCard = ({data}) => {
  
  const [groupName, setGroupName] = useState('')
  const [trainName, setTrainNamie] = useState('')

  useEffect(() => {
    if(data !== undefined){
      fetch(`${BASE_URL}groups/${data.group_id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(result => {
          setGroupName(result.name)
        })

        fetch(`${BASE_URL}trainings/${data.training_id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(result => {
            setTrainNamie(result.name)
          })
      }
  })

  const formatearHora = (hora) =>{
    if(hora !== undefined){
      const formated = hora.split(':')
      return `${formated[0]}: ${formated[1]}`
    }
    return ''
  }

  console.log(data,'historial card')
  return (
    <div id={styles.cardComponent}>{data == undefined ? '' : 
      <div id={styles.contentCard}>
        <div id={styles.groupName}>Grupo: {groupName}</div>
        <div id={styles.trainName}>Entrenamiento: {trainName}</div>
      </div>}
    </div>
  )
}

export default HistorialCard
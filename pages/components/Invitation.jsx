import React, { useEffect , useState} from 'react'

import { BASE_URL } from '../api/url'

import styles from '../../styles/Invitation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX  } from '@fortawesome/free-solid-svg-icons'
const Invitation = ({gui, uid, id, setActive, setInvitacionesValidas, invitacionesValidas}) => {

  const [grupo, setGrupo] = useState({})
  useEffect(()=>{
    fetch(`${BASE_URL}groups/${gui}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(result => {
    setGrupo(result)
  })
  })


    const handleClickAccept = () =>{
        fetch(`${BASE_URL}users/${uid}/invitation/${id}/accept`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response  => response.json())
          .then(result => {
            setActive(false)
            const invitacionesAct = invitacionesValidas.map((inv) => {if (inv.id === id) {inv.accepted = true}} )
            console.log(invitacionesAct)
            setInvitacionesValidas(invitacionesAct)
            //aca poner notificacion
          })
        }
    const  handleClickReject = () =>{
        fetch(`${BASE_URL}users/${uid}/invitation/${id}/decline`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(result => {
            setActive(false)
            const invitacionesAct = invitacionesValidas.map((inv) => {if (inv.id === id) {inv.accepted = true}} )
            console.log(invitacionesAct)
            setInvitacionesValidas(invitacionesAct)
          })
        }       

    const handleKeyAceptar = (event) => {
      if (event.keyCode === 13) {;
        handleClickAccept()
      }  
    }

    const handleKeyRechazar = (event) => {
      if (event.keyCode === 13) {;
        handleClickReject()
      } 
    }
   return (
    <div id={styles.content}>
        <h6 aria-label={`Usted ha sido invitado al grupo ${grupo.name}`}>Usted ha sido invitado al grupo {grupo.name}</h6>
        <div id={styles.btns}>
            <div><button id={styles.btnAccept} onClick={handleClickAccept} aria-label="Aceptar invitacion" onKeyDown={handleKeyAceptar}><FontAwesomeIcon icon={faCheck} /></button></div>
            <div><button id={styles.btnCancel} onClick={handleClickReject} aria-label="Rechazar invitacion" onKeyDown={handleKeyRechazar}><FontAwesomeIcon icon={faX} /></button></div>
        </div>
    </div>
  )
}

export default Invitation
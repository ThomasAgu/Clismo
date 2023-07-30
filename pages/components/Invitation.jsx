import React, { useEffect } from 'react'

import { BASE_URL } from '../api/url'

import styles from '../../styles/Invitation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX  } from '@fortawesome/free-solid-svg-icons'
const Invitation = ({gui, uid, id, setActive, setInvitacionesValidas, invitacionesValidas}) => {


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
            //aca poner notificacion
          })
        }       
   return (
    <div id={styles.content}>
        <h6>Usted ha sido invitado al grupo {gui}</h6>
        <div id={styles.btns}>
            <div><button id={styles.btnAccept} onClick={handleClickAccept}><FontAwesomeIcon icon={faCheck} /></button></div>
            <div><button id={styles.btnCancel} onClick={handleClickReject}><FontAwesomeIcon icon={faX} /></button></div>
        </div>
    </div>
  )
}

export default Invitation
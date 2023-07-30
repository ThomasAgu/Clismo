import React from 'react'
import Invitation from './Invitation'
import { useState } from 'react'
import styles from '../../styles/Notificantions.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const Notifications = ({invitations}) => {
  const [active, setActive] = useState(false)
  const [invitacionesValidas, setInvitacionesValidas] = useState([])



  const handleClickActivate = () => {
    setActive(active => !active)
    setInvitacionesValidas(invitations.filter((i) => i.accepted == false))
  }
    return (
    <div id={styles.notifificationContent} onClick={handleClickActivate}>
        {Array.isArray(invitations) && invitations.length > 0 ? 
          invitations.filter((i) => i.accepted == false).length > 0 ? 
            <div id={styles.roundenNotificationActive}><FontAwesomeIcon icon={faBell} id={styles.bellActive}/> <div id={styles.notCant}>{invitations.filter((i) => i.accepted == false).length}</div></div>
            :
            <div id={styles.roundenNotificationInactive}><FontAwesomeIcon icon={faBell} id={styles.bellInactive}/></div>
          :
        ''
        }
        {active ? 
            invitacionesValidas.length > 0 ?
            <div id={styles.notificancionsList}>
              {Array.isArray(invitacionesValidas) && invitacionesValidas.length > 0 ?
                  invitacionesValidas.map((i) => <Invitation key={i.id} gui={i.id_group} uid={i.id_user}  id={i.id} setActive={setActive} setInvitacionesValidas={setInvitacionesValidas} invitacionesValidas={invitacionesValidas}/>)
                  :
                  ""
              }
            </div> 
            :    
            <div id={styles.notificationsListInactive}>
              <div id={styles.InactiveContent}>
                <h6>No tenés invitaciones</h6>
              </div>
            </div>
            :
          <></>
        }
    </div>
  )
}

export default Notifications
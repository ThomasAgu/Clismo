import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
//components
import NavBar from '../components/NavBar'
import NavNarSesion from '../components/NavNarSesion'
import UserComponent from '../components/UserComponent'
import NotificacionPopUpComponent from '../components/NotificacionPopUpComponent'
import BackArrow from '../components/BackArrow'
import Head from 'next/head'
//fA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersLine } from '@fortawesome/free-solid-svg-icons'
//styles
import styles from '../../styles/GrupoDetalles.module.css'
import { BASE_URL } from '../api/url'
import { useSelector } from 'react-redux'
const GrupoDetalles = () => {
    const router = useRouter();

    const { id } = router.query; 
    const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario

    const [ grupoAct, setGrupo ] = useState({})
    const [usuariosExternos, setUsuariosExternos] = useState([])
    //para el popup
    const [popUp, setPopUp] = useState(false)
    const [todoBienOMal,setTodoBienOMal] =useState('todobien')
    const [msg, setMsg] = useState('')
    //Busqueda de nombres
    const [inputText, setInputText] = useState('')
    const [usersTotales, setUsersTotales] = useState([])
    const [usersGrupo, setUsersGrupo] = useState([])


    useEffect(() => {
        fetch(`${BASE_URL}/users/list`,{
            method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(result =>{
            //setear los usuarios que son al grupo / y no al grupo
            const users = result
            
            const usuariosExternos = users.filter((u) =>{
                if((u.groups.filter((g) => (g.id == id)).length === 0)&&(user_id !== u.id)){
                    return u
                } 
            })
           
            setUsersTotales(users)
            setUsuariosExternos(usuariosExternos) 
   
        })

        fetch(`${BASE_URL}groups/${id}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(result => {
                const group = result
                setGrupo(group)
                const usuariosGrupo = group.users.map((u) => u)
                setUsersGrupo(usuariosGrupo)
            })
            
        }, [])

   
    const handleChangeSearchUser = (e) =>{
        if(e.target.value === ''){
            const usuariosExternos = usersTotales.filter((u) =>{
                if((u.groups.filter((g) => (g.id == id)).length === 0)&&(user_id !== u.id)){
                    return u
                } 
            })
            const usuariosGrupo = grupoAct.users.map((u) => u)
            setUsuariosExternos(usuariosExternos) 
            setUsersGrupo(usuariosGrupo)
            setInputText('')
        
        }
        else{
            setInputText(e.target.value)
            const input = e.target.value
            // si esta en grupo users o usuarios externos actualizar lista
            const usuariosDelGrupo = grupoAct.users.filter((u) => u.username.toLowerCase().includes(input.toLowerCase()))
            const usuariosExternosName = usuariosExternos.filter((u) => u.username.toLowerCase().includes(input.toLowerCase()))
            setUsuariosExternos(usuariosExternosName)
            setUsersGrupo(usuariosDelGrupo)
            

        }
        
    }

    return (
    <div id={styles.bigDiv}>
        <Head>
            <title>Clismo</title>
            <meta name="description" content="Detalles del grupo." />
        </Head>
         <NavBar/>
        <NavNarSesion/>
        <BackArrow/>
        <div className='d-flex flex-column text-center mt-3' id={styles.title}>
                <div id={styles.iconBigDiv}><FontAwesomeIcon icon={faUsersLine} id={styles.icon} /> </div>
                <h1 id={styles.titleText}> Grupo {grupoAct.name} </h1>
        </div>
        <div id={styles.mainContent}>
            {/* gRUPO CARD */}
            <div id={styles.grupoCard}>
                <div id={styles.nameContent}><h2>{grupoAct.name}</h2></div>
                <div id={styles.descContent}><p>{grupoAct.description}</p></div>
                <div id={styles.difficultyContent}>
                    <h3>Dificultad</h3>
                    <div id={styles.labels}>
                        <div className={grupoAct.difficulty === 'EASY' ? styles.labelActive : styles.labelInactive }><div>Fácil</div></div>
                        <div className={grupoAct.difficulty === 'MIDDLE' ? styles.labelActive : styles.labelInactive }><div>Medio</div></div>
                        <div className={grupoAct.difficulty === 'HARD' ? styles.labelActive : styles.labelInactive }><div>Difícil</div></div>
                    </div>
                </div>

                <div id={styles.privacyContent}>
                    <h3>Privacidad</h3>
                    <div id={styles.labels}>
                        <div className={grupoAct.privacy === 'PUBLIC' ? styles.labelActive : styles.labelInactive }><div>Público</div></div>
                        <div className={grupoAct.privacy === 'PRIVATE' ? styles.labelActive : styles.labelInactive }><div>Privado</div></div>
                    </div>
                </div>
            </div>
            {/* FIn grupo card */}
            {/* Integrantes e invitaciones */}
            <div id={styles.usersCard}>
                <div id={styles.searchContent}><label htmlFor="" id={styles.labelInput}><input type="text" name="" value={inputText} id={styles.inputUsuario} onChange={handleChangeSearchUser} placeholder='Buscar usuarios'/>Buscar Users</label></div>
                <div id={styles.usuarios}>
                    {usersGrupo.map((u)=>{
                            return (<UserComponent key={u.id} name={u.username} esUser={true} uid={u.id} gid={grupoAct.id} setPopUp={setPopUp} setTodoBienOMal={setTodoBienOMal} setMsg={setMsg}/>)
                    })
                    
                    }
                    {usuariosExternos.map((u) =>{
                        return(<UserComponent key={u.id} name={u.username} esUser={false} uid={u.id} gid={grupoAct.id} setPopUp={setPopUp} setTodoBienOMal={setTodoBienOMal} setMsg={setMsg}/>)
                    })}
                
                </div>
            </div>
            { popUp ? 
                <NotificacionPopUpComponent msg={msg} todoBienOtodoMal={todoBienOMal} active={popUp} setActive={setPopUp} tiempo={100}/>
                :
                <></>
      }
        </div>


    </div>
  )
}

export default GrupoDetalles
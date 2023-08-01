import React, {useEffect, useState }from 'react'
import { BASE_URL } from '../api/url'
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
//styles
import styles from '../styles/ProxEntrenamiento.module.css'
import { useSelector } from 'react-redux'



const ProxEntrenamiento = ({primerEntrenamiento, historial ,setHistorial}) => {

    const [dataT, setDadaT] = useState({})
    const user_id = useSelector(state=> state.login.user.id) //trae el id del usuario

    useEffect(() => {
        if(primerEntrenamiento !== undefined){
            fetch(`${BASE_URL}trainings/${primerEntrenamiento.training_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(result => {
                setDadaT(result)
            })
            .catch((err)=>{console.log(err)})

        }
    }, [primerEntrenamiento] )

    const verSiEstaCompletado = () =>{
        if(primerEntrenamiento !== undefined){
            const idsHistorial = historial.map((el) => el.id )
            if(idsHistorial.indexOf(primerEntrenamiento.id) !== -1){
                return false
            }
            return true
        }
        
    }

    const handleClickCompletarEntrenamiento = () =>{
        if (primerEntrenamiento !== undefined){
            fetch(`${BASE_URL}users/${user_id}/schedule/${primerEntrenamiento.id}/complete`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(response => response.json())
                .then(result => {
                    setHistorial((el) => [...el, result])
                    //Setear el proximo entrenamiento no completado D: ?
                })
        }
        
    }


    const  horaFormateada = (horario) => {
        if(horario !== undefined){
            const horas = horario.split(':')
            return `${horas[0]}:${horas[1]}`
        }
        return ''
    }

    const calendarioFormateado = (diadelTrain) =>{

        const diasSemana = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
        const hoy = new Date();
        const diaActual = hoy.getDay()-1; 
        const indiceDia = diasSemana.indexOf(diadelTrain);
        // Calculamos la diferencia de días hasta el próximo día especificado
        let diasHastaProximoDia;
        if (indiceDia >= diaActual) {
            diasHastaProximoDia = indiceDia - diaActual -1;
        } else {
            diasHastaProximoDia = 7 - diaActual + indiceDia;
        }

        // Calculamos la fecha del próximo día
        const fechaProximoDia = new Date(hoy);
        fechaProximoDia.setDate(hoy.getDate() + diasHastaProximoDia);

        // Obtenemos el día y el mes del próximo día en formato "dia/mes"
        const dia = fechaProximoDia.getDate()+1;
        const mes = fechaProximoDia.getMonth() + 1; // Los meses en JavaScript son indexados desde 0

        return `${dia}/${mes}`;
    }
    
  return (
    <div id={styles.content}>
        <div id={styles.circle}>
            <div id={styles.circleContent}>
                <FontAwesomeIcon icon={faCalendar} id={styles.icon}/>
                <p id={styles.day}>{primerEntrenamiento == undefined ? "": calendarioFormateado(primerEntrenamiento.day)}</p>
            </div>
        </div>
        <h3 id={styles.nombre}>{dataT == undefined ? '': dataT.name}</h3>
        <div id={styles.descriptionDiv}>
            <p id={styles.descripcion}>{dataT == undefined ? '': dataT.description}</p>
        </div>
        
{/*         <h4 id={styles.parametros}>{dataT == undefined ? '' : dataT.exercises.reduce(function(acc,ex) {return acc + Number(ex.duration)},0)} mins. | {dataT.exercises.length} ejercicios</h4>
 */}        
        <div id={styles.horas}> 
            <div className={styles.clock}>
                <FontAwesomeIcon icon={faClock} id={styles.iconClock}/>
                <div>{primerEntrenamiento == undefined ? "" : horaFormateada(primerEntrenamiento.starttime)}</div>
            </div>
            <div className={styles.clockDark}>
                <FontAwesomeIcon icon={faClock}  id={styles.iconClock}/>
                <div>{primerEntrenamiento == undefined ? "" : horaFormateada(primerEntrenamiento.endingtime)}</div>
            </div>
        </div>
        {verSiEstaCompletado() ?
            <div id={styles.completarEntrenamientoContent}><button onClick={handleClickCompletarEntrenamiento} id={styles.completarBtn}>completar</button></div>    
            :
            <div id={styles.completadoEntrenamiento}>completado</div>
        }
    </div>
  )
}

export default ProxEntrenamiento
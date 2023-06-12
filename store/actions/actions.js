import gruposList from '../../datosParaProbar/grupos';


// Acción de inicio de sesión exitoso
export const loginSuccess = (user) => {
    return {
      type: 'LOGIN_SUCCESS',
      payload: user,
    };
  };
  
  // Acción de cierre de sesión
  export const logout = () => {
    return {
      type: 'LOGOUT',
    };
  };

// Acción para agregar un nuevo grupo
export const agregarGrupo = (grupo) => {
  
  return {
    type: 'AGREGAR_GRUPO',
    payload: grupo
  };
};

// Acción para obtener los datos de los grupos
export const obtenerGrupos = () => {
  return {
    type: 'OBTENER_GRUPOS',
    payload: gruposList
  } 
  }

// Acción para eliminar un grupo
export const eliminarGrupo = (grupoId) => {
  return {
    type: 'ELIMINAR_GRUPO',
    payload: grupoId
  };
};

//accion para agregar un entrenmaineto
export const agregarEntrenamiento = (entrenamiento) =>{
  return {
    type: 'AGREGAR_ENTRENAMIENTO',
    payload: entrenamiento
  };
}

// Acción para obtener los datos de los entrenamientos
export const obtenerEntrenamientos = () => {
  return {
    type: 'OBTENER_ENTRENAMIENTOS',
    payload: []
  } 
  }

  
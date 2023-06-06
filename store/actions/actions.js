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
  
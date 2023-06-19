import { BASE_URL } from "./url";

export async function agregar_al_grupo(user){
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        
    });
    const data = await response.json()
    return data;
}

export async function salir_del_grupo(user){
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        
    });
    const data = await response.json()
    return data;
}



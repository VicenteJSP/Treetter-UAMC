const list = [
    {
        "url": "/",
        "method": "GET",
        "description": "Lista todas las rutas de interaccion del sistema"
    },
    {
        "url": "/singup",
        "method": "POST",
        "description": "Registrar un nuevo usuario",
        "params-body": ["avatar", "name", "surnames", "username", "password", "email", "username-twitter"]
    },
    {
        "url": "/singin",
        "method": "POST",
        "description": "Logear usuario registrado",
        "params-body": ["username", "password"]
    },
    {
        "url": "/api/:user",
        "method": "PUT",
        "description": "Actualiza la informacion de una cuenta",
        "params-body": ["avatar", "name", "surnames", "password", "email"],
        "token": true
    },
    {
        "url": "/api/treemap/:username",
        "method": "GET",
        "description": "Lista todas las rutas de interaccion del sistema",
        "token": true,
        "treemap": true
    }
];

export default list;
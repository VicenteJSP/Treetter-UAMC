const messageTxt = {
    "info": {
        "query_info": {
            "success": {
                "200": "Listado de rutas de interaccion con Treetter"
            }
        }
    },
    "treemap": {
        "query_treemap": {
            "success": {
                "200": "Sea creado correctamente el treemap del usuario"
            },
            "fail": {
                "401": "No has ingresado un usuario para realizar la consulta",
                "404": "Usuario no encontrado en Twitter",
                "500": ":(  Sentimos los inconvenientes, estamos experimentando algunos problemas, nuestro equipo de desarrollo ya está trabajando en resolverlo, intenta más tarde por favor."
            }
        }
    },
    "user": {
        "user_info": {
            "success": {
                "200": "Credenciales válidas."
            },
            "fail": {
                "401": "Credenciales inválidas.",
                "500": "Error al validar credenciales."
            }
        },
        "create_account": {
            "success": {
                "201": "Usuario creado correctamente"
            },
            "fail": {
                "401": "Datos de registro incompletos",
                "403": "Los datos que intentas registrar ya existen en el sistema, por favor verificalos e intenta de nuevo.",
                "500": "Error al registrar al usuario"
            }
        },
        "update_account": {
            "success": {
                "201": ""
            },
            "fail": {
                "401": "",
                "500": ""
            }
        },
        "delete_account": {
            "success": {
                "201": ""
            },
            "fail": {
                "401": "",
                "500": ""
            }
        }
    },
    "auth": {
        "user_auth": {
            "success": {
                "201": "Usuario autenticado correctamente."
            },
            "fail": {
                "400": "En usuario no existe o esta inactivo.",
                "401": "Credenciales incorrectas.",
                "403": "Credenciales incompletas, faltan datos",
                "500": ":(  Sentimos los inconvenientes, estamos experimentando algunos problemas, nuestro equipo de desarrollo ya está trabajando en resolverlo, intenta más tarde por favor."
            }
        }
    }
}

export default messageTxt;
import  jwt  from "jsonwebtoken";
import Usuario from "../users/usuario.js";
import Administrador from "../admin/administrador.js";

export const validarJWT = async(req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion",
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);
        const administrador = await Administrador.findById(uid);

        if(!usuario && !administrador){
            return res.status(400).json({
                msg: "Credenciales incorrectas, el usuario no existe en la base de datos"
            })
        }

    
        let usuarioToken;
        if (usuario) {
            usuarioToken = usuario;
        } else {
            usuarioToken = administrador;
        }


        if(!usuarioToken.estado){
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }

        req.usuario= usuarioToken;

        next();

    } catch (e) {
        console.log(e),
        res.status(401).json({
            msg: "Token no valido"
        });
    }
}

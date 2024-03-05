export const tieneRol = (...roles) => {
    return (req, res, next) => {
        if(!req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere verificar un rol sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `Usuario no autorizado, posee un role ${req.usuario.role}, los roles autorizados son ${ roles }`
            })
        }

        next();
    }

}
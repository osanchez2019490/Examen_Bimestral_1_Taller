import  mongoose from 'mongoose';

const defaultRoles = [
    { role: 'USUARIO_ROLE'},
    { role: 'ADMINISTRADOR_ROLE'}
];

const RoleSchema = mongoose.Schema({
    role: {
        type: String,
        require: [true, "El rol es obligatorio"]
    }
});

const Role = mongoose.model('Role', RoleSchema);

defaultRoles.forEach(async (defaultRole) => {
    try {
        const existeRole = await Role.findOne({ role: defaultRole.role });
        if(!existeRole) {
            await Role.create(defaultRole);
            console.log(`Rol preterminado ${defaultRole.role} creado`);
        }
    } catch (e) {
        console.error('Error al crear los roles preterminados: ', e)
    }
});

export default Role
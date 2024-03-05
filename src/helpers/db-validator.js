import Usuario from '../users/usuario.js';
import Administrador from '../admin/administrador.js';
import Role from '../roles/role.js';
import Categoria from '../categoria/categoria.js';

export const existeEmeail = async(correo= '') =>{
    const existeEmeail = await Usuario.findOne({correo});
    const existeEmeailAdmin = await Administrador.findOne({correo});
    if (existeEmeail ||  existeEmeailAdmin  ) {
        throw new Error ( `El email ${ correo } existe en la base de datos`)
    };
};

export const existeUsername = async (username = '') =>{ 
    const existeUsername = await Usuario.findOne({username});
    const existeUsernameAdmin = await Administrador.findOne({username});
    if(existeUsername ||  existeUsernameAdmin) {
        throw new Error (`El username ${ username } existe en la base de datos`);
    };
};

export const existeRole = async (role = '') => {
    const existeRole = await Role.findOne({role});
    if(!existeRole) {
        throw new Error (`El rol ${role} no existe en la base de datos`);
   };
};

export const existeCategoria = async (categoria = '') =>{ 
    const existeCategoria = await Categoria.findOne({categoria});
    if(existeCategoria) {
        throw new Error (`La categoria ${ categoria } existe en la base de datos`);
    };
};


export const existeModelosById = async (id = '') =>{ 
    const existeIdUsuario = await Usuario.findOne({id});
    const existeIdUsuarioAdmin = await Administrador.findOne({id});
    const existeIdCategoria = await Categoria.findOne({id});
    if(!existeIdUsuario ||  !existeIdUsuarioAdmin || !existeIdCategoria)  {
        throw new Error (`El id ${ id }  no existe en la base de datos`);
    };
};

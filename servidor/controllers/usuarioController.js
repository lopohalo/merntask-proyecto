const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


 exports.crearUsuario = async(req, res) => {

     const errores = validationResult(req);
     if(!errores.isEmpty()){
      
       return res.status(400).json({errores: errores.array()})
     }
        
     const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({email});

         if(usuario) {
          
           return res.status(300).json({ msg: 'El usuario ya existe'})
         }

        console.log(usuario)
        usuario = await new Usuario(req.body);

        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);


        await usuario.save();

        const payload = {
          usuario: {
            id: usuario.id
          }
        }

           // firmar el JWT
           jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
        
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token  });
        });


    } catch (error) {
        res.status(400).send('Hubo un error');
    }
}

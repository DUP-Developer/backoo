import dbConnection from '../connection'
import {
  password
} from '../../utils'

export default {
  async run () {
    const models = await dbConnection

    await this.user_types(models)
    await this.usuario(models)
  },

  async user_types (model) {
    await model.Tipo_user.create({ tipo: 'consultor' })
    await model.Tipo_user.create({ tipo: 'supervisor' })
    await model.Tipo_user.create({ tipo: 'regional' })
    await model.Tipo_user.create({ tipo: 'admin' })
  },
  
  async usuario(model) {
    await model.Usuario.create({            
      nome: 'admin',            
      email: 'admin@g.com',           
      login: 'admin',           
      senha: password.generate('123'),           
      data_nascimento: '1994-08-28', 
      tipo_user_id: 4      
    })    
  }
}

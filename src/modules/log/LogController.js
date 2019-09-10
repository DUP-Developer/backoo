import dbConnection from '../../db/connection'

export default {
  /**
   * Método responsavel por cadastrar o cliente
   * a variavel data refere-se aos dados qa serem populados
   * no sistema
   *
   * @param {Object} data
   */
  async add(app, data) {
    const models = await dbConnection

    let appData = await models.Apps.findAll({
      where: {
        name: app.applicationName
      }
    })

    // console.log(appData);
    
    if (Array.isArray(appData) && appData.length < 1) {
      appData = await models.Apps.create({
        name: app.applicationName,
        version: app.version
      })
    }

    data.app_id = appData.id

    // adicionando o id do usuario que esta adicionando
    const cliente = await models.Logs.create(data)
    return cliente
  },
  /**
   * Listagem de clientes
   */
  async list(applicationName) {
    const models = await dbConnection

    const cliente = await models.Logs.findAll({
      includes: [{
        model: models.Apps,
        where: {
          name: applicationName
        }
      }]
    })
    // retornar dados inseridos
    return cliente
  }
}

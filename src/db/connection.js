import Sequelize from 'sequelize'
import env from 'dotenv'
import {
  URI_DB_MODELS
} from '../utils/constants'
import directory from '../utils/directory'

import migrationSequence from './migrations/migration.json'

/**
 * pegando as informações do arquivo .env
 * e as registrando
 */

env.config()

// objeto de banco de dados
export const db = {
  instance: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    define: {
      timestamps: true // true by default
    },
    pool: {
      max: 6,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }),
  schema: {},
  /**
   * inicialização do banco de dados,
   * processamento dos modelos e associações
   */
  async statement () {
    const schemaDB = {}
    /**
     * fazendo o import de todos os models
     * da aplicação e as colocando no esquema
     * de dados
     */
    
    migrationSequence.forEach(file => {
      schemaDB[file.replace(/^\w/, c => c.toUpperCase())] = (this.instance.import(`${__dirname}/models/${file}`))
    })
    
    /**
     * fazendo a associção das tabelas
     * no esquema de dados do ORM
     */
    Object.keys(schemaDB).forEach(modelName => {
      if (schemaDB[modelName].associate) {
        schemaDB[modelName].associate(schemaDB)
      }
    })

    schemaDB.sequelize = this.instance

    return schemaDB
  },
  /**
   * drop all db
   */
  drop () {
    this.instance.drop()
    return this
  },
  /**
   * load novos models
   */
  load () {
    this.instance.sync()
    return this
  },
  /**
   * zera tudo e cria novamente
   */
  loadForce () {
    // this.instance.sync({force: true})
    return this
  }
}

export default db.statement()

export const mountDB = db.loadForce().statement()

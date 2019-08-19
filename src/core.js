import fs from 'fs'
import format from './utils/format'
/**
 * 
 * esse é o core da api responsavel pro configurar e 
 * instancia as routas e middlewares no sistema como 
 * um todo.
 * 
 */
const baseAPI = '/api/v1';

export default {
  pathModules: `${__dirname}/modules`,
  pathMiddles: `${__dirname}/middlewares`,
  
  loadResources(app) {    
    // read the middlewares globals
    this.middlewares(app)
    
    // read the routes in modules
    this.routes(app)
  },

  /**
   * load de rotas
   */
  routes(app) {
    fs.readdir(this.pathModules, (err, files) => {
      if(err) throw err;

      files.forEach(  (path) => {
        const isExists = fs.existsSync(`${this.pathModules}/${path}/Route.js`)

        if (!isExists) this.logs(`falha ao buscar o arquivo => ${this.pathModules}/${path}/Route.js`)

        import(`${this.pathModules}/${path}/Route.js`).then((routes) => {
          // caso tenha um middleware na pasta ele é carregado para a rota
          if (fs.existsSync(`${this.pathModules}/${path}/Middlewares.js`)) {
            import (`${this.pathModules}/${path}/Middlewares.js`).then((middle) => {
              app.use(`${baseAPI}/${format.adaptiveRouter(path)}`, middle.default, routes.default);              
            })
          } else {            
            app.use(`${baseAPI}/${format.adaptiveRouter(path)}`, routes.default);
          }
        })
      })
    })
  },

  /**
   * load de middlewares
   */
  middlewares(app) {
    fs.readdir(this.pathMiddles, (err, files) => {
      if (err) throw err;

      files.forEach((path) => {
        import (`${this.pathMiddles}/${path}`).then((middle) => {
          app.use(middle.default);
        })
      })
    })
  },

  /**
   * responsavel por gerar e apresentar os logs
   */
  logs(msg) {
    throw msg
  }
}
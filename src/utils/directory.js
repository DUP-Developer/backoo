import fs from 'fs'
import {
  ERROR_READ_DIR_MODELS
} from '../utils/errosMessage'

export default {
  readDir (path) {
    /**
     * varrendo todos os arquivos de modelos
     * para geralos automaticamente
     */
    return new Promise(resolve => {
      fs.readdir(path, (err, files) => {        
        if (err) throw ERROR_READ_DIR_MODELS

        resolve(files)
      })
    })
  }
}

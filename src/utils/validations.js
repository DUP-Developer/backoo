import _ from 'lodash'
import ValidationException from './exceptions/ValidationsExceptions';
export default {
  not: {
    /**
     * Validaçaõ para saber se o campo esta vindo
     * realmente
     *
     * @param {*} data
     * @param {String} message
     */
    null(data, message) {
      if (_.isObject(data)) {
        _.forEach(data, d => {
          if (!d) {
            throw new ValidationException({ message: message || 'Dado está nulo.' })
          }
        })
      } else {
        if (!data) {
          throw new ValidationException({ message: message || 'Dado está nulo.' })
        }
      }
    },

    /**
     * Validaçaõ para saber se o campo esta vindo
     * realmente
     *
     * @param {*} data
     * @param {String} message
     */
    number(data, message) {
      if (_.isArray(data)) {
        data.forEach(d => {
          if (_.isInteger(d)) {
            throw new ValidationException({message: message || 'Isso não é um numero.'})
          }
        })
      } else {
        if (_.isInteger(data)) {
          throw new ValidationException({message: message || 'Isso não é um numero'})
        }
      }
    },

    /**
     * Validação se é um numero
     *
     * @param {*} data
     * @param {String} message
     */
    object(data, message) {
      if (_.isArray(data)) {
        data.forEach(d => {
          if (_.isObject(d)) {
            throw new ValidationException({message: message || 'Isso não é um Objeto.'})
          }
        })
      } else {
        if (_.isObject(data)) {
          throw new ValidationException({message: message || 'Isso não é um Objeto'})
        }
      }
    }
  }
}

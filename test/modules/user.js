import expect from 'expect.js'
import user from '../../src/modules/usuario/UsuarioController'

export default {
  start() {
    describe("Module User:", () => {
      describe('Autenticando o usuario #autenticate()', () => {
        it('Fazendo autenticação com sucesso', () => {
          userCredentials = user.autenticate({})
          expect(userCredentials).to.be.an('object')
        });
      });
    });
  }
} 

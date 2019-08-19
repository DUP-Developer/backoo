import _ from 'lodash'

export default {
  /**
   * função que adapta as rotas para ler se vem na rota composta ou simples
   * ou seja caso o nome do module é '/casaDaVeia' a rota vai ser chamada
   * da seguinte forma '/casa-da-veia' mas tbm ela poderar ser chamada de '/casaDaVeia'.
   * E se for um nome simples como 'casa' não tem o que fazer não kk.
   * 
   */
  adaptiveRouter(name) {
    const ignore = [ // array de caracteres que seram ignorados na montagem da string
      '-', '_'
    ];

    const arr = name.split([]);
    const word = [];

    _.forEach(arr, (letter) => {
      // condicionais de ignores
      if (_.indexOf(ignore, letter) === -1) {
        if (letter === letter.toUpperCase()) {
          word.push('-', letter.toLowerCase()); // controlle caso já venha com o '-' no modulo | só controlle de erros
        } else {
          word.push(letter);
        }
      }
    });
    const joined = word.join('');

    return /-/g.test(joined) ? joined : name;
  }
}
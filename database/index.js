const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync('./database/m2db.json'))

db.defaults({
  configsIncrements: { }
}).write()

/**
-------------------------------------------------
- DB -
-------------------------------------------------
**/
class Database {
  //pegando o index para geração de ids em sequencia
  auto_increment(table) {
    //pegando o id para mandar para o registro
    let id = db.get('configsIncrements.' + table).value()

    // incrementando o id para o proximo registro pegar como valor unico
    db.set('configsIncrements.' + table, ++id).write()

    return id
  }

  //criando tabelas dado o nome da tabela
  createTable(table) {
    if (!db.has(table).value()) {
      // criando a tabela de para serem inserido no futuro informações
      db.set(table, []).write()

      // criando propriedade para auto incremento especiffico dessa tabela
      db.set('configsIncrements.' + table, 0).write()
    }
  }

  //listando todas as tables para informação
  info() {
    return db.getState()
  }

  //inserindo dados no banco dados table e json
  insert(table, json) {
    if (!db.has(table).value()) {
      // console.log("Tabela não existe\n");
      this.createTable(table)
      // return;
    }


    // inserindo no banco de dados
    db.get(table).push(json).value()
    // adicionando o novo id automatico
    json.id = this.auto_increment(table)

    return json
  }

  //atualiza todo o objeto dado a table, id e json que sera a nova versão do objeto
  update(table, id, json) {
    db.get(table).find({
      id: id
    }).assign(json).write()
  }

  //deleta item por id
  delete(table, id) {
    db.get(table).remove({
      'id': id
    }).write()
  }

  // limpa a table
  truncate(table) {
    db.set(table, {}).write()
  }

  //busca por alguma coisa pelo id
  find(table, id) {
    return db.get(table).find({
      'id': id
    }).value()
  }

  // find by anything
  findBy(table, data) {
    return db.get(table).find(data).value()
  }

  //busca especifica por alguma coisa  {key: val}
  search(table, json) {
    return db.get(table).value(db.get(table).find(json).value())
  }

  all(table) {
    return Object.assign([], db.get(table).value())
  }
}

module.exports = new Database();
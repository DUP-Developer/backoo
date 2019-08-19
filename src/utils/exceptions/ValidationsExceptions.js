export default class ValidationException {
  constructor ({...data}) {
    return Object.assign({
      message: '',
      name: 'ValidationException'
    }, data)
  }
}

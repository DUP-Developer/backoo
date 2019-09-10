import bcrypt from 'bcryptjs'

export const password = {
  generate (pass) {
    return bcrypt.hashSync(pass, 8)
  },
  check (pass, dbPass) {
    return bcrypt.compareSync(pass, dbPass)
  }
}

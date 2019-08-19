import _ from 'lodash'
import statement from '../db/connection'
import jwt from 'jsonwebtoken'
import freeRoutes from '../utils/routes/freeRoutes'

export default async (req, res, next) => {  
  // if (_.isEmpty(freeRoutes.filter(path => path === req.path))) {
  //   const model = await statement
  //   const token = req.headers['x-access-token'] || req.query['x-access-token']
    
    
  //   if (_.isUndefined(token)) {
  //     return res.status(401).send({
  //       auth: false,
  //       message: 'No token provider!'
  //     })
  //   } else {
  //     jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
  //       if (err) {
  //         return res.status(500).send({
  //           auth: false,
  //           message: 'Failed to authenticate token.'
  //         })
  //       }
        
  //       const user = await model.Usuario.findById(decoded.id)
  //       decoded.user = user
  //       req.decoded = decoded
  //     })
  //   }
  // }
  next()  
}

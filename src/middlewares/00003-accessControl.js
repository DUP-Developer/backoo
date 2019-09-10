import acl from 'express-acl'

acl.config({
  filename: 'accessControl.json',
  path: 'src/utils/routes',
  defaultRole: 'anonymous',
  baseUrl: '/api/v1',
  denyCallback: (res) => {
    return res.status(403).json({
      status: 'Access Denied',
      success: false,
      message: 'You are not authorized to access this resource'
    })
  }
})

// export default acl.authorize

export default (req, res, next) => {
  next()
}

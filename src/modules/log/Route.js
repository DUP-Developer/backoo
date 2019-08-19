import Express from 'express'
import Log from './LogController'
import Context from '../../utils/context'
import telegram from '../../utils/telegram';


const App = Express.Router()
telegram.start()

App.route('/:applicationName')
  .get(async (req, res) => {
    const context = new Context()

    try{
      const log = await Log.list(req.params.applicationName)
      context.data = log
      context.status.success = true
    } catch (err) {
      context.status.details = err
      context.status.success = false
    } finally {
      res.send(context)
    }
  })
  .post(async (req, res) => {
    // const context = new Context()
    telegram.send(`\n------------------------------------\n ${new Date()}\n${req.params.applicationName}:${req.body.version}\n${req.body.msg}`)
    res.send({
      ok: true
    })
  })

export default App

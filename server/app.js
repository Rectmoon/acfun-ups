const expres = require('express')
const bodyParser = require('body-parser')
const { spideAvatarAndName } = require('./spider')
const { getAllCreators, insertCreator } = require('./db')

const app = expres()

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-type')
  next()
})

app.get('/creators', async (req, res) => {
  res.send(await getAllCreators())
})

app.post('/creators', async (req, res) => {
  const { acfunUrl } = req.body
  const [name, avatar] = await spideAvatarAndName(acfunUrl)
  const result = await insertCreator(name, avatar, acfunUrl)
  res.send(result)
})

app.listen(3000, () => {
  console.log('app is runnint at http://localhost:3000')
})

const typeorm = require('typeorm')

class Creator {
  constructor(name, avatar, acfunUrl) {
    this.name = name
    this.avatar = avatar
    this.acfunUrl = acfunUrl
  }
}

const CreatorSchema = new typeorm.EntitySchema({
  name: 'Creator',
  target: Creator,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    avatar: {
      type: 'text'
    },
    acfunUrl: {
      type: 'text'
    }
  }
})

async function getConnection() {
  return await typeorm.createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '******',
    database: 'acfun_ups',
    synchronize: true,
    logging: false,
    entities: [CreatorSchema]
  })
}

async function getAllCreators() {
  const connection = await getConnection()
  const creatorRepo = connection.getRepository(Creator)
  const creators = await creatorRepo.find()
  connection.close()
  return creators
}

async function insertCreator(name, avatar, acfunUrl) {
  const connection = await getConnection()
  const creator = new Creator(name, avatar, acfunUrl)
  const creatorRepo = await connection.getRepository(Creator)
  const res = await creatorRepo.save(creator)
  const allCreators = await creatorRepo.find()
  connection.close()
  return allCreators
}

module.exports = {
  getAllCreators,
  insertCreator
}

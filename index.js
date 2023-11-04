const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasePath = path.join(__dirname, 'user.db')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.json())

let database = null

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    app.listen(3005, () =>
      console.log('Server Running at http://localhost:3001/'),
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

app.post('/', async (req, res) => {
  const {name, email, serial, phone} = req.body

  const getUserQuery = `select * from Peolpe where email='${email}' or phone='${phone}';`

  const dbUser = await database.get(getUserQuery)
  if (dbUser === undefined) {
    const postUserQuery = `insert into Peolpe values('${name}','${email}','${serial}','${phone}');`
    const dbresp = await database.run(postUserQuery)

    res.status(200)
    res.send('User created Successfully')
  } else {
    res.status(400)
    res.send('User already exits !!')
  }
})

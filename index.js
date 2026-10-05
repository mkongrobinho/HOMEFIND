import express from 'express'
import cors from 'cors'
import * as db from './queries.js'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.use((request, response) => {
  response.status(404).json({ error: 'Not found' })
})

// Error-handling Middleware
app.use((error, request, response, next) => {
  console.error('Error:', error.message)
  response.status(500).json({ error: 'Internal Server Error' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

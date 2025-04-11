const express = require('express')
const connectDB = require('./config/db.config')
const app = express()
app.use(express.json());
const taskRoutes = require('./routes/taskRoutes')

const port = process.env.PORT || 9000
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', taskRoutes)

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.get('/data', (req, res) => {
    const data = [
        {
        name: 'jhon',
        lastName: 'fernandez',
        age: 30
        },
        {
            name: 'pedro',
            lastName: 'sanchez',
            age: 30
        }
    ]

    res.json(data)
})

const PORT=3000

app.listen(PORT, () => {
    console.log('Servidor ejecutandose en el puerto', PORT)
})
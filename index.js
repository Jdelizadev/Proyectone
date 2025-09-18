require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users/:id', (req, res) => {
    const userID = req.params.id
    res.send(`Mostrar la información del usuario con id: ${userID}`)
})

app.get('/search', (req, res) => {
    const term = req.query.termino || 'No se especifico'
    const category = req.query.categoria || 'Categoria invalida'
    res.send(`
     <p>Bienvenido, termino:${term} y categoria:${category} </p>   
        `)
})

app.post('/form', (req,res) => {
    const {name = 'Anonimo', email = 'No proporcionado'} = req.body
    res.json({
        message: 'Datos recibidos',
        data: {
            name, 
            email
        }})
})

app.post('/api/data', (req, res) => {
    const data = req.body;
    if(!data || Object.keys(data).length === 0) {
        return res.status(400).json({error: 'Bad request'})
    }

    res.status(201).json({
        message: 'Datos recibidos',
        data: {
            data
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
})
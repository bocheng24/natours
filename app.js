const fs = require('fs')
const express = require('express');

const PORT = 3500;
const app = express();

const toursSimple = `${__dirname}/dev-data/data/tours-simple.json`

app.use(express.json())

const tours = JSON.parse(fs.readFileSync(toursSimple))

app.get('/api/tours', (req, res) => {
    res
        .status(200)
        .json({
            status: 'Success',
            results: tours.length,
            data: {
                tours
            }
        })
})

app.get('/api/tours/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const tour = tours.find(tr => tr.id === id)

    if (!tour) {
        return res.status(404).json({ message: 'Invalid ID' })
    }

    res
        .status(200)
        .json({
            message: 'Success',
            data: tour
        })

})

app.post('/api/tours', (req, res) => {

    const newID = tours[tours.length - 1].id + 1
    const newTour = { id: newID, ...req.body }

    tours.push(newTour)
    fs.writeFile(toursSimple, JSON.stringify(tours), err => {
        res
            .status(201)
            .json({
                message: 'Posting Success',
                data: newTour
            })
    })
})

app.patch('/api/tours/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if (id > tours.length || !id) {
        return res
            .status(404)
            .json({
                message: 'Invalid ID'
            })
    }

    res.status(200).json({
        message: 'Patching Success',
        data: 'Updated'
    })
})

app.delete('/api/tours/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if (id > tours.length || !id) {
        return res
            .status(404)
            .json({
                message: 'Invalid ID'
            })
    }

    res.status(204).json({
        message: 'Patching Success',
        data: null
    })
})

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})
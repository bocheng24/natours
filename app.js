const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const PORT = 3500;
const app = express();

const toursSimple = `${__dirname}/dev-data/data/tours-simple.json`;

app.use(express.json());
app.use(morgan('dev'));

const tours = JSON.parse(fs.readFileSync(toursSimple));

const getAllTours = (requ, res) => {
    res
        .status(200)
        .json({
            status: 'Success',
            results: tours.length,
            data: {
                tours
            }
        })
}

const getTourById = (req, res) => {
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
}

const postTour = (req, res) => {

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
}

const patchTourById = (req, res) => {
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
}

const delTourById = (req, res) => {
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
}

const getAllUsers = (req, res) => {
    return res.status(500).json({
        status: 'Internal Error',
        message: 'This route has not been defined'
    })
}

const getUserById = (req, res) => {
    return res.status(500).json({
        status: 'Internal Error',
        message: 'This route has not been defined'
    })
}

const postUser = (req, res) => {
    return res.status(500).json({
        status: 'Internal Error',
        message: 'This route has not been defined'
    })
}

const patchUserById = (req, res) => {
    return res.status(500).json({
        status: 'Internal Error',
        message: 'This route has not been defined'
    })
}

const delUserById = (req, res) => {
    return res.status(500).json({
        status: 'Internal Error',
        message: 'This route has not been defined'
    })
}

app.route('/api/tours')
    .get(getAllTours)
    .post(postTour)

app.route('/api/tours/:id')
    .get(getTourById)
    .patch(patchTourById)
    .delete(delTourById)

app.route('/api/users')
    .get(getAllUsers)
    .post(postUser)

app.route('/api/users/:id')
    .get(getUserById)
    .patch(patchUserById)
    .delete(delUserById)

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})
const express = require('express')  // Express helps to build a lean server and make the routes
const nunjucks = require('nunjucks')    // Template engine to reuse HTML between similar pages
let axios = require('axios')    // Axios helps with API connections

const server = express()

// Importing the database for the To Do List
const db = require('./database/db') 

// Enables the use of req.body
server.use(express.urlencoded({ extended: true }))

// Setting Express to use static files from the public folder
server.use(express.static('public'))

// Settings for the template engie nunjucks (njk are nunjucks files)
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false, // Permite mandar html por variavel
    noCache: true
})

// *** ROUTES ***

server.get('/', function (req, res) {
    
    // Just a simple way to simulate a server sending data
    const data_index = {   
        avatar_url: "https://avatars2.githubusercontent.com/u/62068773?s=460&u=46d1fb5d480e4c6b50312d35c6dc524267bc4d95&v=4",
        name: "Pedro Afonso",
        role: "Future Full Stack Developer",
        description: 'Web and Mobile Developer looking for a first opportunity. Right now, qualifying for a job at Kaffa Mobile, specialist in mobile solutions, mainly for the electric sector. Want to see my work? <a target="_blank" href="https://github.com/pedroafonso23">GitHub',
        links: [
            { name: "Facebook", url: "https://www.facebook.com/pedroafonso.ferraz.7/" }, 
            { name: "LinkedIn", url: "https://www.linkedin.com/in/pedroafonsoferraz/" }, 
            { name: "Instagram", url: "https://www.instagram.com/pedroafonsocfl/?hl=pt-br" }
        ]
    }

    return res.render('index', { data_index })
})

server.get('/cnpj', function (req, res) {
    return res.render('cnpj')
})

server.get('/rectangles', function (req, res) {
    return res.render('rectangles')
})

// Route to save a task on the database of the To Do List
server.post('/savetask', (req, res) => {

    const query = `INSERT INTO tasks (task) VALUES (?);`
    const values = [req.body.task]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send('Error on task register')
        }
        console.log('Task added successfully')
        console.log(this)

        return res.redirect('/todolist')
    }

    db.run(query, values, afterInsertData)
    
})

// Route to delete a task from the database of the To Do List
server.post('/deletetask', (req, res) => {

    console.log(req.body.id)

    db.run(`DELETE FROM tasks WHERE id = ?`, [req.body.id], afterInsertData)

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send('Error on task deletion')
        }
        console.log('Task deleted successfully')
        console.log(this)
        
        return res.redirect('/todolist')
    }
})

server.get('/todolist', function (req, res) {

        db.all('SELECT * FROM tasks', function(err, rows) {
            if(err) {
                return console.log(err)
            }

            const total = rows.length

            // Render the HTML page with the data from the database
            return res.render('todolist', { tasks: rows, total })
        })

    }
)

server.get('/clock', function (req, res) {

    // Using Axios to get the data from the API
    axios.get('http://worldclockapi.com/api/json/utc/now').then((response) => {

        let time = response.data
        return res.render('clock', { time })

    })
})

server.get('/oms', function (req, res) {
    return res.render('oms')
})

// To capture requisitions of erro 404 (needs to be the last route)
server.use(function (req, res) {
    res.status(404).render("not-found")
})

// Server listening to the door 5005
server.listen(5005, function () {
    console.log('Server is running')
})


// Update the Clock server with the current time
const fs = require('fs')
const fileName = './db.json'
const file = require(fileName)

axios.get('http://worldclockapi.com/api/json/utc/now').then((response) => {

    let t = response.data.currentDateTime

    file.time.currentDateTime = `${t}`

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
        if (err) return console.log(err)
    })
})
const sqlite3 = require('sqlite3').verbose()    // Sets SQLite to show information on the terminal

// Creating object that will operate the database
const db = new sqlite3.Database('./database/data-base.db')

// Creates the simple table of the To Do List, if it not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT);`)
})

// Delete data from the table
// db.run(`DELETE FROM tasks WHERE id = ?`, [9], function(err) {
//     if(err) {
//         return console.log(err)
//     }
//     console.log('Register deleted successfully')
// }) 

module.exports = db
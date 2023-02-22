const mysql = require('mysql2');
const inquirer = require('inquirer');

function view() {
    //console.log("show table of department in database");

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123' //i don't care if someone see this.
    });

    try {

        

        //checks to see if database exists
        db.query('CREATE DATABASE IF NOT EXISTS tracker_application_db');

        
        //create table for department
        db.query('USE tracker_application_db');
        const createTableDepartment = `
        CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL
        );`;
        db.query(createTableDepartment);


        //show database contents
        db.query('USE tracker_application_db');
        db.query('SELECT id, name FROM departments', (err, results) => {
            if(err) {
                console.log(err);
                return;
            }

            var show =`------------------------------\nid  name\n__  __________________________`; //what i'm using to display the database table


            //just in case the user doesn't have anything inside tracker_application_db
            if(results.length == 0) {
                console.log("Databse for departments is empty");
                return;
            }

            for(var i = 0; i<results.length; i++) {
                const id = results[i].id;
                const name = results[i].name;
                show = show + `\n${id}   ${name}`;
            }

            console.log("\n\n"); //so it looks nicer on the next line
            console.log(show);
            console.log("\n\n\n\n\n\n\n\n");
            console.log("press the up or down arrow keys to exit");
        });

    }
    catch(err)
    {
        console.log(err);
    }
    finally {
        db.end();
    }
}

function add() {
    console.log("in add function");

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123' //i don't care if someone see this.
    });

    

    const addingStatement = `
    INSERT INTO departments (id, names) VALUES ()
    `;
}

module.exports = {
    view: view,
    add: add,
    mysql: mysql
};
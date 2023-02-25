const { default: inquirer } = require('inquirer');
const { up } = require('inquirer/lib/utils/readline');
const mysql = require('mysql2');

function view() {
    //console.log("inside view function");
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123' //i don't care if someone see this.
    });
    try {
        db.query('CREATE DATABASE IF NOT EXISTS tracker_application_db');
        db.query('USE tracker_application_db');

        const createTableEmployee = `
            CREATE TABLE IF NOT EXISTS employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL,
                role_id INT,
                FOREIGN KEY (role_id) REFERENCES roles(id)
            );
        `;
        db.query(createTableEmployee);

        //to view it
        db.query('USE tracker_application_db');
        const joinStatement = `
            SELECT employees.id, employees.first_name, employees.last_name, roles.title
            FROM employees
            JOIN roles ON employees.role_id = roles.id;
        `;

        db.query(joinStatement, (err, results) => {
            //console.log(results);

            if(err) {
                console.log(err);
                return;
            }

            var show = `-----------------------------------------\nid     First Name     Last Name     Role\n__     _____ ____     ____ ____     ____`;
            if(results.length == 0) {
                console.log("Databse for employees is empty");
                return;
            }

            for(var i = 0; i<results.length; i++) {
                const id = results[i].id;
                const first_name = results[i].first_name;
                const last_name = results[i].last_name;
                const role_title = results[i].title;

                show = show + `\n${id}     ${first_name}     ${last_name}     ${role_title}`
            }

            console.log("\n\n"); //so it looks nicer on the next line
            console.log(show);
            console.log("\n\n\n\n\n\n\n\n");
            console.log("press the up or down arrow keys to exit");
        });
    }
    catch(err) {
        console.log(err)
    }
    finally {
        db.end();
    }
}

function add(first_n, last_n, role_id) {
    //console.log("inside add function");

    try {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123' //i don't care if someone see this.
        });
        db.query('USE tracker_application_db');

        const add_statment = `INSERT INTO employees (first_name, last_name, role_id)
        VALUES ('${first_n}', '${last_n}', ${role_id});`;

        db.query(add_statment, (err, results) => {
            if(err) {
                console.log(err);
            }
        });

        db.end();

        console.log(`added ${first_n} to employees`);
    }
    catch(err) {
        console.log(err);
    }
}

function update(first_n, role_id) {

    try {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123' //i don't care if someone see this.
        });

        db.query('USE tracker_application_db');

        const update_statement = `
        UPDATE employees
        SET role_id = ${role_id}
        WHERE first_name = '${first_n}';`;

        db.query(update_statement, (err, result) => {
            if(err) {
                console.log(err);
            }
        });

    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    update: update,
    view: view,
    add: add,
    mysql: mysql
};
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
        const createTableRole = `
            CREATE TABLE IF NOT EXISTS roles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(30) NOT NULL,
                salary DECIMAL NOT NULL,
                department_id INT,
                FOREIGN KEY (department_id) REFERENCES departments(id)
            );`;
        db.query(createTableRole);


        //how to view it
        db.query('USE tracker_application_db');
        const joinStatement = `
            SELECT roles.id, roles.title, roles.salary, departments.name
            FROM roles
            JOIN departments ON roles.department_id = departments.id;
        `;

        db.query(joinStatement, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            
            var show = `-----------------------------------------\nid      title      salary      department\n__      _____      _____       ____________`;

            if(results.length == 0) {
                console.log("Databse for roles is empty");
                return;
            }

            for(var i = 0; i<results.length; i++) {
                const id = results[i].id;
                const title = results[i].title;
                const salary = results[i].salary;
                const department_name = results[i].name;
                show = show + `\n${id}      ${title}      ${salary}       ${department_name}`;
            }

            console.log("\n\n"); //so it looks nicer on the next line
                console.log(show);
                console.log("\n\n\n\n\n\n\n\n");
                console.log("press the up or down arrow keys to exit");
        });
    }
    catch(err) {
        console.log(err);
    }
    finally {
        db.end();
    }
    
}

function add(name, salary, id) {
    try {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123' //i don't care if someone see this.
        });
    
        db.query('USE tracker_application_db');
    
        const add_statment = `INSERT INTO roles (title, salary, department_id) VALUES ('${name}', '${salary}', '${id}');`;
    
        db.query(add_statment, (err, result) => {
            if(err) {
                console.log(err);
            }
        });
    
        db.end();
    
        console.log(`added ${name} to roles`);
    }
    catch(err) {
        console.log(err);
    }
   
}

module.exports = {
    view: view,
    add: add,
    mysql: mysql
};
const inquirer = require('inquirer');


const view_department = require('./view_department.js');
const view_roles = require('./view_roles.js');
const view_employees = require('./view_employees.js');
//Where the options to choose from are.


const options = [
    "View All Departments", 
    "View All Roles",
    "View All Employees", 
    "Add A Department", 
    "Add A Role", 
    "Add An Employee", 
    "Update An Employee Role",
    "Quit"
];

//User prompted

console.log(`

$$$$$$$$\\                         $$\\                                               $$\\      $$\\                                                             
$$  _____|                        $$ |                                              $$$\\    $$$ |                                                            
$$ |      $$$$$$\\$$$$\\   $$$$$$\\  $$ | $$$$$$\\  $$\\   $$\\  $$$$$$\\   $$$$$$\\        $$$$\\  $$$$ | $$$$$$\\  $$$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$\\  
$$$$$\\    $$  _$$  _$$\\ $$  __$$\\ $$ |$$  __$$\\ $$ |  $$ |$$  __$$\\ $$  __$$\\       $$\\$$\\$$ $$ | \\____$$\\ $$  __$$\\  \\____$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ 
$$  __|   $$ / $$ / $$ |$$ /  $$ |$$ |$$ /  $$ |$$ |  $$ |$$$$$$$$ |$$$$$$$$ |      $$ \\$$$  $$ | $$$$$$$ |$$ |  $$ | $$$$$$$ |$$ /  $$ |$$$$$$$$ |$$ |  \\__|
$$ |      $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$   ____|$$   ____|      $$ |\\$  /$$ |$$  __$$ |$$ |  $$ |$$  __$$ |$$ |  $$ |$$   ____|$$ |      
$$$$$$$$\\ $$ | $$ | $$ |$$$$$$$  |$$ |\\$$$$$$  |\\$$$$$$$ |\\$$$$$$$\\ \\$$$$$$$\\       $$ | \\_/ $$ |\\$$$$$$$ |$$ |  $$ |\\$$$$$$$ |\\$$$$$$$ |\\$$$$$$$\\ $$ |      
\\________|\\__| \\__| \\__|$$  ____/ \\__| \\______/  \\____$$ | \\_______| \\_______|      \\__|     \\__| \\_______|\\__|  \\__| \\_______| \\____$$ | \\_______|\\__|      
                        $$ |                    $$\\   $$ |                                                                     $$\   $$ |                    
                        $$ |                    \\$$$$$$  |                                                                     \\$$$$$$  |                    
                        \\__|                     \\______/                                                                       \\______/                           

`);


async function start() {
    await inquirer.prompt([
        {
            type: 'list',
            name: 'view_add_options',
            message: 'What would you like to do?',
            choices: options
        }
    ]).then(answers => {
        //console.log(`You chose ${answers.view_add_options}`);
    
        //depending on what option they chose they will go in a certain direction.

        //"View All Departments",
        if(answers.view_add_options == options[0])
        {
            //console.log("View All Departments");
            view_department.view();
            start(); //so it can repeat it self when it is done
        }
        //"View All Roles",
        else if(answers.view_add_options == options[1])
        {
            //console.log("View All Roles");
            view_roles.view();
            start();
        }
        //"View All Employees",
        else if(answers.view_add_options == options[2])
        {
            //console.log("View All Employees");
            view_employees.view();
            start();
        }
        //"Add A Department",
        else if(answers.view_add_options == options[3])
        {
            //console.log("Add A Department");
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'department_name',
                    message: 'What is the department name'
                }
            ]).then(answers => {
                view_department.add(answers.department_name);
                start();
            });
        }
        //"Add A Role",
        else if(answers.view_add_options == options[4])
        {
            const validateNumber = (input) => {
                const num = parseFloat(input);
                if (isNaN(num)) {
                return 'Please enter a number.';
                }
                if (num < 0) {
                return 'Please enter a positive number.';
                }
                return true;
            };

            //console.log("Add A Role");
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role_name',
                    message: 'What is the role name?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary?',
                    validate: validateNumber
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'Which department does it belong to?',
                    validate: validateNumber
                    
                },

            ], { exitOnUnexpected: false }).then(answers => {
                // console.log(answers.role_name);
                // console.log(parseInt(answers.salary));
                // console.log(parseInt(answers.department_id));
                view_roles.add(answers.role_name, parseInt(answers.salary), parseInt(answers.department_id));
                start();
            });
        }
        //"Add An Employee", 
        else if(answers.view_add_options == options[5])
        {
            //console.log("Add An Employee");

            const validateNumber = (input) => {
                const num = parseFloat(input);
                if (isNaN(num)) {
                return 'Please enter a number.';
                }
                if (num < 0) {
                return 'Please enter a positive number.';
                }
                return true;
            };

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employee\'s first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employee\'s last name?'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the employee\'s role?',
                    validate: validateNumber
                }
                
            ]).then(answers => {
                view_employees.add(answers.first_name, answers.last_name, answers.role_id);
                start();
            });
            
        }
        //"Update An Employee Role"
        else if(answers.view_add_options == options[6])
        {
            // console.log("Update An Employee Role");
            const validateNumber = (input) => {
                const num = parseFloat(input);
                if (isNaN(num)) {
                return 'Please enter a number.';
                }
                if (num < 0) {
                return 'Please enter a positive number.';
                }
                return true;
            };

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_n',
                    message: 'What is the employee\'s name that you want to update?'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the role id that you want to replace to',
                    validate: validateNumber
                },

            ]).then(answers => {
                view_employees.update(answers.first_n, answers.role_id);
                start();
            })
            

            
        }
        //Quit
        else if(answers.view_add_options == options[7])
        {
            console.log("Bye");
            process.exit(0);
        }
        else {
            console.log("Error you should not be here");
        }

    });

}
process.on('exit', (code) => {
    console.log(`Process exited with code ${code}`);
  });
start();



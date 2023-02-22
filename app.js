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

function start() {
    inquirer.prompt([
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
            view_department.add();
            start();
        }
        //"Add A Role",
        else if(answers.view_add_options == options[4])
        {
            console.log("Add A Role");
            start();
        }
        //"Add An Employee", 
        else if(answers.view_add_options == options[5])
        {
            console.log("Add An Employee");
            start();
        }
        //"Update An Employee Role"
        else if(answers.view_add_options == options[6])
        {
            console.log("Update An Employee Role");
            start();
        }
        //Quit
        else if(answers.view_add_options == options[7])
        {
            console.log("Bye");
            process.exit();
        }
        else {
            console.log("Error you should not be here");
        }

    });
}

start();

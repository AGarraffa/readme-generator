
const inquirer = require('inquirer');
const fs = require('fs');


const questions = [
    {   
        type: 'input',
        name: 'name',
        message: 'What is your name?',
    },

    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address:'
    },

    {
        type: 'input',
        name: 'github',
        message: 'Please enter your github user name:'
    },
    
    {
        type: 'input',
        name: 'title',
        message: 'What is the name of your application?'
        // 1
    },
    
    {
        type: 'input',
        name: 'desc',
        message: "Please describe your application:"
    },

    {
        type: 'input',
        name: 'install',
        message: 'Please describe the install process:'
    },

    {
        type: 'input',
        name: 'usage',
        message: 'Please describe how this application is used:'
    },

    {
        type: 'input',
        name: 'credits',
        message: 'Please list anyone else who worked on this project with you (separated by a comma; press enter if no other collaborators):'
    },

    {
        type: 'input',
        name: 'dependencies',
        message: 'Please list any modules used (separated by a comma; press enter if no modules were used:'
    },

    {
        type: 'list',
        name: 'license',
        message: 'Which license would you like to use?',
        choices: ['Apache 2.0 License', 'Boost Software License 1.0', 'BSD 3-Clause License', 'CC0', 'Eclipse Public License 1.0', 'GNU GPL v3', 'ISC', 'MIT', 'Mozilla Public License 2.0', ]
    },


]

// initializes a global variable;
// I know the answers given from the ask function are given in an object  format, but I was experimenting with being able to edit the answers later on (still not solved) which is why I placed them in a global object (so the answers can be manipulated outside of the prompt)
let obj = {}

// function that asks the questions and logs the answers
function init() {

inquirer.prompt(questions).then((answers) => {

        obj = answers;

        createFile();

        // end of prompt
        });
        

// end of ask function
}


// function that writes the readme file
function createFile() {

        let badge = licenseBadge(obj.license)

        let credits = formatCredits(obj.credits)

        let dependencies = formatCredits(obj.dependencies)

        let github = ''

        if (obj.github) {
            github = `https://github.com/${obj.github}`
        }

        fs.writeFile('README.md', 
        
`# ${obj.title}
${badge}

## Table of Contents
[Description](#description)

[Installation](#installation)

[Usage](#usage)

[Screenshots](#screenshots)

[Credits](#credits)

[Dependencies](#dependencies)

[Questions](#questions)

---


## Description
${obj.desc}
                
---     
## Installation
${obj.install}
    
---
## Usage
${obj.usage}
    
---
## Credits
* ${obj.name}
${credits}

---
## Dependencies
${dependencies}

---
## Questions
${obj.email}

${github}

        
        
<sub><sub>this file was created usings Alfred Garraffa's Readme generator</sup></sub>`, (err) => err ? console.log(err) : console.log('File successfully created. Please manually add any screenshots as needed'))
}



// this function assigns the proper tag to the selected license
function licenseBadge(license) {

    let badge;


    switch (license) {
        case 'Apache 2.0 License':
            
            badge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
            break; 

        case 'Boost Software License 1.0': 

            badge = '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'
            break;

        case 'BSD 3-Clause License': 
            
            badge = '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
            break;

        case 'CC0': 
            
            badge = '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)'
            break;

        case 'Eclipse Public License 1.0': 
            
            badge = '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'
            break;

        case 'GNU GPL v3': 
            
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
            break;

        case 'ISC': 
           
            badge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'
            break;

        case 'MIT': 
            
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
            break;

        case 'Mozilla Public License 2.0': 
            
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
            break;

    }

    return badge;


}

// this function formats the people you worked with to something display ready
function formatCredits(credits) {

    // checks to make sure there is a value in credits
    if (credits != '') {

    // splits the string on commas
    let credArr = credits.split(',');
    
    // initializes a new array
    let newArr = [];

    // iterates over the new array and generates the appropriate format for the readme
    credArr.forEach((element) => {
        let newCredit = element.replace(' ', '')
        newCredit = '*' + ' ' + newCredit + ' \n'
        newArr.push(newCredit);
    });

    // joins the array in a string
    let str = newArr.join('')

    return str;

    }

    else {

        let str = ''
        return str;
    }

}


// trying to figure out how to go back and edit the answers so that you can fix any typos before writing the file. As of now it's a WIP
function edit() {

    let edit =  [{
            type: 'list',
            name: 'select',
            message: 'Would you like to make any changes?',
            choices: [ 'Looks good!', `Name: ${obj.name}`, `Title: ${obj.title}`, `Description: ${obj.desc}`, `Installation: ${obj.install}`, `Usage: ${obj.usage}`, `Credits: ${obj.credits}`, `License: ${obj.license}`]
        }]


        inquirer.prompt(edit).then((answer) => {

                console.log(answer);
                console.log('------------------');
        

                switch (answer.select) {

                    default: 
                        createFile();
                        // break;

                    case `Name: ${obj.name}`:
                        console.log('name=========================')
                        inquirer.prompt('Please enter the correct name:').then((answer) => {
                        obj.name = answer;

                        edit();
                        // break;
                        });

                    case `Title: ${obj.title}`:
                        inquirer.prompt('Question 2:').then((answer) => {
                        obj.title = answer;
                        
                        edit();
                        // break;
                        });

                    case `Description: ${obj.desc}`:
                        inquirer.prompt('Question 2:').then((answer) => {
                            obj.desc = answer;
                        
                        edit();
                        // break;
                        });

                    case `Installation: ${obj.install}`:
                        inquirer.prompt('Question 2:').then((answer) => {
                            obj.install = answer;
                        
                        edit();
                        // break;
                        });

                    case `Usage: ${obj.usage}`:
                        inquirer.prompt('Question 2:').then((answer) => {
                            obj.usage = answer;
                        
                        edit();
                        // break;
                        });
                        
                    case `Credits: ${obj.credits}`:
                        inquirer.prompt('Question 2:').then((answer) => {
                            obj.credits = answer;
                        
                        edit();
                        // break;
                        });

                    case `License: ${obj.license}`:
                        inquirer.prompt('Question 2:').then((answer) => {
                            obj.license = answer;
                        
                        edit();
                        // break;
                        });
                }
            
            // edit();
        // end of prompt
        })

    
// end of function
}




// runs the app
init()
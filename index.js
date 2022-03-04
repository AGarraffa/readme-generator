

// use the generated html from last week as the example
// prompt the user for all the answers
// when finished display the answers to verify they look right (yes or no answer)
// if no, display all the answers with a number associated with them and ask the user to select what needs fixing
// check again to make sure it looks right
// when yes, generate the readme

// install inquirer

// const questions = [{}] --- this is the object with all of the questions. include a type: 'input', name: var name, message: the actual question, and maybe a label (this might be in name as well if you can't include more for the prompt)

// const check = [{}] --- this is the array with the yes/no prompt for the answer check

// inquirer.prompt(questions).then((answers) => {
//     let { this is where you name the answers from the prmopts } = answers;

        // verify(answers)

        // fs.writeFile('README.md')
        // this will write a blank file

        // fs.appendFile('README.md', here is where you put the actual readme file. Use template literal to call the variables)


// function verify(ans)
// design a function to display all answers and show them to user. Prompt the user for a yes/no answer
// allow for y and n as suitable inputs

// function answerFix()
// this function will be within the verify function if the user enters no. this allows you to fix specific answers and resubmit them. call the verify function again at the end of this function

//--------------------------------------------------
// function list

// initial prompt for information

// log the answers to an object and create the blank readme

// verify the answers

// allow for answer change


// append the answers to the readme with proper formatting



// readme sections:
// title
// description
// table of contents (if needed)
// installation instructions (npm i inquirer)
// usage (examples of use and screenshots)
// credits/ resources
// license
// badges
// features (if needed)
// how to contribute (if needed)
// tests (write tests and provide examples on how to run them)


const inquirer = require('inquirer');
const fs = require('fs');
// const { verify } = require('crypto');

const questions = [
    {   
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        // 0 (index of this question to be used later)
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
        message: "Please describe your application and how it's used"
        // 2
    },

    {
        type: 'input',
        name: 'install',
        message: 'Please describe the install process'
        // 3
    },

    {
        type: 'input',
        name: 'usage',
        message: 'Please descaribe how this application is used'
        // 4
    },

    {
        type: 'input',
        name: 'credits',
        message: 'Please list anyone else who worked on this project with you (separated by a comma; press enter if no other collaborators)'
        // 5
    },

    {
        type: 'list',
        name: 'license',
        message: 'Which license would you like to use?',
        choices: ['Apache 2.0 License', 'Boost Software License 1.0', 'BSD 3-Clause License', 'CC0', 'Eclipse Public License 1.0', 'GNU GPL v3', 'ISC', 'MIT', 'Mozilla Public License 2.0', ]
        // 6
    },


]

// initializes a global variable;
// I know the answers given from the ask function are given in an object  format, but I was experimenting with being able to edit the answers later on (still not solved) which is why I placed them in a global object (so the answers can be manipulated outside of the prompt)
let obj = {}

// function that asks the questions and logs the answers
function init() {

inquirer.prompt(questions).then((answers) => {

        // console.log(answers)
        obj = answers;

        // end of prompt

        createFile();

        });
        

// end of ask function
}


// function that writes the readme file
function createFile() {

        let badge = licenseBadge(obj.license)

        let credits = formatCredits(obj.credits)

        fs.writeFile('README.md', 
        
`# ${obj.title}
${badge}



## Description
${obj.desc}
                
        
## Installation
${obj.install}
    

## Usage
${obj.usage}
    

## Screenshots


## Credits
* ${obj.name}
${credits}
        
        
<sub><sub>this file was created usings Alfred Garraffa's Readme generator</sup></sub>`, (err) => err ? console.log(err) : console.log('File successfully created'))
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
        console.log(newCredit);
    });

    // joins the array in a string
    let str = newArr.join('')

    return str;

    }

    else {
        return;
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




// asks the questions, then makes sure you don't want to fix anyhting, then writes the file.
init()
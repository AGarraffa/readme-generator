

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
        message: 'Please list anyone else who worked on this project with you (separated by a comma)'
        // 5
    },

    {
        type: 'list',
        name: 'license',
        message: 'Which license would you like to use?',
        choices: ['one', 'two', 'three', 'four']
        // 6
    },


]

// for now ignore this
const  verifyQuestions = [
        {
                type: 'list',
                name: 'check',
                message: 'Does this look correct?',
                choices: ['Yes', 'No']
        },

]



function ask() {

inquirer.prompt(questions).then((answers) => {


        let { name, title, desc, install, usage, credits, license } = answers;


        let edit =  {
                type: 'list',
                name: 'select',
                message: 'Which question do you need to edit?',
                choices: [ `Name: ${name}`, `Title: ${title}`, `Description: ${desc}`, `Installation: ${install}`, `Usage: ${usage}`, `Credits: ${credits}`, `License: ${license}`]
        }
        

        // this adds the edit list to the verifyQuestions (and overwrites if it has one previously)
        // if (verifyQuestions.length == 1) {


        //         console.log(`verifyQuestions is ${verifyQuestions.length} long`);
        //         console.log('--------------------------------')
        //         verifyQuestions.push(edit);

        // }

        // else  {

        //         console.log(`verifyQuestions: ${verifyQuestions}`);
        //         verifyQuestions.pop();
        //         console.log('--------------------------------')
        //         console.log(`verifyQuestions: ${verifyQuestions}`);
        //         console.log('--------------------------------')
        //         verifyQuestions.push(edit);
        //         console.log(`verifyQuestions: ${verifyQuestions}`);
        //         console.log('--------------------------------')


        // }



        fs.writeFile('README.md', `# ${title}

## Description
${desc}
        

## Installation
${install}

## Usage
${usage}

## Credits
${name}, ${credits}

## License
${license}


### this file was created usings Alfred Garraffa's Readme generator`, (err) => err ? console.log(err) : console.log('File successfully created'))
        
        // end of prompt
        });
        

// end of ask function
}

ask();
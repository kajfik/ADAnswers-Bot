# Commands

## Welcome
Adding a command is as easy as 1, 2, 3! Overall it should be pretty simple when using other commands as examples. Please be sure to be thourough in your creation of a command, and be sure to follow all guidelines found in the other readme.

## Preliminary information
Navigate to antitables.js as I think this is the simplest command to get a good idea of what's going on. There you can see a whole host of useful information!

## Creating a command
### Step 1
Create yourself a file! You will need to name it something useful, not like `ass.js` or something like that.

### Step 1.5
Please make sure you have ESLint enabled. As soon as you start typing if you don't get an error, you do not have it enabled. It should automatically take the .eslintrc.json and .editorconfig files to conform to the style guidelines of this code

### Step 2
If you intend on using `functions` in your command, add `const functions = require("../utils/functions/functions");` to it. This is very important!
Note: (Most) IDEs will automatically import it when you type `functions.`, same with the `Command` class when typing `new Command({})`.

### Step 3
Take a look at antitables.js again. You will see there is a line `module.exports = {}`. This is what the code in bot.js will see, so this is very important! Your code should eventually end up like this. Follow the comments! If you're looking to use a command that has args, antitables.js is a good way to go, if not, something maybe like 5hours.js or 161or162.js is a good starting point. Command one here does not use args, while command 2 does. I would appreciate consistency in all of the commands, as it makes it easy to debug.

Command 1. Does not use args.
```js
"use strict";
const { Command } = require("../Classes/Command.js");

module.exports = {
  command: new Command({
    number: Number, // This is the number you came up with in step 2of the main readme 
    name: "nameOfCommand", // Name. Used to trigger the command
    description: "I eat ass", // Description that shows in the help page
    check: "botCommands", // see the getCheck method on the Command class. Basically just references the check there.
    acceptableArgs: undefined, // Since we're doing a command without args, no args will be accepted.
    sent: ["Message that is sent by triggering this command."] // This is an array with one entry always. Is the message that is actually sent.
  })
}
```

Command 2. Uses args.
```js
"use strict"
const { Command } = require("../Classes/Command.js");

// Contains all the messages that will be retreived when using an arg.
const assMessageObject = {
  "ass": "I eat ass",
  "chicken": "guess what",
  "giraffe": "long neck"
}

module.exports = {
  command: new Command({
    number: Number, // This is the number you came up with in step 2of the main readme 
    name: "nameOfCommand", // Name. Used to trigger the command
    description: "I eat ass", // Description that shows in the help page
    check: "botCommands", // see the getCheck method on the Command class. Basically just references the check there.
    acceptableArgs: Object.keys(assMessageObject), // This method returns an array with the names of each of the args grabbed.
    sent: undefined, // Since we won't be sending a default message (if you want to do that, use the NewsCommand class), we don't need the sent property.
    getArgMessage(arg) {
      // Since we are using an arg we do need a seperate method to get it.
      // This will check whether or not this arg is acceptable and then will retreive it from the object.
      if (this.acceptableArgs.includes(arg)) return assMessageObject[arg];
      return `Unknown arg in command nameOfCommand`
    }
  })
}
```

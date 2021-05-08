# Commands

## Welcome
Adding a command is as easy as 1, 2, 3! Overall it should be pretty simple when using other commands as examples. Please be sure to be thourough in your creation of a command, and be sure to follow all guidelines found in the other readme.

## Preliminary information
Navigate to meta.js as I think this is the simplest command to get a good idea of what's going on. There you can see a `functions.botCommandsCheck()` being used, a switch statement using args, and some other useful information!

## Creating a command
### Step 1
Create yourself a file! You will need to name it something useful, not like `ass.js` or something like that.

### Step 1.5
Please make sure you have ESLint enabled. As soon as you start typing if you don't get an error, you do not have it enabled. It should automatically take the .eslintrc.json and .editorconfig files to conform to the style guidelines of this code

### Step 2
If you intend on using `functions` in your command, add `const functions = require("../functions");` to it. This is very important!

### Step 3
Take a look at meta.js again. You will see there is a line `module.exports = {}`. This is what the code in bot.js will see, so this is very important! Your code should eventually end up like this. Follow the comments!
```js
const functions = require("../functions");

module.exports = {
  number: whateverNumberItsOnItsInBotJSPleaseSaveMe, // This has to be a number, not a string. This is the page the command will appear on hopefully assuming you do things right
  name: "nameOfCommand", // Make sure it's a string
  description: "I eat ass", // Make sure it's a string, this is what's used in the ++help command.

  // On this line, the parameters are message, args, and id. You may not need all of these. I am creating this as an example command to see the usage of all three of these. See something like pins.js for a super simple command that only uses message
  execute(message, args, id) {
    // For bot commands check, you will need to pass in both of these. If you're doing a simple command, like pins, change id to message.channel.id
    if (functions.botCommandsCheck(id, message)) {
      switch (args[0]) {
        case 1:
          message.channel.send(`The arg was ${args[0]}`);
          break;
        case "ass":
          message.channel.send(`I eat ass too!`);
          break;
        default: 
          message.channel.send("Unknown arg!");
          break;
      }
    } else {
      message.channel.send("This command only works in bot commands!");
    }
  }
}
```

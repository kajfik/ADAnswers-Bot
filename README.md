# ADAnswers-Bot
## Welcome
Hello! Welcome to the ADAnswersBot codebase. You may have noticed that the code is terrible. This is fine, because the bot works. However, here are some guidelines for contributing and how to contribute.

## Issues
The issues tab is my best friend for keeping track of what to do for each bot version. If you have anything you want to see but don't want to code it yourself, make an issue for it!

## How to contribute
### Step 1
Navigate to the /commands folder. In this folder, you can find all commands. 
### Step 2
Using your IDE search a whole directory function, look for `number:` followed by a number. If all numbers have 10, you will need to navigate to bot.js
### Step 2.5 (required if you need a new embedObject)
Find where all of the other embedObjects are defined. Copy and paste a new one, and name it the next page. Create a new fieldVar at the top with the other ones, add it to fieldsArray. Go to the `client.commands.forEach` line and add a new else if block.
```js
client.commands.forEach(element => {
  if (element.number === 1) fieldsVar.push({ name: element.name, value: element.description });
  else if (element.number === 2) fieldsVar2.push({ name: element.name, value: element.description });
  else if (element.number === 3) fieldsVar3.push({ name: element.name, value: element.description });
  else if (element.number === 4) fieldsVar4.push({ name: element.name, value: element.description });
  else if (element.number === 5) fieldsVar5.push({ name: element.name, value: element.description });
  else if (element.number === yourNumberHere) fieldsVarNumber.push({ name: element.name, value: element.description });
  else if (element.number === 69) fieldsVar69.push({ name: element.name, value: element.description });
  else console.log(element);
});
```
Once you've done that, navigate to client.on, and find the `if (command === "help")` line. Add a new case to the switch statement with your number. Use the other ones as examples!

### Step 3
Navigate back to /commands, and create a new file! I recommend checking out something like meta.js to see how args work in action. Args are passed as an array in, so be wary of that.

### Step 4
Run the code! You will need to have node.js installed and using a local copy of this code to test things out, as well as the dependencies. 

### Step 5
Create a PR. I will take a look and see if it's something that should be added. Thanks for contributing!

## Guidelines
When contributing, be sure to be serious with your suggestion. This is a real, live, bot being used in a server with thousands of people!

### Code quality
Install an ESLint extension to be able to conform to style guidelines.

## Other important information
### IDE and other important things for it
I recommend using Visual Studio Code as your IDE.

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint):
 ESLint will take the two ESLint files in this repo and use them as the settings. Install it globally; it will improve any JS you do, as long as you have the ESLint files for it.

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens):
 I only recommend having GitLens to see who worked in what files when. It is updated on commit.
### GitHub Desktop
I recommend using [GitHub Desktop](https://desktop.github.com/) when contributing. It is (generally) easier to make new branches/commits/PRs and whatnot.

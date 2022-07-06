# ADAnswersBot Commands
Welcome to the ADAnswersBot repository! This readme is intended to explain how to add a simple command or change a command's content.

## Basics
ADAnswersBot commands are all created through a basic TypeScript interface called `Command`. This sets up every command and is not meant to be edited by contributors, as it may have unintended side effects. This acts as boilerplate in order to make command creation simple and streamlined.

We will be using the `/1minuteinf` command as an example in this guide.

## To begin
Luckily with ADAnswersBot, the majority of stuff that you will want to do will not be very coder-like. In fact, a major portion of things will be copy-paste if you're lazy. In this guide, however, we will explore what actually is happening with each step.

Let's start with identifying the kind of command you want. The following is based on a now deprecated command called `/helpnumbers`, which explained what was on each page of help. Identify what stage of the game your command is, then that will be your *folder number* in the /commands directory.
```
Page 1 covers until break infinity
Page 2 rest of infinity era + achievements and swipe trick
Page 3 is eternity, pre ECs
Page 4 is ECs + Dilation
Pages 5, 6, 7, 8 is some more common game info stuff and/or bot functions
```

`/1minuteinf` is 1, as this is a pre-break era command. For your command this may be different, but we will continue to use `/1minuteinf` as our example.

## Creating the command
Create a file in the directory that your command belongs in. Two imports will always be necessary, but if you're a little more code-savvy and wish to use something that requires imports feel free.

```ts
import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc"; // This one is an extra which I will explain later
```

At the top of every command file belonds these two lines. The first imports what we'll use as types, but they contain useful information that you'll be able to see when typing out stuff. The second imports the aforementioned `Command` interface that forms the basis of every command. 

The third is trickier. It imports a function from a file called `Misc.ts` and checks to see if the user is a helper or not. This is useful because it determines if the message will be shown or not when used. It is not necessary, but is good for commands that might be used to help folks.

To create a command, you'll want to create a new variable that will be exported from this file for use in another file which we will get to later. In `/1minuteinf`'s case, it's created like this:

```ts
// TypeScript does not let you start the variable name with a number, so you'll have to expand it if you have a number.
export const oneminuteinf: Command = { ... }
```

In this, we are `export`ing a `const`ant named `oneminuteinf`, with interface `Command`, which equals a bunch of other stuff we'll get to very soon. 

This name does not affect the actual name of your command that faces the user, so you *can* technically name it whatever, but useful names are useful.

Let's give our command a name and a description. We do this by putting properties inside our variable object.

```ts
export const oneminuteinf: Command = {
  name: "1minuteinf", // This is what shows to people when attempting to use the slash command
  description: "explains the UI change at infinity in under a minute", // Shown to people in /help
  type: "CHAT_INPUT", // do not change, is essential for creating the command on my end,
  run: async(interaction: BaseCommandInteraction) { // What runs the command. In here is where we can change the content of the message sent when using the command.
    if (!interaction) return; // stops it from running if the interaction is undefined (happens sometimes on spotty wifi)

    const content: string = `...`; // Content of the message

    await interaction.reply({ content, ephemeral: !isHelper(interaction) }); // how the message is sent
  }
};
```

This, along with the imports from earlier, is the entirety of your command file. Congrats!

## Importing the command for deployment
Head to `commands.ts` (plural!). There, you will see a giant list of imports where each of the commands are being imported. These are sorted by *page*, and **alphabetically** within those pages. Be mindful of this convention! To import yours, in a decent code editor it should pop up as an option to import it once you start typing it. But here's how to do it manually:

1. Find the page your command will sit in.
2. Start typing out `import { yourCommandVARIABLEnameHere } from "./commands/your page number/commandname"`. Variable name is used for this purpose and this purpose nearly only. Make sure it is nearly or completely identical to your command name. Remember, if you get confused, refer to the multitude of imports around you!
3. Next, head to the `export const Commands` line.
4. Each line within this array represents a page. These, too, are sorted alphabetically, so be sure to put yours in the right spot. Make sure to add a comma after typing yours (your code editor should throw an error if you don't!).
5. You're done! Send in a pull request on GitHub and earth will get to it whenever possible.

## Other questions
If you have any other questions as far as creating your own command for ADAB, please contact earth on discord @earth#1337.
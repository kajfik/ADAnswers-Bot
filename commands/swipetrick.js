/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 2,
  name: "swipetrick",
  description: "Explains swipe trick for mobile",
  execute(message) {
    message.channel.send(`This trick can be performed on mobile to activate bottom buttons without holding them down.
Make sure swipe navigation is enabled in settings. Now "swipe the button to a different tab". If you set your bottom buttons to \`MIDDLE\` it will be easier to swipe to the left and right.
This trick works with every bottom button. (You can enable more bottom buttons by setting bottom buttons to \`all\`.)

Here is a video:
https://discord.com/channels/351476683016241162/387798607706718208/843421559413800981`);
  }
};

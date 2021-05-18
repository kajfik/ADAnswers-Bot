/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 6,
  name: "importexport",
  description: "How to import/export saves",
  execute(message) {
    message.channel.send(`android -> web:
Click "Export to web", open <https://paste.ee/>, submit new paste, open the paste link on pc, copy the save, press "Import" in the web version. 

web -> android:
Press "Export", open <https://paste.ee/>, submit new paste, open the paste link on your device, copy the save, press "Import" in the app. 

(alternatively you can use google docs instead of paste.ee)

When you use the "Export to web" option and send the save to your pc using some messaging service like messenger/whatsapp the save may be cut in half because of a character limit of those services.`);
  }
};

"use strict";

const { MessageEmbed } = require("discord.js");

const footerText = () => (Math.random() > 0.5 ? `Be sure to read the pins in your progression channel!` : `Achievement art by Omsi`);

const SecretAchievement = achievementInfo => new MessageEmbed()
  .setTitle(`Secret Achievement S${achievementInfo.id} ("${achievementInfo.name}")`)
  .setColor("#43a047")
  .addFields(
    { name: "Description", value: `||${achievementInfo.description}||` },
    { name: "Unlocked by", value: `${achievementInfo.unlock}` },
  )
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const secretAchievements = {
  "11": {
    id: 11,
    name: "The first one's always free",
    description: "Click on this Achievement.",
    unlock: "Click on this Achievement."
  },
};

module.exports = { SecretAchievement, secretAchievements };
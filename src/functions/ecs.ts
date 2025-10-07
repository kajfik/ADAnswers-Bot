import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { EC, ECsAtTTInfo } from "../utils/types";
import { ECDescriptions, ECRewards, EternityChallenges, findEC, order, orderAsECs } from "../utils/databases/eternitychallenges";
import { Colour } from "../utils/colours";
import { footerText } from "./Misc";

function findCompletionsAtIndex(indexOfCompletion: number): string {
  const completions = Array(12);

  for (let i = 0; i < indexOfCompletion; i++) {
    const previous = order[i].split("x").map(Number);
    const previousId = previous[0] - 1;
    const previousCompletion = previous[1];

    completions[previousId] = previousCompletion;
  }

  return completions.filter(Number).map((value, index) => `${index + 1}x${value}`).join(", ");
}

export function otherCompletions(id: number, completion: number): string {
  if (id < 1 || id > 12) {
    return `Invalid challenge id: ${id}`;
  }

  if (completion < 1 || completion > 5) {
    return `Invalid challenge completion: ${completion}`;
  }

  const completionText = `${id}x${completion}`;
  const indexOfCompletion = order.indexOf(completionText);

  if (indexOfCompletion === -1) {
    return `Challenge ${completionText} completion not found.`;
  }

  if (indexOfCompletion === 0) {
    return `No other challenge completions required.`;
  }

  return findCompletionsAtIndex(indexOfCompletion);
}

// Function rewritten by Mirai
export function ecsAtTTAmount(tt: number): ECsAtTTInfo | string {
  if (tt >= 12350) return "All ECs completed!";

  let completions = Array(12);
  const nextECs = [];
  let i: number = 0;
  let ec: EC = orderAsECs[0];

  while (ec.tt <= tt) {
    completions[ec.challenge - 1] = ec.completion;
    ec = orderAsECs[++i];
  }

  const nextChallengeTT = ec.tt;

  // Hacky, but it works
  while (i <= 59 && ec.tt === nextChallengeTT) {
    nextECs.push(`${ec.challenge}x${ec.completion}`);
    ec = orderAsECs[++i];
  }

  completions = completions.filter(Number);
  if (completions.length > 0) {
    for (let j = 0; j < completions.length; j++) {
      completions[j] = `${j + 1}x${completions[j]}`;
    }
  }

  const nextEC = ec;

  return {
    completions: tt < 130 ? "No ECs completed yet!" : completions.join(", "),
    nextECs,
    nextEC,
    nextChallengeTT
  };
}

export const eternityChallengeEmbedBuilder = (challengeInfo: EC, requestedFields?: string): EmbedBuilder => new EmbedBuilder()
  .setTitle(`Eternity Challenge ${challengeInfo.challenge}x${challengeInfo.completion}`)
  .setColor(Colour.eternity)
  .addFields(shownFields(challengeInfo, requestedFields))
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

function ecRequirements(ec: EC) {
  if (ec.challenge === 11 || ec.challenge === 12) return `${ec.unlock.amount} and 1 Time Theorem`;
  return `${ec.unlock.amount} ${ec.unlock.currency} and ${ec.unlock.tt} Time Theorems`;
}

export const shownFields = (challengeInfo: EC, requestedFields?: string) => {
  const fullEC: string = `${challengeInfo.challenge}x${challengeInfo.completion}`;
  switch (requestedFields) {
    case "unlock": return [{ name: "Unlock requirements", value: `${ecRequirements(challengeInfo)}` }];
    case "challenge": return [{ name: "Challenge", value: `${ECDescriptions[challengeInfo.challenge]}` }];
    case "goal": return [{ name: "Goal", value: `${challengeInfo.ip} Infinity Points ${challengeInfo.completionReqs === undefined ? `` : `in ${challengeInfo.completionReqs}.`}` }];
    case "strategy": return [{ name: "Strategy", value: `${challengeInfo.tt} TT recommended
    Other completions: ${otherCompletions(challengeInfo.challenge, challengeInfo.completion)} 
    ${challengeInfo.note === null ? `` : `\n    Note: \`${challengeInfo.note}\``}` }];
    case "tree": return [{ name: "Tree", value: `${challengeInfo.tree}!` }];
    case "reward": return [{ name: "Reward", value: `${ECRewards[challengeInfo.challenge].reward}` }, { name: "Reward formula", value: `${ECRewards[challengeInfo.challenge].formula}` }];
    default: {
      const nextEC = fullEC === "12x5" ? "none" : order[order.indexOf(fullEC) + 1].split("x");
      const fields = [
        { name: "Unlock requirements", value: `${ecRequirements(challengeInfo)}` },
        { name: "Challenge", value: `${ECDescriptions[challengeInfo.challenge]}` },
        { name: "Goal", value: `${challengeInfo.ip} Infinity Points ${challengeInfo.completionReqs === undefined ? `` : `in ${challengeInfo.completionReqs}.`}` },
        { name: "Strategy", value: `${challengeInfo.tt} TT recommended
    Other completions: ${otherCompletions(challengeInfo.challenge, challengeInfo.completion)} 
    ${challengeInfo.note === null ? `` : `\n    Note: \`${challengeInfo.note}\``}` },
        { name: "Tree", value: `${challengeInfo.tree}!` },
        { name: "Reward", value: `${ECRewards[challengeInfo.challenge].reward}` },
        { name: "Reward formula", value: `${ECRewards[challengeInfo.challenge].formula}` },
        { name: "Next EC", value: `${fullEC === "12x5" ? "You have no more ECs left to complete!"
          : `${order[order.indexOf(fullEC) + 1]} (${findEC(Number(nextEC[0]), Number(nextEC[1])).tt} TT)`}` }
      ];
      return fields;
    }
  }
};

interface ECEmbeds {
  [key: string]: EmbedBuilder
}

export const EternityChallengeEmbeds: ECEmbeds = {};
export const EternityChallengeImages: AttachmentBuilder[] = [];

for (const challenge in EternityChallenges) {
  const chal = EternityChallenges[challenge].challenge;
  EternityChallengeImages[chal] = new AttachmentBuilder(`src/images/challenges/EC${chal}.png`);
}

for (const challenge in EternityChallenges) {
  const chal = EternityChallenges[challenge];
  EternityChallengeEmbeds[`${chal.challenge}x${chal.completion}`] = eternityChallengeEmbedBuilder(chal).setThumbnail(`attachment://EC${chal.challenge}.png`);
}
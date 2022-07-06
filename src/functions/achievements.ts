import { AchievementInfo } from "../utils/types";
import { achievements } from "../utils/databases/achievements";

export function findAchievementByName(name: String): AchievementInfo | String {
  for (const ach in achievements) {
    if (achievements[ach].fullName === name) {
      return achievements[ach];
    }
  }

  return "Unknown achievement in findAchievementByName";
}

export function findAchievementByID(id: Number): AchievementInfo | String {
  for (const ach in achievements) {
    if (achievements[ach].id === id) {
      return achievements[ach];
    }
  }

  return "Unknown achievement in findAchievementByID";
}
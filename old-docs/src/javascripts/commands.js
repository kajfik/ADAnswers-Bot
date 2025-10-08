/* eslint-disable max-len */
export default {
  "1minuteinf": {
    name: "1minuteinf",
    description: "explains the UI change at infinity in under a minute",
    usage: "/1minuteinf",
    aliases: [],
    examples: [],
    parameters: [],
  },
  "breakinfinity": {
    name: "breakinfinity",
    description: "describes break infinity and gives an order to get break infinity upgrades",
    usage: "/breakinfinity",
    aliases: [],
    examples: [],
    parameters: [],
  },
  "bulkbuy": {
    name: "bulkbuy",
    description: "describes bulk buy and how it works",
    usage: "/bulkbuy",
    aliases: [],
    examples: [],
    parameters: [],
  },
  "c9": {
    name: "c9",
    description: "shorthand for /challenge c9",
    usage: "/c9 [target?]",
    aliases: [],
    examples: [],
    parameters: [
      {
        name: "target",
        description: "a specific user you wish to show the information to",
        required: false,
      }
    ],
  },
  "columns": {
    name: "columns",
    description: "sends an image with the columns of infinity upgrades (mobile) as compared to the web columns",
    usage: "/columns",
    aliases: [],
    examples: [],
    parameters: [],
  },
  "dimboostorgalaxy": {
    name: "dimboostorgalaxy",
    description: "tells you if you should do a dimboost or galaxy",
    usage: "/dimboostorgalaxy",
    aliases: [],
    examples: [],
    parameters: [],
  },
  "earlyinfinity": {
    name: "earlyinfinity",
    description: "Describes how to progress pre-2x better Galaxies",
    usage: "/earlyinfinity",
    aliases: [],
    examples: [],
    parameters: [],
  },
  "galaxyboost": {
    name: "galaxyboost",
    description: "compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy",
    usage: `/galaxyboost`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "grindingforbreak": {
    name: "grindingforbreak",
    description: "Describes how to reach Break Infinity.",
    usage: `/grindingforbreak`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "infinity": {
    name: "infinity",
    description: "tells how much AM you need for infinity",
    usage: `/infinity`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "iugo": {
    name: "iugo",
    description: "pre break infinity upgrade order routes",
    usage: `/iugo`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "sacrifice": {
    name: "sacrifice",
    description: "describes sacrifice and when to",
    usage: `/sacrifice`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "swipetrick": {
    name: "swipetrick",
    description: "Explains swipe trick for mobile",
    usage: `/swipetrick`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "bugo": {
    name: "bugo",
    description: "sends that screenshot of the break infinity upgrade order spreadsheet",
    usage: `/bugo`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "ic4": {
    name: "ic4",
    description: "shorthand for /challenge ic4",
    usage: `/ic4 [target?]`,
    aliases: [],
    examples: [],
    parameters: [
      {
        name: "target",
        description: "a specific user you wish to show the information to",
        required: false,
      }
    ],
  },
  "ic5": {
    name: "ic5",
    description: "shorthand for /challenge ic5",
    usage: `/ic5 [target?]`,
    aliases: [],
    examples: [],
    parameters: [
      {
        name: "target",
        description: "a specific user you wish to show the information to",
        required: false,
      }
    ],
  },
  "infinitydimensions": {
    name: "infinitydimensions",
    description: "Describes what infinity dimensions (and infinity power) does. Includes when they unlock.",
    usage: `/infinitydimensions`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "peakipmin": {
    name: "peakipmin",
    description: "Tells why peak IP/min disappears at 5e11 IP",
    usage: `/peakipmin`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "replicanti": {
    name: "replicanti",
    description: "Tells what replicanti do (as well as the upgrades)",
    usage: `/replicanti`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "setcrunchauto": {
    name: "setcrunchauto",
    description: "Describes how to set your crunch autobuyer.",
    usage: `/setcrunchauto`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "161or162": {
    name: "161or162",
    description: "Explains whether to chose TS161 or TS162",
    usage: `/161or162`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "earlyeternityprogression": {
    name: "earlyeternityprogression",
    description: "describes getting through the first few eternities",
    usage: `/earlyeternityprogression`,
    aliases: ["/eep"],
    examples: [],
    parameters: [],
  },
  "eep": {
    name: "eep",
    description: "shorthand for /earlyeternityprogression",
    usage: `/eep`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "ep": {
    name: "ep",
    description: "calculates the amount of IP required to get the number of EP specified (2 < x < 1000)",
    usage: `/ep [ep]`,
    aliases: [],
    examples: [{
      example: "/ep 5",
      returns: "Before any multipliers, to get 5 EP, you need e524 IP."
    }],
    parameters: [{
      name: "ep",
      description: "The number of eternity points requested to be calculated into IP.",
      required: true
    }],
  },
  "eternitygrinding": {
    name: "eternitygrinding",
    description: "describes how to eternity grind",
    usage: `/eternitygrinding [when]`,
    aliases: [],
    examples: [{
      example: "/eternitygrinding early",
      returns: `TS: ID/Active \`11,22,32,42,51,61,72,82,92,102\`
      - Autobuyers: Eternity at 0 EP, Galaxy at 0 or 0.1s, Dimboost off or at 0.3s, Crunch at 1e20x or 1e41x or 1e54x times highest IP (in later stages you can do 1e284x)
      - Make sure your Eternity Upgrade based on IC times is capped at 6.38e14x (do ICs with Dimboost/Galaxy autobuyers disabled while holding M+C)
      - hold M/Max
      - on mobile you can hold "Max all" in the Infinity Dimensions tab
      - on pc set update rate to 33ms`
    }],
    parameters: [{
      name: "when",
      description: "When are you in the game?",
      required: true,
      choices: [
        {
          name: "early",
          description: "For pre-EC1 farming."
        },
        {
          name: "late",
          description: "For TS193 farming. (This might be outdated -- I would generally stick with the strategy from early)"
        }
      ]
    }],
  },
  "firstsplit": {
    name: "firstsplit",
    description: "Describes how to progress on the time study tree pre-TS171",
    usage: `/firstsplit`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "infinitygrinding": {
    name: "infinitygrinding",
    description: "Sends how to grind infinities for requested time period. Early = EC4, late = banked",
    usage: `/infinitygrinding [when]`,
    aliases: [],
    examples: [{
      example: "/infinitygrinding early",
      returns: `Crunch autobuyer on 5.1 seconds (because of the reward from r87 (and for help with attaining this achievement, use /achievements other:87)), and make sure you have TS32 for the extra multiplier based on DimBoosts`
    }],
    parameters: [{
      name: "when",
      description: "When are you in the game? Generally, \"early\" is for EC4, and \"late\" is for banked, but \"early\"'s advice still holds up later on in the game.",
      required: true,
      choices: [
        {
          name: "2million",
          description: "for reaching 2 million infinities for the achievement."
        },
        {
          name: "early",
          description: "For EC4 unlock farming"
        },
        {
          name: "late",
          description: "For banked infinities. (This might be outdated -- I would generally stick with the strategy from early)"
        }
      ]
    }],
  },
  "respec": {
    name: "respec",
    description: "Describes what respec studies does",
    usage: `/respec`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "secondsplit": {
    name: "secondsplit",
    description: "describes second split paths",
    usage: `/secondsplit`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "study": {
    name: "study",
    description: "Returns information about the study, such as its effect, cost, prerequisites (if any), or effect formula (and graph, if applicable)",
    usage: `/study [study]`,
    aliases: [],
    examples: [
      {
        example: "/study 111",
        returns: "https://i.imgur.com/MSa7gyK.png",
        image: true,
      },
      {
        example: "/study 21",
        returns: "https://i.imgur.com/H3drCDs.png",
        image: true,
      }
    ],
    parameters: [{
      name: "study",
      description: "The study you want to get information about using the study ID",
      required: true,
    }],
  },
  "studytree": {
    name: "studytree",
    description: "Generates a Time Study tree based on your total Time Theorems.",
    usage: `/studytree [theorems] [path?]`,
    aliases: ["/ts"],
    examples: [
      {
        example: "/ts 111 active",
        returns: "11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,162,21|0"
      },
      {
        example: "/ts 12374",
        returns: "11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,211,222,212,224,232,192,201,72,82,92,102,193,214,228,234,213,226|0"
      }
    ],
    parameters: [
      {
        name: "theorems",
        description: "the number of TOTAL time theorems you have",
        required: true,
      },
      {
        name: "path",
        description: "The pace path (second split) you want to use; only has effect 54 < x < 123 where x is TT",
        required: false,
        choices: [
          {
            name: "active",
            description: "The active path (TS121, 131, 141)",
          },
          {
            name: "passive",
            description: "The passive path (TS122, 132, 142)",
          },
          {
            name: "idle",
            description: "The idle path (TS123, 133, 143)",
          }
        ]
      }
    ],
  },
  "ts": {
    name: "ts",
    description: "Generates a Time Study tree based on your total Time Theorems.",
    usage: `/ts [theorems] [path?]`,
    aliases: [],
    examples: [
      {
        example: "/ts 111 active",
        returns: "11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,162,21|0"
      },
      {
        example: "/ts 12374",
        returns: "11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,211,222,212,224,232,192,201,72,82,92,102,193,214,228,234,213,226|0"
      }
    ],
    parameters: [
      {
        name: "theorems",
        description: "the number of TOTAL time theorems you have",
        required: true,
      },
      {
        name: "path",
        description: "The pace path (second split) you want to use; only has effect 54 < x < 123 where x is TT",
        required: false,
        choices: [
          {
            name: "active",
            description: "The active path (TS121, 131, 141)",
          },
          {
            name: "passive",
            description: "The passive path (TS122, 132, 142)",
          },
          {
            name: "idle",
            description: "The idle path (TS123, 133, 143)",
          }
        ]
      }
    ],
  },
  "bankedinfinities": {
    name: "bankedinfinities",
    description: "describes banked infinities, what they do, and how to get them.",
    usage: `/bankedinfinities`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "changeectree": {
    name: "changeectree",
    description: "Describes how to change your tree for doing an EC",
    usage: `/changeectree`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "dilation": {
    name: "dilation",
    description: "describes dilation",
    usage: `/dilation`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "dilationgrind": {
    name: "dilationgrind",
    description: "sends a message pertaining to reaching dilation",
    usage: `/dilationgrind`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "dilationtrees": {
    name: "dilationtrees",
    description: "Args: `first`, `after3paths`. First = before dilation 3 paths upgrade, after3paths = beyond",
    usage: `/dilationtrees [when]`,
    aliases: [],
    examples: [{
      example: "/dilationtrees after3paths",
      returns: "11,21,22,31,32,33,41,42,51,61,62,72,71,73,82,81,83,92,91,93,102,103,101,111,121,131,141,151,161,162,171,181,192,191,193,212,211,213,214,222,223,232,225,233,228|0"
    }],
    parameters: [{
      name: "when",
      description: "When in dilation are you? First = before dilation 3 paths upgrade, after3paths = beyond",
      required: true,
      choices: [
        {
          name: "first",
          description: "Before dilation 3 paths upgrade",
        },
        {
          name: "after3paths",
          description: "After dilation 3 paths upgrade",
        }
      ]
    }],
  },
  "ec": {
    name: "ec",
    description: "returns information about requested EC. follow onscreen prompts",
    usage: `/ec [challenge] [completion] [hide?] [info?] [target?]`,
    aliases: [],
    examples: [
      {
        example: "/ec 3 4",
        returns: "https://i.imgur.com/wEnTe3O.png",
        image: true,
      },
      {
        example: "/ec 8 1 true goal",
        returns: "https://i.imgur.com/GgbvuWX.png",
        image: true
      }
    ],
    parameters: [
      {
        name: "challenge",
        description: "the challenge you want to do",
        required: true,
      },
      {
        name: "completion",
        description: "the completion you want to do",
        required: true,
      },
      {
        name: "hide",
        description: "ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Hides the entire command usage from the chat",
        required: false,
      },
      {
        name: "info",
        description: "What information about the challenge do you want to see?",
        required: false,
        choices: [
          {
            name: "unlock",
            description: "displays the unlock requirements for the challenge",
          },
          {
            name: "challenge",
            description: "displays the challenge description",
          },
          {
            name: "goal",
            description: "displays the goal of the challenge",
          },
          {
            name: "strategy",
            description: "displays the strategy of the challenge (total TT, other completions)",
          },
          {
            name: "tree",
            description: "displays the tree of the challenge",
          },
          {
            name: "reward",
            description: "displays the reward of the challenge",
          }
        ]
      },
      {
        name: "target",
        description: "a specific user you wish to show the information to",
        required: false,
      }
    ],
  },
  "eco": {
    name: "eco",
    description: "Args: highest eternity challenge you've down in the order (optional). Returns the EC order.",
    usage: `/eco ([challenge] [completion])?`,
    aliases: [],
    examples: [
      {
        example: "/eco 4 1",
        returns: `Order: 3x1, 4x1, 5x1, 1x3, 3x2, 2x2, 6x1, 1x4, 3x3, 7x1, 4x2, 4x3, 6x2, 1x5, 5x2, 2x3, 3x4, 7x2, 5x3, 8x1, 3x5, 6x3, 2x4, 5x4, 7x3, 2x5, 5x5, 4x4, 6x4, 7x4, 8x2, 6x5, 4x5, 8x3, 9x1, 9x2, 8x4, 9x3, 9x4, 8x5, 9x5, 10x1, 7x5, 10x2, 10x3, 10x4, 10x5, 11x1, 11x2, 11x3, 11x4, 11x5, 12x1, 12x2, 12x3, 12x4, 12x5
        Other completions you need: 1x2, 2x1, 3x1
        For more information on beating this challenge, use the command /ec 4 1`
      }
    ],
    parameters: [
      {
        name: "challenge",
        description: "the challenge you want to do",
        required: false,
      },
      {
        name: "completion",
        description: "the completion you want to do",
        required: false,
      },
    ],
  },
  "ecs": {
    name: "ecs",
    description: "sends link to ninjatsu's EC guide",
    usage: `/ecs`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "eternitychallenge": {
    name: "eternitychallenge",
    description: "usage: `/eternitychallenge [challenge] [completion]`. follow onscreen prompts",
    usage: `/eternitychallenge [challenge] [completion] [hide?] [info?] [target?]`,
    aliases: ["/ec"],
    examples: [
      {
        example: "/eternitychallenge 3 4",
        returns: "https://i.imgur.com/wEnTe3O.png",
        image: true,
      },
      {
        example: "/eternitychallenge 8 1 true goal",
        returns: "https://i.imgur.com/GgbvuWX.png",
        image: true
      }
    ],
    parameters: [
      {
        name: "challenge",
        description: "the challenge you want to do",
        required: true,
      },
      {
        name: "completion",
        description: "the completion you want to do",
        required: true,
      },
      {
        name: "hide",
        description: "ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Hides the entire command usage from the chat",
        required: false,
      },
      {
        name: "info",
        description: "What information about the challenge do you want to see?",
        required: false,
        choices: [
          {
            name: "unlock",
            description: "displays the unlock requirements for the challenge",
          },
          {
            name: "challenge",
            description: "displays the challenge description",
          },
          {
            name: "goal",
            description: "displays the goal of the challenge",
          },
          {
            name: "strategy",
            description: "displays the strategy of the challenge (total TT, other completions)",
          },
          {
            name: "tree",
            description: "displays the tree of the challenge",
          },
          {
            name: "reward",
            description: "displays the reward of the challenge",
          }
        ]
      },
      {
        name: "target",
        description: "a specific user you wish to show the information to",
        required: false,
      }
    ],
  },
  "eternitychallengeorder": {
    name: "eternitychallengeorder",
    description: "Returns the EC order.",
    usage: `/eternitychallengeorder ([challenge] [ec])?`,
    aliases: ["/eco"],
    examples: [
      {
        example: "/eternitychallengeorder 4 1",
        returns: `Order: 3x1, 4x1, 5x1, 1x3, 3x2, 2x2, 6x1, 1x4, 3x3, 7x1, 4x2, 4x3, 6x2, 1x5, 5x2, 2x3, 3x4, 7x2, 5x3, 8x1, 3x5, 6x3, 2x4, 5x4, 7x3, 2x5, 5x5, 4x4, 6x4, 7x4, 8x2, 6x5, 4x5, 8x3, 9x1, 9x2, 8x4, 9x3, 9x4, 8x5, 9x5, 10x1, 7x5, 10x2, 10x3, 10x4, 10x5, 11x1, 11x2, 11x3, 11x4, 11x5, 12x1, 12x2, 12x3, 12x4, 12x5
        Other completions you need: 1x2, 2x1, 3x1
        For more information on beating this challenge, use the command /ec 4 1`
      }
    ],
    parameters: [
      {
        name: "challenge",
        description: "the challenge you want to do. These will start the list of ECs at the EC requested",
        required: false,
      },
      {
        name: "completion",
        description: "the completion you want to do. These will start the list of ECs at the EC requested",
        required: false,
      },
    ],
  },
  "failec": {
    name: "failec",
    description: "Describes what ECs you can fail and how/when",
    usage: `/failec`,
    aliases: [],
    examples: [],
  },
  "achievements": {
    name: "achievements",
    description: "sends link to achievements guide. Achievement IDs are based on the mobile version (one of the parameters is required)",
    usage: `/achievements [achievement?] [other?]`,
    aliases: [],
    examples: [
      {
        example: "/achievements",
        returns: "https://docs.google.com/document/d/1C8W_lt9EPxpu9wIloWZo5CPDdZ4ItP1-IU1Vs3x7lEg"
      },
      {
        example: "/achievements achievement:Zero Deaths",
        returns: "https://i.imgur.com/g4LP9JV.png",
        image: true
      },
      {
        example: "/achievements other:111",
        returns: "https://i.imgur.com/5T5Ltby.png",
        image: true
      }
    ],
    parameters: [
      {
        name: "achievement",
        description: "the achievement you wish to see information about",
        required: false,
        choices: [
          {
            name: "9th Dimension is a lie",
            description: "achievement 23"
          },
          {
            name: "There's no point in doing that...",
            description: "achievement 28"
          },
          {
            name: "Claustrophobic",
            description: "achievement 36"
          },
          {
            name: "Error 909: Dimension Not Found",
            description: "achievement 71"
          },
          {
            name: "Zero Deaths",
            description: "achievement 64"
          },
          {
            name: "Game Design is my Passion / Hevipelle did nothing wrong",
            description: "achievement 81"
          },
          {
            name: "2 Million Infinities",
            description: "achievement 87"
          },
          {
            name: "Ludicrous Speed",
            description: "achievement 91"
          },
          {
            name: "I break for nobody",
            description: "achievement 92"
          },
          {
            name: "Yes, this is hell / Like jumping on a lego",
            description: "achievement 97"
          },
          {
            name: "Do you really need a guide for this",
            description: "achievement 107"
          },
          {
            name: "Do I really need to infinity",
            description: "achievement 116"
          },
          {
            name: "We could afford 9",
            description: "achievement 108"
          },
          {
            name: "Yo dawg, I heard you like infinities",
            description: "achievement 111"
          },
          {
            name: "You're a mistake.",
            description: "achievement 114"
          },
          {
            name: "Like feasting on a behind",
            description: "achievement 125"
          },
          {
            name: "Popular music",
            description: "achievement 126"
          },
          {
            name: "No ethical consumption",
            description: "achievement 131"
          },
          {
            name: "I never liked this infinity stuff anyways",
            description: "achievement 133"
          },
          {
            name: "When will it be enough?",
            description: "achievement 134"
          }
        ]
      },
      {
        name: "other",
        description: "the achievement you wish to see information about, using the achievement ID",
        required: false
      }
    ],
  },
  "adbonus": {
    name: "adbonus",
    description: "Sends ad bonus formulas/multipliers",
    usage: `/adbonus`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "bottombuttons": {
    name: "bottombuttons",
    description: "shows what the bottom buttons are",
    usage: `/bottombuttons`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "challenge": {
    name: "challenge",
    description: "Returns a guide for each challenge based on your input.",
    usage: `/challenge [challenge] [info?]`,
    aliases: ["/c9", "/ic4", "/ic5"],
    examples: [
      {
        example: "/challenge challenge:c6",
        returns: "https://i.imgur.com/HAP6uG5.png",
        image: true
      },
      {
        example: "/challenge challenge:ic8",
        returns: "https://i.imgur.com/y8umhBK.png",
        image: true
      }
    ],
    parameters: [
      {
        name: "challenge",
        description: "the challenge you want to do",
        required: true,
        choices: [
          {
            name: "c2",
            description: "normal challenge 2 (2nd Antimatter Dimension Autobuyer Challenge)"
          },
          {
            name: "c3",
            description: "normal challenge 3 (3rd Antimatter Dimension Autobuyer Challenge)"
          },
          {
            name: "c4",
            description: "normal challenge 4 (4th Antimatter Dimension Autobuyer Challenge)"
          },
          {
            name: "c5",
            description: "normal challenge 5 (5th Antimatter Dimension Autobuyer Challenge)"
          },
          {
            name: "c6",
            description: "normal challenge 6 (6th Antimatter Dimension Autobuyer Challenge)"
          },
          {
            name: "c7",
            description: "normal challenge 7 (7th Antimatter Dimension Autobuyer Challenge)"
          },
          {
            name: "c8",
            description: "normal challenge 8 (8th Antimatter Dimension Autobuyer Challenge)"
          },
          {
            name: "c9",
            description: "normal challenge 9 (has shorthand \"/c9\") (Tickspeed Autobuyer Challenge)"
          },
          {
            name: "c10",
            description: "normal challenge 10 (DimBoost Autobuyer Challenge)"
          },
          {
            name: "c11",
            description: "normal challenge 11 (Galaxy Autobuyer Challenge)"
          },
          {
            name: "c12",
            description: "normal challenge 12 (Big Crunch Autobuyer Challenge)"
          },
          {
            name: "ic1",
            description: "infinity challenge 1"
          },
          {
            name: "ic2",
            description: "infinity challenge 2"
          },
          {
            name: "ic3",
            description: "infinity challenge 3"
          },
          {
            name: "ic4",
            description: "infinity challenge 4 (has shorthand \"/ic4\")"
          },
          {
            name: "ic5",
            description: "infinity challenge 5 (has shorthand \"/ic5\")"
          },
          {
            name: "ic6",
            description: "infinity challenge 6"
          },
          {
            name: "ic7",
            description: "infinity challenge 7"
          },
          {
            name: "ic8",
            description: "infinity challenge 8"
          },
          {
            name: "ecs",
            description: "sends a link to Ninjatsu's full EC guide"
          },
        ]
      },
      {
        name: "info",
        description: "What information about the challenge do you want to see?",
        required: false,
        choices: [
          {
            name: "unlock",
            description: "displays the unlock requirements for the challenge",
          },
          {
            name: "challenge",
            description: "displays the challenge description",
          },
          {
            name: "goal",
            description: "displays the goal of the challenge",
          },
          {
            name: "strategy",
            description: "displays the strategy of the challenge",
          },
          {
            name: "reward",
            description: "displays the reward of the challenge",
          }
        ]
      }
    ],
  },
  "galaxyscaling": {
    name: "galaxyscaling",
    description: "Explains the change in scaling at 100 (and 800) Antimatter Galaxies",
    usage: `/galaxyscaling`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "importexport": {
    name: "importexport",
    description: "sends that screenshot of the break infinity upgrade order spreadsheet",
    usage: `/importexport`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "news": {
    name: "news",
    description: "Explains what the news ticker is and where it came from",
    usage: `/news [info]`,
    aliases: [],
    examples: [
      {
        example: "/news listmobile",
        returns: "List of mobile news messages in the game Antimatter Dimensions (from Wikipedia) (link to https://gist.github.com/earthernsence/2661619a3e4ca8089709f9fe19395f77)"
      }
    ],
    parameters: [
      {
        name: "info",
        description: "What information about the news ticker do you want to see?",
        required: true,
        choices: [
          {
            name: "info",
            description: "displays basic news ticker information"
          },
          {
            name: "listmobile",
            description: "displays the list of mobile news ticker messages"
          },
          {
            name: "listweb",
            description: "displays the list of web news ticker messages"
          }
        ]
      }
    ],
  },
  "offlineticks": {
    name: "offlineticks",
    description: "offline ticks stuff",
    usage: `/offlineticks`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "oom": {
    name: "oom",
    description: "describes what an OoM (Order of Magnitude) is",
    usage: `/oom`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "upgrade": {
    name: "upgrade",
    description: "Explains what the requested upgrade is. Uses subcommands to determine type (one is required)",
    usage: `/upgrade [subcommand] [upgrade]`,
    aliases: [],
    examples: [
      {
        example: "/upgrade infinity upgrade:45mult",
        returns: "https://i.imgur.com/nQgESXL.png",
        image: true
      }
    ],
    parameters: [
      {
        name: "infinity",
        description: "the infinity upgrade you want to know about",
        required: false,
        choices: [
          {
            name: "timeMult",
            description: "infinity upgrade 1x1 (row x column)"
          },
          {
            name: "18mult",
            description: "infinity upgrade 2x1"
          },
          {
            name: "27mult",
            description: "infinity upgrade 2x2"
          },
          {
            name: "36mult",
            description: "infinity upgrade 3x1"
          },
          {
            name: "45mult",
            description: "infinity upgrade 3x2"
          },
          {
            name: "resetBoost",
            description: "infinity upgrade 4x1"
          },
          {
            name: "buy10mult",
            description: "infinity upgrade 1x2"
          },
          {
            name: "galaxyBoost",
            description: "infinity upgrade 4x2"
          },
          {
            name: "thisInfinityTimeMult",
            description: "infinity upgrade 1x3"
          },
          {
            name: "unspentIPMult",
            description: "infinity upgrade 2x3"
          },
          {
            name: "dimboostMult",
            description: "infinity upgrade 3x3"
          },
          {
            name: "ipGen",
            description: "infinity upgrade 4x3"
          }
        ]
      },
      {
        name: "break",
        description: "the break infinity upgrade you want to know about",
        required: false,
        choices: [
          {
            name: "totalAMMult",
            description: "break infinity upgrade 1x1"
          },
          {
            name: "currentAMMult",
            description: "break infinity upgrade 1x2"
          },
          {
            name: "galaxyBoost",
            description: "break infinity upgrade 1x3"
          },
          {
            name: "infinitiedMult",
            description: "break infinity upgrade 2x1"
          },
          {
            name: "achievementMult",
            description: "break infinity upgrade 2x2"
          },
          {
            name: "slowestChallengeMult",
            description: "break infinity upgrade 2x3"
          },
          {
            name: "infinitiedGen",
            description: "break infinity upgrade 3x1"
          },
          {
            name: "autobuyMaxDimboosts",
            description: "break infinity upgrade 3x2"
          },
          {
            name: "autobuyerSpeed",
            description: "break infinity upgrade 3x3"
          },
          {
            name: "tickspeedCostMult",
            description: "break infinity upgrade 4x1"
          },
          {
            name: "dimCostMult",
            description: "break infinity upgrade 4x2"
          },
          {
            name: "ipGen",
            description: "break infinity upgrade 4x3"
          }
        ]
      },
      {
        name: "eternity",
        description: "the eternity upgrade you want to know about",
        required: false,
        choices: [
          {
            name: "idMultEP",
            description: "eternity upgrade 1x1"
          },
          {
            name: "idMultEternities",
            description: "eternity upgrade 1x2"
          },
          {
            name: "idMultICRecords",
            description: "eternity upgrade 1x3"
          },
          {
            name: "tdMultAchs",
            description: "eternity upgrade 2x1"
          },
          {
            name: "tdMultTheorems",
            description: "eternity upgrade 2x2"
          },
          {
            name: "tdMultDaysPlayed",
            description: "eternity upgrade 2x3"
          }
        ]
      },
      {
        name: "dilation",
        description: "the dilation upgrade you want to know about",
        required: false,
        choices: [
          {
            name: "dtGain",
            description: "dilation upgrade 1x1"
          },
          {
            name: "galaxyThreshold",
            description: "dilation upgrade 1x2"
          },
          {
            name: "tachyonGain",
            description: "dilation upgrade 1x3"
          },
          {
            name: "doubleGalaxies",
            description: "dilation upgrade 2x1"
          },
          {
            name: "tdMultReplicanti",
            description: "dilation upgrade 2x2"
          },
          {
            name: "adMultDT",
            description: "dilation upgrade 2x3"
          },
          {
            name: "idMultDT",
            description: "dilation upgrade 3x1"
          },
          {
            name: "timeStudySplit",
            description: "dilation upgrade 3x2"
          },
          {
            name: "dilationPenalty",
            description: "dilation upgrade 3x3"
          },
          {
            name: "ttGenerator",
            description: "dilation upgrade 4x1"
          }
        ]
      }
    ],
  },
  "abb": {
    name: "abb",
    description: "sends an abbreviation guide",
    usage: `/abb`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "androidorweb": {
    name: "androidorweb",
    description: "sends the pinned message from the mobile channel describing the differences.",
    usage: `/androidorweb`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "antitables": {
    name: "antitables",
    description: "Args: `prebreak`, `postbreak`, `posteternity`. Sends a guide to Antitables.",
    usage: `/antitables [when]`,
    aliases: [],
    examples: [
      {
        example: "/antitables postbreak",
        returns: `Get as many galaxies as you can and a few dimboosts. Disable the dim 1-7 autobuyers. Dimboost, then toggle Until 10 next to tickspeed and buy 1 of each dim. Then toggle Buy 1 back, and buy 10 2nd dims. Continue up from 3rd to 8th dim, buying just enough dimensions to get the Dimension Multiplier (the number below the dimension name) higher than the last. 
        If your 1st dimension multiplier raises too quickly, you may be unable to complete the achievement until you reach 1.8e308 IP. If this is the case, don't worry, you don't need it to progress.`
      }
    ],
    parameters: [
      {
        name: "when",
        description: "what point in the game are you",
        required: true,
        choices: [
          {
            name: "prebreak",
            description: "before break infinity",
          },
          {
            name: "postbreak",
            description: "after break infinity",
          },
          {
            name: "posteternity",
            description: "after eternity",
          }
        ]
      }
    ],
  },
  "decimal": {
    name: "decimal",
    description: "Explains how break_infinity.js works",
    usage: `/decimal`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "howtoplay": {
    name: "howtoplay",
    description: "sends the bowtoplay from the mobile version of the game. I'm too lazy to type out all of this stuff for parameters.",
    usage: `/howtoplay [subcommand group] [subcommand]`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "notations": {
    name: "notations",
    description: "Sends a link to the Notations GitHub repo.",
    usage: `/notations`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "5hours": {
    name: "5hours",
    description: "Explains the long-standing 5 hours joke",
    usage: `/5hours`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "contributors": {
    name: "contributors",
    description: "sends a list of contributors and what they helped with! this bot would not be possible without them.",
    usage: `/contributors`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "helper": {
    name: "helper",
    description: "sends a consent form to become a designated helper",
    usage: `/helper`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "slashcommand": {
    name: "slashcommand",
    description: "explains how TS and EC slash commands work with their args and how to type them",
    usage: `/slashcommand`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "discordformatting": {
    name: "discordformatting",
    description: "returns a link to a list of discord formatting stuff",
    usage: `/discordformatting`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "invertedtheme": {
    name: "invertedtheme",
    description: "response to the frequent web bug report that the inverted theme is bugged",
    usage: `/invertedtheme`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "ipepcolour": {
    name: "ipepcolour",
    description: "Explains the colouring of the IP/EP numbers on their respective reset buttons",
    usage: `/ipepcolour`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "justask": {
    name: "justask",
    description: "sends a passive aggressive thing",
    usage: `/justask`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "paperclips": {
    name: "paperclips",
    description: "explanation of the origin of paperclips",
    usage: `/paperclips`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "reality": {
    name: "reality",
    description: "Information surrounding the upcoming reality update.",
    usage: `/reality [info]`,
    aliases: [],
    examples: [
      {
        example: "/reality info:releasedate",
        returns: "There is no set release date for Reality. Even those who are close to the development do not know. We can also not give you an estimate. Reality is a big update with a lot of moving parts, and we want to make sure that it's up to snuff. Please remain patient! Reality will also be the last major update for Antimatter Dimensions, so we want to make sure we deliver the perfect product that we know you will enjoy."
      }
    ],
    parameters: [
      {
        name: "info",
        description: "the info you want to know about",
        required: true,
        choices: [
          {
            name: "reset",
            description: "describes the Reality reset"
          },
          {
            name: "link",
            description: "sends a link to the Reality update",
          },
          {
            name: "automator",
            description: "describes the automator",
          },
          {
            name: "perks",
            description: "describes what perks are",
          },
          {
            name: "celestials",
            description: "describes the celestials",
          },
          {
            name: "blackhole",
            description: "describes the blackhole",
          },
          {
            name: "releasedate",
            description: "tells what the release date for reality is",
          }
        ]
      }
    ],
  },
  "roles": {
    name: "roles",
    description: "explains that you can get an Android or Web player role",
    usage: `/roles`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "savebank": {
    name: "savebank",
    description: "Provides a link to Buck's save bank.",
    usage: `/savebank`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "savesharing": {
    name: "savesharing",
    description: "Provides a brief explanation on sharing saves.",
    usage: `/savesharing`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "secretachievements": {
    name: "secretachievements",
    description: "Sends a link to the secret achievements guide.",
    usage: `/secretachievements`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "site": {
    name: "site",
    description: "Says the game site + link to android version",
    usage: `/site`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "deadchat": {
    name: "deadchat",
    description: "sends that one message from spec that he said that one time",
    usage: `/deadchat`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "pins": {
    name: "pins",
    description: "pins. read them",
    usage: `/pins`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "slightsmile": {
    name: "slightsmile",
    description: "kaj no",
    usage: `/slightsmile`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "time": {
    name: "time",
    description: "Displays the current time, in Decimal time. https://en.wikipedia.org/wiki/Decimal_time",
    usage: `/time`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "user": {
    name: "user",
    description: "get information about a user",
    usage: `/user [user]`,
    aliases: [],
    examples: [
      {
        example: "/user user:earth#1337",
        returns: "https://i.imgur.com/KN97eZb.png",
        image: true,
      }
    ],
    parameters: [
      {
        name: "user",
        description: "the user you want to get information about",
        required: true,
      }
    ],
  },
  "wikipedia": {
    name: "wikipedia",
    description: "displays given Wikipedia article based on search term",
    usage: `/wikipedia [article]`,
    aliases: [],
    examples: [
      {
        example: "/wikipedia article:Cneoridium dumosum (Nuttall) Hooker F. Collected March 26, 1960, at an Elevation of about 1450 Meters on Cerro Quemazón, 15 Miles South of Bahía de Los Angeles, Baja California, México, Apparently for a Southeastward Range Extension of Some 140 Miles",
        returns: "\"Cneoridium dumosum (Nuttall) Hooker F. Collected March 26, 1960, at an Elevation of about 1450 Meters on Cerro Quemazón, 15 Miles South of Bahía de Los Angeles, Baja California, México, Apparently for a Southeastward Range Extension of Some 140 Miles\" is a humorous (or parody), yet factual, scientific paper by American botanist Reid Moran of the S..."
      }
    ],
    parameters: [
      {
        name: "article",
        description: "the article you want to get information about",
        required: true,
      }
    ],
  },
  "xkcd": {
    name: "xkcd",
    description: "any XKCD comic using the number",
    usage: `/xkcd [xkcd]`,
    aliases: [],
    examples: [
      {
        example: "/xkcd xkcd:2600",
        returns: "https://xkcd.com/2600/"
      }
    ],
    parameters: [
      {
        name: "xkcd",
        description: "the comic you want to view",
        required: true,
      }
    ],
  },
  "help": {
    name: "help",
    description: "help command",
    usage: `/help`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "meta": {
    name: "meta",
    description: "information about the bot",
    usage: `/meta`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  "reportmessage": {
    name: "reportmessage",
    description: "report a message",
    usage: `/reportmessage [message ID || message link] [reason?]`,
    aliases: [],
    examples: [],
    parameters: [
      {
        name: "message",
        description: "the message you want to report (using either the link or the ID)",
        required: true,
      },
      {
        name: "reason",
        description: "the reason you want to report the message",
        required: false
      }
    ]
  },
  "commands": {
    name: "commands",
    description: "Sends a link to the commands site",
    usage: `/commands`,
    aliases: [],
    examples: [],
    parameters: [],
  },
  get byPage() {
    return {
      1: [this["1minuteinf"], this.breakinfinity, this.bulkbuy, this.c9, this.dimboostorgalaxy, this.earlyinfinity, this.galaxyboost, this.grindingforbreak, this.infinity, this.iugo, this.sacrifice, this.swipetrick],
      2: [this.bugo, this.ic4, this.ic5, this.infinitydimensions, this.peakipmin, this.replicanti, this.setcrunchauto],
      3: [this["161or162"], this.earlyeternityprogression, this.eep, this.ep, this.eternitygrinding, this.firstsplit, this.infinitygrinding, this.respec, this.secondsplit, this.study, this.studytree, this.ts],
      4: [this.bankedinfinities, this.changeectree, this.dilation, this.dilationgrind, this.dilationtrees, this.ec, this.eco, this.ecs, this.eternitychallenge, this.eternitychallengeorder, this.failec],
      5: [this.achievements, this.adbonus, this.bottombuttons, this.challenge, this.galaxyscaling, this.importexport, this.news, this.offlineticks, this.oom, this.upgrade],
      6: [this.abb, this.androidorweb, this.antitables, this.decimal, this.howtoplay, this.notations],
      7: [this["5hours"], this.commands, this.contributors, this.helper, this.reportmessage, this.slashcommand],
      8: [this.discordformatting, this.invertedtheme, this.ipepcolour, this.justask, this.paperclips, this.reality, this.roles, this.savebank, this.savesharing, this.secretachievements, this.site],
      69: [this.deadchat, this.pins, this.slightsmile, this.time, this.user, this.wikipedia, this.xkcd],
      100: [this.help, this.meta],
    };
  }
};
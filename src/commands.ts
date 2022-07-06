/* eslint-disable sort-imports */
// We're disabling this rule in order to sort the imports based on page.
import { Command } from "./command";

import { oneminuteinf } from "./commands/1/1minuteinf";
import { breakinfinity } from "./commands/1/breakinfinity";
import { bulkbuy } from "./commands/1/bulkbuy";
import { c9 } from "./commands/1/c9";
import { columns } from "./commands/1/columns";
import { dimboostorgalaxy } from "./commands/1/dimboostorgalaxy";
import { earlyinfinity } from "./commands/1/earlyinfinity";
import { galaxyboost } from "./commands/1/galaxyboost";
import { grindingforbreak } from "./commands/1/grindingforbreak";
import { infinity } from "./commands/1/infinity";
import { iugo } from "./commands/1/iugo";
import { sacrifice } from "./commands/1/sacrifice";
import { swipetrick } from "./commands/1/swipetrick";

import { bugo } from "./commands/2/bugo";
import { ic4 } from "./commands/2/ic4";
import { ic5 } from "./commands/2/ic5";
import { infinitydimensions } from "./commands/2/infinitydimensions";
import { peakipmin } from "./commands/2/peakipmin";
import { replicanti } from "./commands/2/replicanti";
import { setcrunchauto } from "./commands/2/setcrunchauto";

import { onesixtyoneor162 } from "./commands/3/161or162";
import { earlyeternityprogression } from "./commands/3/earlyeternityprogression";
import { eep } from "./commands/3/eep";
import { ep } from "./commands/3/ep";
import { eternitygrinding } from "./commands/3/eternitygrinding";
import { firstsplit } from "./commands/3/firstsplit";
import { infinitygrinding } from "./commands/3/infinitygrinding";
import { respec } from "./commands/3/respec";
import { secondsplit } from "./commands/3/secondsplit";
import { study } from "./commands/3/study";
import { studytree } from "./commands/3/studytree";
import { ts } from "./commands/3/ts";

import { bankedinfinities } from "./commands/4/bankedinfinities";
import { changeectree } from "./commands/4/changeectree";
import { dilation } from "./commands/4/dilation";
import { dilationgrind } from "./commands/4/dilationgrind";
import { dilationtrees } from "./commands/4/dilationtrees";
import { ec } from "./commands/4/ec";
import { eco } from "./commands/4/eco";
import { ecs } from "./commands/4/ecs";
import { eternitychallenge } from "./commands/4/eternitychallenge";
import { eternitychallengeorder } from "./commands/4/eternitychallengeorder";
import { failec } from "./commands/4/failec";

import { achievements } from "./commands/5/achievements";
import { adbonus } from "./commands/5/adbonus";
import { bottombuttons } from "./commands/5/bottombuttons";
import { challenge } from "./commands/5/challenge";
import { galaxyscaling } from "./commands/5/galaxyscaling";
import { importexport } from "./commands/5/importexport";
import { news } from "./commands/5/news";
import { offlineticks } from "./commands/5/offlineticks";
import { oom } from "./commands/5/oom";
import { upgrade } from "./commands/5/upgrade";

import { abb } from "./commands/6/abb";
import { androidorweb } from "./commands/6/androidorweb";
import { antitables } from "./commands/6/antitables";
import { decimal } from "./commands/6/decimal";
import { howtoplay } from "./commands/6/howtoplay";
import { notations } from "./commands/6/notations";

import { fivehours } from "./commands/7/5hours";
import { contributors } from "./commands/7/contributors";
import { helperRequest } from "./commands/7/helper";
import { slashcommand } from "./commands/7/slashcommand";

import { discordformatting } from "./commands/8/discordformatting";
import { invertedtheme } from "./commands/8/invertedtheme";
import { ipepcolour } from "./commands/8/ipepcolour";
import { justask } from "./commands/8/justask";
import { paperclips } from "./commands/8/paperclips";
import { reality } from "./commands/8/reality";
import { roles } from "./commands/8/roles";
import { savebank } from "./commands/8/savebank";
import { savesharing } from "./commands/8/savesharing";
import { secretachievements } from "./commands/8/secretachievements";
import { site } from "./commands/8/site";

import { deadchat } from "./commands/69/deadchat";
import { pins } from "./commands/69/pins";
import { slightsmile } from "./commands/69/slightsmile";
import { time } from "./commands/69/time";
import { user } from "./commands/69/user";
import { wikipedia } from "./commands/69/wikipedia";
import { xkcd } from "./commands/69/xkcd";

import { help } from "./commands/misc/help";
import { meta } from "./commands/misc/meta";

export const commandsByPage: { [page: number]: Command[] } = {
  1: [oneminuteinf, breakinfinity, bulkbuy, c9, columns, dimboostorgalaxy, earlyinfinity, galaxyboost, grindingforbreak, infinity, iugo, sacrifice, swipetrick],
  2: [bugo, ic4, ic5, infinitydimensions, peakipmin, replicanti, setcrunchauto],
  3: [onesixtyoneor162, earlyeternityprogression, eep, ep, eternitygrinding, firstsplit, infinitygrinding, respec, secondsplit, study, studytree, ts],
  4: [bankedinfinities, changeectree, dilation, dilationgrind, dilationtrees, ec, eco, ecs, eternitychallenge, eternitychallengeorder, failec],
  5: [achievements, adbonus, bottombuttons, challenge, galaxyscaling, importexport, news, offlineticks, oom, upgrade],
  6: [abb, androidorweb, antitables, decimal, howtoplay, notations],
  7: [fivehours, contributors, helperRequest, slashcommand],
  8: [discordformatting, invertedtheme, ipepcolour, justask, paperclips, reality, roles, savebank, savesharing, secretachievements, site],
  69: [deadchat, pins, slightsmile, time, user, wikipedia, xkcd],
};

export const Commands: Command[] = [
  oneminuteinf, breakinfinity, bulkbuy, c9, columns, dimboostorgalaxy, earlyinfinity, galaxyboost, grindingforbreak, infinity, iugo, sacrifice, swipetrick,
  bugo, ic4, ic5, infinitydimensions, peakipmin, replicanti, setcrunchauto,
  onesixtyoneor162, earlyeternityprogression, eep, ep, eternitygrinding, firstsplit, infinitygrinding, respec, secondsplit, study, studytree, ts,
  bankedinfinities, changeectree, dilation, dilationgrind, dilationtrees, ec, eco, ecs, eternitychallenge, eternitychallengeorder, failec,
  achievements, adbonus, bottombuttons, challenge, galaxyscaling, importexport, news, offlineticks, oom, upgrade,
  abb, androidorweb, antitables, decimal, howtoplay, notations,
  fivehours, contributors, helperRequest, slashcommand,
  discordformatting, invertedtheme, ipepcolour, justask, paperclips, reality, roles, savebank, savesharing, secretachievements, site,
  deadchat, pins, slightsmile, time, user, wikipedia, xkcd,
  help, meta
];
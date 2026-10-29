import whoEasy from './indiaPackWhoEasy.txt?raw';
import whoMedium from './indiaPackWhoMedium.txt?raw';
import whoHard from './indiaPackWhoHard.txt?raw';
import whatEasy from './indiaPackWhatEasy.txt?raw';
import whatMedium from './indiaPackWhatMedium.txt?raw';
import whatHard from './indiaPackWhatHard.txt?raw';
import whereEasy from './indiaPackWhereEasy.txt?raw';
import whereMedium from './indiaPackWhereMedium.txt?raw';
import whereHard from './indiaPackWhereHard.txt?raw';
import whenEasy from './indiaPackWhenEasy.txt?raw';
import whenMedium from './indiaPackWhenMedium.txt?raw';
import whenHard from './indiaPackWhenHard.txt?raw';
import {assembleIndiaPack} from './indiaMysteryPacks';
export const indiaAtlasExpansion=[
 ...assembleIndiaPack({kind:'who',difficulty:'easy',rows:whoEasy}),
 ...assembleIndiaPack({kind:'who',difficulty:'medium',rows:whoMedium}),
 ...assembleIndiaPack({kind:'who',difficulty:'hard',rows:whoHard}),
 ...assembleIndiaPack({kind:'what',difficulty:'easy',rows:whatEasy}),
 ...assembleIndiaPack({kind:'what',difficulty:'medium',rows:whatMedium}),
 ...assembleIndiaPack({kind:'what',difficulty:'hard',rows:whatHard}),
 ...assembleIndiaPack({kind:'where',difficulty:'easy',rows:whereEasy}),
 ...assembleIndiaPack({kind:'where',difficulty:'medium',rows:whereMedium}),
 ...assembleIndiaPack({kind:'where',difficulty:'hard',rows:whereHard}),
 ...assembleIndiaPack({kind:'when',difficulty:'easy',rows:whenEasy}),
 ...assembleIndiaPack({kind:'when',difficulty:'medium',rows:whenMedium}),
 ...assembleIndiaPack({kind:'when',difficulty:'hard',rows:whenHard}),
];

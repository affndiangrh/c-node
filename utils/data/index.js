const dataAU2mobile = require('./au2mobile.json');
const dataAU2mobile2 = require('./au2mobile2.json');
const dataCoda = require('./codashop.json');
const dataDunia = require('./duniagames.json');
const dataRoglobal = require('./roglobal.json');
const dataJollymax = require('./jollymax.json');
const dataElite = require('./elitedias.json');
const dataTopupLive = require('./topuplive.json');
const dataBosBos = require('./bosbosgame.json');
const dataGameku = require('./gameku.json');
const dataMobapay = require('./mobapay.json');
const dataStatsRoyale = require('./statsroyale.json');
const dataClashOfStats = require('./clashofstats.json');
const dataBrawlStar = require('./brawlstar.json');
const dataVocagame = require('./vocagame.json');
const datagempay = require('./gempay.json');

const config = require('../../config.js');

let oldDataGame = [
   ...dataCoda.data,
   ...dataDunia.data,
   ...dataAU2mobile.data,
   // ...dataRoglobal.data,
   // ...dataJollymax.data,
   // ...dataElite.data,
   ...dataTopupLive.data,
   ...(config.higsDomino ? dataBosBos.data : []),
   // ...dataGameku.data,
   ...dataAU2mobile2.data,
   ...dataMobapay.data,
   ...dataStatsRoyale.data,
   ...dataClashOfStats.data,
   ...dataVocagame.data,
   // ...dataBrawlStar.data,
   ...datagempay.data,
];

// Fillter data agar tidak duplikat slugnya
const dataGame = [...new Map(oldDataGame.map((m) => [m.slug, m])).values()];

module.exports = { dataGame };

const { dataGame } = require('../utils/data');
const {
   codashopServices,
   duniaGamesServices,
   au2mobileServices,
   roGlobalServices,
   jollymaxServices,
   elitediasServices,
   bosBosGameServices,
   gamekuServices,
   au2mobile2Services,
   statsRoyaleService,
   clashOfStatsService,
   brawlStarService,
   vocagameServices,
   gempayServices,
} = require('../services');
const topupLiveServices = require('../services/topupLive.services');
const mobapayService = require('../services/mobapay.services');

const idCheckController = async (req, res) => {
   const slug = req.params.game;
   const { id, zone } = req.query;

   const game = dataGame.find((item) => item.slug === slug);
   if (!game) return res.status(404).json({ status: false, message: 'Game not found' });
   if (!id) return res.status(400).json({ status: false, message: 'ID is required' });
   if (game.isZone && !zone) return res.status(400).json({ status: false, message: 'Zone is required' });

   switch (game.provider) {
      case 'codashop':
         const getCoda = await codashopServices(game, id, zone);
         return res.status(getCoda.code).json(getCoda);
         break;
      case 'duniagames':
         const getDg = await duniaGamesServices(game, id, zone);
         return res.status(getDg.code).json(getDg);
         break;
      case 'au2mobile':
         const getAu = await au2mobileServices(game, id, zone);
         return res.status(getAu.code).json(getAu);
         break;
      case 'roglobal':
         const getRo = await roGlobalServices(game, id, zone);
         return res.status(getRo.code).json(getRo);
         break;
      case 'jollymax':
         const checkJolly = await jollymaxServices(game, id, zone);
         return res.status(checkJolly.code).json(checkJolly);
         break;
      case 'elitedias':
         const checkElite = await elitediasServices(game, id, zone);
         return res.status(checkElite.code).json(checkElite);
         break;
      case 'topuplive':
         const checkTL = await topupLiveServices(game, id, zone);
         return res.status(checkTL.code).json(checkTL);
         break;
      case 'bosbosgame':
         const checkBosBos = await bosBosGameServices(game, id, zone);
         return res.status(checkBosBos.code).json(checkBosBos);
         break;
      case 'gameku':
         const checkGameku = await gamekuServices(game, id, zone);
         return res.status(checkGameku.code).json(checkGameku);
         break;
      case 'au2mobile2':
         const au2mobile2 = await au2mobile2Services(game, id, zone);
         return res.status(au2mobile2.code).json(au2mobile2);
         break;
      case 'mobapay':
         const mobapay = await mobapayService(game, id, zone);
         return res.status(mobapay.code).json(mobapay);
         break;
      case 'statsroyale':
         const statsroyale = await statsRoyaleService(game, id, zone);
         return res.status(statsroyale.code).json(statsroyale);
         break;
      case 'clashofstats':
         const clashofstats = await clashOfStatsService(game, id, zone);
         return res.status(clashofstats.code).json(clashofstats);
         break;
      case 'brawlstar':
         const brawlStar = await brawlStarService(game, id, zone);
         return res.status(brawlStar.code).json(brawlStar);
         break;
      case 'vocagame':
         const vocagame = await vocagameServices(game, id, zone);
         return res.status(vocagame.code).json(vocagame);
         break;
      case 'gempay-check-region-mlbb':
         const gempay = await gempayServices(game, id, zone);
         return res.status(gempay.code).json(gempay);
         break;
      default:
         return res.status(400).json({ status: false, message: 'Provider not found' });
   }
};

module.exports = idCheckController;

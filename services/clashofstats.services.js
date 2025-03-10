const fetch = require('node-fetch');

const clashOfStatsService = async (game, id = null, zone = null) => {
   const checkStats = await fetch(
      `https://api.clashofstats.com/search/players?q=${encodeURIComponent(id)}&page=0&nameEquality=false`
   );
   try {
      const checkStatsResponse = await checkStats.json();
      // console.log(checkStatsResponse);
      if (checkStatsResponse?.items.length > 0) {
         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: checkStatsResponse.items[0].name,
               user_id: id,
               zone: zone || null,
               th_level: checkStatsResponse.items[0].townHallLevel,
               exp_level: checkStatsResponse.items[0].expLevel,
               throphies: checkStatsResponse.items[0].trophies,
            },
         };
      } else {
         return { code: 404, status: false, message: 'ID tidak ditemukan' };
      }
   } catch (err) {
      console.log(err);
      return { code: 500, status: false, message: 'Internal Server Error' };
   }
};

module.exports = clashOfStatsService;

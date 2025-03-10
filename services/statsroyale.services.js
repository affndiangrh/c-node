const fetch = require('node-fetch');

const statsRoyaleService = async (game, id = null, zone = null) => {
   const checkStats = await fetch(
      `https://stats-royale-api-js-beta-z2msk5bu3q-uk.a.run.app/profile/${id.replace('#', '')}`
   );
   try {
      const checkStatsResponse = await checkStats.json();
      // console.log(checkStatsResponse);
      if (checkStatsResponse.success == true) {
         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: checkStatsResponse.profile?.name,
               user_id: id,
               zone: zone || null,
               level: checkStatsResponse.profile?.level,
               throphies: checkStatsResponse.profile?.trophies,
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

module.exports = statsRoyaleService;

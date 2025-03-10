const fetch = require('node-fetch');

const brawlStarService = async (game, id = null, zone = null) => {
   const input = JSON.stringify({ json: id.replace('#', '') });

   const checkStats = await fetch(`https://brawltime.ninja/api/player.byTag?input=${encodeURIComponent(input)}`);
   try {
      console.log(await checkStats.text());
      const checkStatsResponse = await checkStats.json();
      if (checkStatsResponse?.result?.data?.json?.name) {
         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: checkStatsResponse.result.data.json.name,
               user_id: id,
               zone: zone || null,
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

module.exports = brawlStarService;

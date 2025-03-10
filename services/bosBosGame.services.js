const fetch = require('node-fetch');

const bosBosGameService = async (game, id = null, zone = null) => {
   const cekBosBos = await fetch(`https://www.lmevq.com/web/infullRequest.do`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
         Origin: 'https://www.lmevq.com',
         Referer: 'https://www.lmevq.com/web/webInfull.do',
      },
      body: new URLSearchParams({
         userId: id,
         costKey: game.costKey,
         infullType: game.infullType,
         version: '',
      }),
   });

   try {
      const cekBosBosJson = await cekBosBos.json();
      if (cekBosBosJson.code == '0') {
         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: cekBosBosJson.message.nickName,
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

module.exports = bosBosGameService;

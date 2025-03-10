const fetch = require('node-fetch');

const roGlobalServices = async (game, id = null, zone = null) => {
   const cekRo = await fetch(
      `
     https://roglobal.com/api/pay/game/server/roles?server_id=${zone}&open_id=${id}`,
      {
         headers: {
            Accept: '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            Sign: '17c72c9d1d0898d0da6b1285983b74ee',
            Timestamp: '1687920476',
         },
      }
   );
   try {
      const cekRoResponse = await cekRo.json();

      if (cekRoResponse.code == 0) {
         if (cekRoResponse.data.list.length == 0) {
            return { code: 404, status: false, message: 'ID tidak ditemukan' };
         } else {
            return {
               code: 200,
               status: true,
               message: 'ID berhasil ditemukan',
               data: {
                  username: cekRoResponse.data?.list[0]?.role_info,
                  user_id: id,
                  zone: game.dropdown.filter((item) => item.zoneId == zone)[0].name || null,
               },
            };
         }
      } else {
         return { code: 404, status: false, message: 'ID tidak ditemukan' };
      }
   } catch (err) {
      console.log(err);
      return { code: 500, status: false, message: 'Internal Server Error' };
   }
};

module.exports = roGlobalServices;

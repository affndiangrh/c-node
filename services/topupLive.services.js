const { random } = require('lodash');
const fetch = require('node-fetch');

const topupLiveServices = async (game, id = null, zone = null) => {
   const opt = {
      charge_region: zone,
      role_name: random(1000000, 9999999).toString(),
   };

   const getUsername = await fetch(`https://www.topuplive.com/pro-api/charge/account-check`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         type: game.type,
         sku_id: game.skuId,
         charge_tpl: {
            charge_account: id,
            ...opt,
         },
         charge_account: id,
      }),
   });

   try {
      const getUsernameJson = await getUsername.json();

      console.log(getUsernameJson);

      if (getUsernameJson.status != 1) {
         return {
            code: 404,
            status: false,
            message: getUsernameJson.message,
         };
      } else if (getUsernameJson.status == 1 && getUsernameJson.data.check) {
         return {
            code: 200,
            status: true,
            message: 'ID Berhasil ditemukan',
            data: {
               user_id: id,
               username: getUsernameJson.data.title,
               zone: zone,
            },
         };
      } else {
         return {
            code: 404,
            status: false,
            message: 'ID tidak ditemukan atau kebanned',
         };
      }
   } catch (err) {
      console.log(err);
      return {
         code: 500,
         status: false,
         message: 'Internal Server Error',
      };
   }
};

module.exports = topupLiveServices;

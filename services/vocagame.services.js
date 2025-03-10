const { random } = require('lodash');
const fetch = require('node-fetch');

const vocagameServices = async (game, id = null, zone = null) => {
   const opt = {
      charge_region: zone,
      role_name: random(1000000, 9999999).toString(),
   };

   const getUsername = await fetch(
      `https://api.vocagame.com/v1/order/prepare/${game.code}?userId=${id}&zoneId=${zone}`
   );

   try {
      const getUsernameJson = await getUsername.json();

      // console.log(getUsernameJson);

      if (getUsernameJson?.data) {
         return {
            code: 200,
            status: true,
            message: 'ID Berhasil ditemukan',
            data: {
               user_id: id,
               username: getUsernameJson.data,
               zone: zone,
            },
         };
      } else {
         return {
            code: 404,
            status: false,
            message: getUsernameJson.message,
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

module.exports = vocagameServices;

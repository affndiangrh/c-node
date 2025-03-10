const fetch = require('node-fetch');

const gamekuServices = async (game, id = null, zone = null) => {
   try {
      const getIgn = await fetch(
         `https://pubg-check.vercel.app/api/game/${game.pathName}?${new URLSearchParams({
            id: id,
            zone: zone,
         })}`
      );

      const getIgnJson = await getIgn.json();
      if (getIgnJson.code == 200) {
         return {
            code: 200,
            status: true,
            message: 'ID Berhasil Ditemukan',
            data: {
               user_id: id,
               username: getIgnJson.data.username,
               zone: zone,
               game: game.name,
            },
         };
      }

      return {
         code: 404,
         status: false,
         message: 'ID Tidak ditemukan',
      };
   } catch (error) {
      console.log(error.message);
      return {
         code: 500,
         status: false,
         message: 'Internal Server Error',
      };
   }
};

module.exports = gamekuServices;

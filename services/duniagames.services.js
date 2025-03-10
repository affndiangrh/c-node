const fetch = require('node-fetch');

const duniaGamesServices = async (game, id = null, zone = null) => {
   let payload = {
      productId: game.id,
      itemId: game.itemId,
      catalogId: game.catalogId,
      paymentId: game.paymentChannel,
      gameId: id,
      zoneId: zone || null,
      product_ref: game.product_ref,
      product_ref_denom: game.product_ref_denom,
   };

   const getUsernameGame = await fetch('https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },

      body: JSON.stringify(payload),
   });

   try {
      const data = await getUsernameGame.json();
      if (data.status.code == 0) {
         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: data.data?.gameDetail?.userName,
               user_id: id,
               zone: zone || null,
            },
         };
      } else {
         return { code: 404, status: false, message: data.status?.message || 'ID Tidak ditemukan' };
      }
   } catch (err) {
      return { code: 500, status: false, message: 'Internal Server Error' };
   }
};

module.exports = duniaGamesServices;

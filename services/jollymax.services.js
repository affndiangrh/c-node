const fetch = require('node-fetch');

const jollymaxServices = async (game, id = null, zone = null) => {
   const checkServerName = game?.dropdown?.find((x) => x.id == id);
   const payload = {
      token: 'b1cef8b7d21b44ac91e978bc3be0afbb',
      jmsId: '',
      appId: game.appId,
      roleName: '',
      country: 'id',
      language: 'id',
      appAlias: game.appAlias,
      platformName: '',
      serverId: zone || '',
      goodsId: game.goodsId,
      payTypeId: game?.payTypeId || 441390,
      userId: id,
      activityId: '',
      serverName: checkServerName?.name || '',
      domain: 'www.jollymax.com',
   };

   const checkJolly = await fetch(`https://topup-center.shoplay365.com/shareit-topup-center/order/check-uid`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
   });

   try {
      const checkJollyJson = await checkJolly.json();
      // console.log(checkJollyJson);

      if (checkJollyJson.code == '200' && checkJollyJson.data.isValid == 1) {
         return {
            code: 200,
            status: true,
            message: 'ID Berhasil Ditemukan',
            data: { user_id: id, username: checkJollyJson.data?.nickName || '', zone: zone || '' },
         };
      } else if (checkJollyJson.code == '200' && checkJollyJson.data.isValid == 1) {
         return { code: 200, status: true, message: 'Silahkan coba lagi' };
      } else {
         return { code: 404, status: false, message: 'ID Tidak ditemukan' };
      }
   } catch (e) {
      return { code: 500, status: false, message: 'Error Server' };
   }
};

module.exports = jollymaxServices;

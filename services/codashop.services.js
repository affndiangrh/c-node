const crypto = require('crypto');
const fetch = require('node-fetch');
const formatedDate = require('../utils/formatedDate.js');

const codashopServices = async (game, id, zone) => {
   let dataBody;

   dataBody = `voucherPricePoint.id=${game.priceId}&voucherPricePoint.price=${
      game.price
   }&voucherPricePoint.variablePrice=0&n=${formatedDate()}-206&email=okebagsu426@gmail.com&userVariablePrice=0&order.data.profile=eyJuYW1lIjoiICIsImRhdGVvZmJpcnRoIjoiIiwiaWRfbm8iOiIifQ%3D%3D&user.userId=${id}&user.zoneId=${
      zone || ''
   }&msisdn=081123123123&voucherTypeName=${game.voucherTypeName}&voucherTypeId=${game.voucherTypeId}&gvtId=${
      game.gvtId
   }&shopLang=id_ID&checkoutId=${crypto.randomUUID()}&affiliateTrackingId=&impactClickId=3NhRLCwl:xyNRNtT6ryOjXyTUkAyLjRfFSnCU80&anonymousId=${crypto.randomUUID()}&fullUrl=${
      'https://www.codashop.com/id-id/' + game.slug
   }&userSessionId=${crypto.randomUUID()}&userEmailConsent=false&userMobileConsent=false&verifiedMsisdn=&promoId=&promoCode=&clevertapId=49bec2319150449bb397c95acb9aaa02`;

   const getUsernameGame = await fetch('https://order-sg.codashop.com/initPayment.action', {
      method: 'POST',
      headers: {
         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
         'user-agent':
            'Mozilla/5.0 Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
         'x-session-country2name': 'ID',
         'x-session-key': '',
         'x-xsrf-token': null,
      },
      body: dataBody,
   });

   try {
      const getUsernameGameResponse = await getUsernameGame.json();
      // console.log('getUsernameGameResponse', getUsernameGameResponse);
      // console.log('getUsernameGameResponse', getUsernameGameResponse?.confirmationFields?.roles);
      if (getUsernameGameResponse.RESULT_CODE && getUsernameGameResponse.RESULT_CODE == 10001)
         return { code: 400, status: false, message: 'Silahkan Coba 5 detik lagi' };
      if (getUsernameGameResponse.success) {
         if (getUsernameGameResponse.result == '') return { code: 404, status: false, message: 'ID tidak ditemukan' };
         const result = decodeURIComponent(getUsernameGameResponse.result) || {};
         const newResult = JSON.parse(result) || {};

         const username =
            newResult?.username ||
            getUsernameGameResponse?.confirmationFields?.playerName ||
            getUsernameGameResponse?.confirmationFields?.roles[0]?.role ||
            null;

         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: decodeURI(username),
               user_id: id,
               zone: zone || null,
            },
         };
      }

      return { code: 200, status: false, message: getUsernameGameResponse.errorMsg || 'Hubungi Admin' };
   } catch (err) {
      console.log(err);
      return { code: 500, status: false, message: 'Internal Server Error' };
   }
};

module.exports = codashopServices;

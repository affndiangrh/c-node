const fetch = require('node-fetch');

const mobapayService = async (game, id = null, zone = null) => {
   const checkMobapay = await fetch(
      `https://api.mobapay.com/api/app_shop?app_id=100000&user_id=${id}&server_id=${zone}&country=ID&language=en&network=&net=&coupon_id=&shop_id=`,
      {
         method: 'GET',
         headers: {
            'User-Agent':
               'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            dnt: '1',
            'x-token': '',
            'sec-ch-ua-mobile': '?0',
            'x-request-start': '1722650545561',
            'x-lang': 'en',
            'sec-ch-ua-platform': '"Windows"',
            origin: 'https://www.mobapay.com',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            referer: 'https://www.mobapay.com/',
            'accept-language': 'en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7',
            priority: 'u=1, i',
         },
      }
   );
   try {
      const checkMobapayJson = await checkMobapay.json();

      //   console.log(checkMobapayJson);

      if (checkMobapayJson.code == 0 && checkMobapayJson.data.user_info.code == 0) {
         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: checkMobapayJson.data.user_info.user_name,
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

module.exports = mobapayService;

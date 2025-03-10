const axios = require('axios');
const cheerio = require('cheerio');

const gempayService = async (game, id = null, zone = null) => {
   try {
      // Permintaan pertama
      const a = await axios.get('https://gempaytopup.com/stalk-ml');

      // Parsing HTML untuk mengambil CSRF token
      const $ = cheerio.load(a.data);
      const csrfToken = $('meta[name="csrf-token"]').attr('content');
      if (!csrfToken) {
         throw new Error('CSRF token tidak ditemukan dalam HTML respons');
      }

      // Ambil cookie dari header `set-cookie`
      const cookies = a.headers['set-cookie'];
      if (!cookies) {
         throw new Error('Cookie tidak ditemukan dalam respons header');
      }
      const cookieHeader = cookies.join('; ');

      // Permintaan kedua
      const cekRegion = await axios.post(
         'https://gempaytopup.com/stalk-ml',
         { uid: id, zone: zone },
         {
            withCredentials: true,
            headers: {
               'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
               'Accept-Encoding': 'gzip, deflate, br, zstd',
               'Content-Type': 'application/json',
               'sec-ch-ua-platform': '"Windows"',
               'x-csrf-token': csrfToken, // CSRF token dari meta tag
               'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
               dnt: '1',
               'sec-ch-ua-mobile': '?0',
               origin: 'https://gempaytopup.com',
               'sec-fetch-site': 'same-origin',
               'sec-fetch-mode': 'cors',
               'sec-fetch-dest': 'empty',
               referer:
                  'https://gempaytopup.com/stalk-ml?fbclid=IwZXh0bgNhZW0CMTAAAR2a2RR82Sh7AgtqYJwovpYHmmbEB5oYoqQ6_NOH2nNapI_3MjXOko4Np9Q_aem_5EsTUWbt2oMpGJm3WayIHg',
               'accept-language': 'en-US,en;q=0.9,id;q=0.8,ja;q=0.7',
               priority: 'u=1, i',
               Cookie: cookieHeader, // Cookie dari respons pertama
            },
         }
      );

      if (cekRegion.data.success) {
         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: cekRegion.data.username,
               user_id: id,
               zone: zone || null,
               region: cekRegion.data.region,
            },
         };
      } else {
         return { code: 404, status: false, message: cekRegion.data.message || 'ID tidak ditemukan' };
      }
   } catch (err) {
      console.error(err);
      return { code: 500, status: false, message: 'Internal Server Error' };
   }
};

module.exports = gempayService;

const fetch = require('node-fetch');

const au2mobile2Service = async (game, id = null, zone = null) => {
   const cekAu = await fetch(`https://danceclub.uniugame.com/api/role/info?roleId=${id}`);
   try {
      const cekAuResponse = await cekAu.json();
      if (cekAuResponse.code == 0) {
         return {
            code: 200,
            status: true,
            message: 'ID berhasil ditemukan',
            data: {
               username: cekAuResponse.data?.rolename,
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

module.exports = au2mobile2Service;

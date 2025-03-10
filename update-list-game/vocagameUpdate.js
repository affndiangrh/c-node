const slugify = require('slugify');
const fs = require('fs');

(async () => {
   try {
      const getAllGames = await fetch('https://api.vocagame.com/v1/product');

      const _games = await getAllGames.json();
      const games = _games.filter((item) => item.code !== 'NOVERIFY');

      const data = [];
      let incId = 8881;

      games.forEach((item) => {
         data.push({
            id: 8881,
            name: item.title + ' (Work Fast)',
            slug: slugify(item.title + '-vc' || 'test' + incId, {
               remove: /[*+~.()'"!:@]/g,
               lower: true,
            }),
            vocaSlug: item.slug,
            code: item.code,
            provider: 'vocagame',
            isZone: false,
            dropdown: [],
         });

         incId++;
      });

      const getZoneFromVoca = async () => {
         for (let i = 0; i < data.length; i++) {
            const getZone = await fetch(
               `https://vocagame.com/_next/data/hdEUKtcjX_Fa3pwWvyUEf/${data[i].vocaSlug}.json?slug=${data[i].vocaSlug}`,
               {
                  headers: {
                     'x-nextjs-data': 1,
                  },
               }
            );
            const getZoneJson = await getZone.json();

            console.log(data[i].name);

            const inputs = getZoneJson.pageProps.product.userInput.fields;
            const indexZone = inputs.findIndex((item) => item.attrs.name === 'zoneId');

            if (indexZone !== -1) {
               data[i].isZone = true;
               if (inputs[indexZone].tag == 'dropdown') {
                  const dropdown = JSON.parse(inputs[indexZone].attrs.datas).map((item) => {
                     return {
                        zoneId: item.value,
                        name: item.text,
                     };
                  });

                  data[i].dropdown = dropdown;
               }
            }
         }
      };

      await getZoneFromVoca();

      fs.writeFile('./utils/data/vocagame.json', JSON.stringify({ data }, null, 2), 'utf8', function (err) {
         if (err) {
            console.log('An error occured while writing JSON Object to File.');
            return console.log(err);
         }

         console.log('JSON file has been saved.');
      });
   } catch (error) {
      console.log(error);
   }
})();

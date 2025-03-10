const { dataGame } = require('../utils/data');
const fs = require('fs');
const _ = require('lodash');

const newDataGame = dataGame.map((item) => {
   return {
      name: item.name,
      slug: item.slug,
      endpoint: `/api/game/${item.slug}`,
      query: `?id=xxxx${item.isZone ? '&zone=xxx' : ''}`,
      hasZoneId: item.isZone ? true : false,
      listZoneId: item.dropdown ? `/api/game/get-zone/${item.slug}` : null,
   };
});

const sortedDataGame = _.orderBy(newDataGame, ['name'], ['asc']);

console.log(dataGame.length);

let items = [];

sortedDataGame.forEach((item) => {
   items.push({
      name: item.name,
      request: {
         method: 'GET',
         header: [],
         url: {
            raw: `http://localhost:3000${item.endpoint}${item.query}`,
            protocol: 'https',
            host: ['localhost:3000'],
            path: ['api', 'game', `${item.slug}`],
            query: [
               {
                  key: 'id',
                  value: 'xxx',
               },
               ...(item.hasZoneId
                  ? [
                       {
                          key: 'zone',
                          value: 'xxx',
                       },
                    ]
                  : []),
            ],
         },
      },
      response: [],
   });

   console.log(item.name + '\n');
});

fs.writeFileSync(
   'test/collections.json',
   JSON.stringify(
      {
         info: {
            name: 'Cek ID Game Spesial',
            _postman_id: 'b1a4e3a0-8b9e-4b9e-8b9e-4b9e8b9e4b9e',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
         },
         item: items,
      },
      null,
      3
   )
);

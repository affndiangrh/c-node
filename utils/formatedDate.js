const formatedDate = () => {
   const date = new Date();
   const month = date.getMonth() + 1;
   const day = date.getDate();
   const year = date.getFullYear();

   const formattedDate = `${month}/${day}/${year}`;

   return formattedDate;
};

module.exports = formatedDate;

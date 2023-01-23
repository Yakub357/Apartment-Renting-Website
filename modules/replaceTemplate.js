// ** Creating a useful function, which replaces given html content with el element
module.exports = (temp, apartment) => {
  let output = temp.replace(/{%PRICE%}/g, apartment.price);
  output = output.replace(/{%IMAGE_URL%}/g, apartment.imageURL);
  output = output.replace(/{%TITLE%}/g, apartment.title);
  output = output.replace(/{%ADDRESS%}/g, apartment.address);
  output = output.replace(/{%SQUARE%}/g, apartment.square);
  output = output.replace(/{%ROOMS%}/g, apartment.rooms);
  output = output.replace(/{%FLOOR%}/g, apartment.floor);
  output = output.replace(/{%DESCRIPTION%}/g, apartment.desc);
  output = output.replace(/{%DATE%}/g, apartment.date);
  output = output.replace(/{%OWNER%}/g, apartment.owner);
  output = output.replace(/{%ID%}/g, apartment.id);

  return output;
};

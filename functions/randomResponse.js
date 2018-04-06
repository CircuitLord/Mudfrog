const json = require("json-file")
const randomResponse = json.read("./functions/randomResponse.json")

exports.run = (responseType) => {

  var responseArray = randomResponse.get(responseType.toString());

  var response = responseArray[Math.floor(Math.random() * responseArray.length)];

  //var userMention = ("<@" + message.author.id + ">")



  return response;













}

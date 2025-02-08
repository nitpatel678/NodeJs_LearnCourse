const mongoose = require("mongoose");

async function conncectionMongodb(url) {
   return mongoose
    .connect(url)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log("Error while connecting", err));

}

module.exports={
    conncectionMongodb
}
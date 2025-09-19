// core module
const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtil')

const favouriteFilePath = path.join(rootDir, 'data', 'favourite.json')

module.exports = class Favourite {
    static addToFavourite(homeId, callback) {
        Favourite.getFavourites(favourites => {
            if(favourites.includes(homeId)){
                callback("Home is already marked favourite")
            }
            else{
                favourites.push(homeId);
                fs.writeFile(favouriteFilePath, JSON.stringify(favourites), callback)
            }
        })
    }

    static getFavourites(callback) {
        fs.readFile(favouriteFilePath, (err, data) => {
            callback(!err ? JSON.parse(data) : [])
        })
    }

    static deleteById(delHomeId, callback){
        Favourite.getFavourites(homeIds => {
            homeIds = homeIds.filter(homeId => delHomeId !== homeId)
            const filePath = path.join(rootDir, 'data', 'favourite.json')
            fs.writeFile(filePath, JSON.stringify(homeIds), callback);
        })
    }
}
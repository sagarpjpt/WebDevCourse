// core module
const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtil')
const Favourite = require('./favourite');


module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl) {
        this.houseName = houseName;
        this.price = price;
        this.location = location
        this.rating = rating
        this.photoUrl = photoUrl
    }

    save() {
        Home.fetchAll( (registeredHomes) => {
            if(this.id) { // edit home case
                registeredHomes = registeredHomes.map(home => {
                    return home.id === this.id ? this : home;
                })
            } else { // add home case
                this.id = Math.random().toString()
                registeredHomes.push(this)
            }
            const filePath = path.join(rootDir, 'data', 'homes.json')
            fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
                console.log(err)
            })
        })
    }

    static fetchAll(callback) {
        const filePath = path.join(rootDir, 'data', 'homes.json')
        fs.readFile(filePath, (err, data) => {
            callback(!err ? JSON.parse(data) : [])
        })
    }

    static findById(homeId, callback) {
        Home.fetchAll(homes => {
            const homeFound = homes.find(home => home.id === homeId)
            callback(homeFound)
        })
    }

    static deleteById(homeId, callback){
        this.fetchAll(homes => {
            homes = homes.filter(home => home.id !== homeId)
            const filePath = path.join(rootDir, 'data', 'homes.json')
            fs.writeFile(filePath, JSON.stringify(homes), error => {
                Favourite.deleteById(homeId, callback);
            });
        })
    }
}
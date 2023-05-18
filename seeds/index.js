const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const databaseName = 'yelp-camp'

mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});


const sample = array => array[Math.floor(Math.random() * array.length )]

const timer = ms => new Promise(res => setTimeout(res, ms));

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dolorem ipsa enim consequatur necessitatibus obcaecati? Nam, voluptatibus? Veritatis odit commodi sint. Vero iure quod enim! Commodi libero quaerat exercitationem voluptatum.',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

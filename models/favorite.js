const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the favorite schema
const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Field type is ObjectId
        ref: 'User', // Reference to the User model
    },
    campsites: [
        {
            type: mongoose.Schema.Types.ObjectId, // Field type is ObjectId
            ref: 'Campsite', // Reference to the Campsite model
        },
    ],
});

// Create the Favorite model using the favoriteSchema
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite; // Export the Favorite model

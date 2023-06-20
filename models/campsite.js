// Import mongoose module
const mongoose = require('mongoose');
// Get the Schema constructor from mongoose
const Schema = mongoose.Schema;

// Import and initialize mongoose-currency to handle currency fields
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Define a new schema for comments
const commentSchema = new Schema(
    {
        rating: { type: Number, min: 1, max: 5, required: true },
        text: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Define a new schema for campsites
const campsiteSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        elevation: { type: Number, required: true },
        cost: { type: Currency, required: true, min: 0 },
        featured: { type: Boolean, default: false },
        comments: [commentSchema], // An array of commentSchema, indicating a campsite can have multiple comments
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create a Campsite model using campsiteSchema
const Campsite = mongoose.model('Campsite', campsiteSchema);

// Export the Campsite model
module.exports = Campsite;

// Importing the 'cors' module to handle Cross-Origin Resource Sharing.
const cors = require('cors');

// Define an array of whitelisted origins for CORS.
const whitelist = ['http://localhost:3000', 'https://localhost:3443'];

// Define a function to configure CORS options.
// This function is intended to be used as a delegate (or a callback) in the cors module.
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    // Log the origin of the request
    console.log(req.header('Origin'));

    // If the origin of the request is found in the whitelist,
    // set the 'origin' option for cors to true (allow the request)
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        // If the origin of the request is not found in the whitelist,
        // set the 'origin' option for cors to false (deny the request)
        corsOptions = { origin: false };
    }
    // Return the cors options by invoking the callback function
    callback(null, corsOptions);
};

// Export the cors module's middleware function with default configuration.
exports.cors = cors();

// Export the cors module's middleware function with custom configuration (defined by corsOptionsDelegate).
exports.corsWithOptions = cors(corsOptionsDelegate);

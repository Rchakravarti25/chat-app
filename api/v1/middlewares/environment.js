module.exports = {
    "development": {
        "MONGO_URI": "mongodb://localhost/test",
        "MONGO_OPTIONS": { "db": { "safe": true } }
    },
    "production": {
        "MONGO_URI": "mongodb://localhost/production",
        "MONGO_OPTIONS": { "db": { "safe": true } }
    }
}
//var config = require('./env.json')[process.env.NODE_ENV || 'development'];

require('dotenv').config();

const optionalConfig = {
    PORT: process.env.PORT||3000,
    NODE_ENV :process.env.NODE_ENV || 'dev'
};

const requireConfig =  {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,

};
for (const key in requireConfig) {
    if (!requireConfig[key]) { // Check if the value is null or undefined
        throw new Error(`Missing value for ${key}`);
    }
}

module.exports = {
    ...optionalConfig,
    ...requireConfig,
}

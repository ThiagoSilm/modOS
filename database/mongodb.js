const mongoose = require('mongoose');

module.exports = {
  init: () => {
    const dbOptions = {
      useUnifiedTopoLogy: false,
      useNewUrlParser: true
    };

    mongoose.connect('mongodb+srv://okumura0:8sbpiyusgkfbvG7z@okumura.3da9s.mongodb.net/database?retryWrites=true&w=majority', dbOptions);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
      console.log('Mongoose has successfully connected!');
    });

    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection error: \n${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose connection lost');
    });
  }
}
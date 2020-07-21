const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodemy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
 
const accountSchema = new Schema({
  username: String,
  password: String,
},{
    collection: 'accounts'
});

const AccountModel = mongoose.model('accounts', accountSchema)

module.exports = AccountModel
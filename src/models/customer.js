const db = require('../database/index')
require('dotenv').config()

const CustomerSchema = new db.Schema({
  name: String,
  about: String,
  skill: [{
    curse: String,
    level: String
  }],
  url: [{
    type: String
  }],
  key: String
})

CustomerSchema.pre('save', function () {
  if (this.key) {
    if (!this.url) {
      this.url = `${process.env.APP_URL}/files/${this.key}`
    }
  }
})

const Customer = db.model('Customer', CustomerSchema)
module.exports = Customer

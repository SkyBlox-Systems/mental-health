
const mongoose = require('mongoose')

const TicketClaimMain = mongoose.Schema({
  id: String,
  TicketIDs: String,
  ChannelID: String,
  Topic: String,
  Time: String,
  Email: String,
  AddedUser: Array,
  ClaimUserID: String
})

module.exports = mongoose.model('TicketClaim',  TicketClaimMain)
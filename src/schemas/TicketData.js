
const mongoose = require('mongoose')

const TicketData = mongoose.Schema({
  BotOwner: String,
  SupportServer: String,
  TicketClaimID: String,
  TicketLogsID: String,
  TranscriptsLogsID: String,
  OpenTickets: String,
  ClosedTickets: String,
  AmountTickets: String,
})

module.exports = mongoose.model('Data',  TicketData)
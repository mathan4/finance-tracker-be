const mongoose= require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
      transactionAmount: {
            type: Number,
            required: true,
          },
          transactionDescription: {
            type: String,
            required: true,
          },
          transactionDate: {
            type: Date,
            required: true,
          }
    },
    {
        collection : 'transactions'
    }
)

module.exports =mongoose.model('transaction',transactionSchema)
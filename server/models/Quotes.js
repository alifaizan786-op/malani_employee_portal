const {Schema, model} = require('mongoose');

const quotesSchema = new Schema({
    quotes:{
        type:String,
        require:true,
    },
    color:{
        type:String,
        require:true
    }
})

const Quotes = model('quotes',quotesSchema);

module.exports = Quotes;

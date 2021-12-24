const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agendasSchema = new Schema({
	name: String,
	work: String,
	email: String,
	phone: String,
	emailUser: String
}, {
	collection: 'agenda'
})

// Crear modelo
module.exports = mongoose.model('Agenda', agendasSchema);

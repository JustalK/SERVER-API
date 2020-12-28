const mongoose = require('mongoose');
const path = require('path');
const filename = path.basename(__filename, '.js');

const schema = new mongoose.Schema({
	question: {
		type: String,
		trim: true,
		require: true
	},
	level: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'level'
	},
	types: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'type'
	}]
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	},
	collection: filename,
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
});

module.exports = mongoose.model(filename, schema);

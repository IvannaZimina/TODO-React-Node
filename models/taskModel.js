const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    title:        { type: Schema.Types.String, require: true },
    description:  { type: Schema.Types.String, require: true },
    statusDone:   { type: Schema.Types.Boolean, default: false },
    priority:     [{ type: Schema.Types.String, enum: ['high', 'middle', 'low'] }],
    statusActive: [{ type: Schema.Types.String, enum: ['active', 'archive', 'delete'] }]
}, { timestamps: true });

taskSchema.plugin(require('mongoose-beautiful-unique-validation'));

const model = mongoose.model('task', taskSchema);
module.exports = model;
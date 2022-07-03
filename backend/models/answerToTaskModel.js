const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerToTaskSchema = new Schema({
    description:  {  type: Schema.Types.String, require: true },
    statusDone:   {  type: Schema.Types.Boolean, default: false },
    dateCreateAt: {  type: Schema.Types.Date, require: true },
    dateDoneTo:   {  type: Schema.Types.Date, require: true },
    files:        [{ type: Schema.Types.String, default: '' }]

}, { timestamps: true });

answerToTaskSchema.plugin(require('mongoose-beautiful-unique-validation'));

const model = mongoose.model('answerToTask', answerToTaskSchema);
module.exports = model;
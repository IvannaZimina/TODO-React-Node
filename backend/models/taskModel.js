const mongoose = require('mongoose');

const { Schema } = mongoose;
require('./answerToTaskModel')

const taskSchema = new Schema({
    title:        {  type: Schema.Types.String, require: true },
    description:  {  type: Schema.Types.String, require: true },
    statusDone:   {  type: Schema.Types.Boolean, default: false },
    priority:     [{ type: Schema.Types.String, enum: ['высокий', 'средний', 'низкий'] }],
    performer:    {  type: Schema.Types.String, require: true },
    dateCreateAt: {  type: Schema.Types.Date, require: true },
    dateDoneTo:   {  type: Schema.Types.Date, require: true },
    answers:      [{ type: Schema.Types.ObjectId, ref: 'answer'}],
    files:        [{ type: Schema.Types.String, default: '' }]

}, { timestamps: true });

taskSchema.plugin(require('mongoose-beautiful-unique-validation'));

const model = mongoose.model('task', taskSchema);
module.exports = model;
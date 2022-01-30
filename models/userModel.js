const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;
require('./taskModel');

const userSchema = new Schema({
    login:    { type: Schema.Types.String, unique: true },
    hashPwd:  { type: Schema.Types.String, require: true },
    email:    { type: Schema.Types.String, unique: true },
    role:     { type: Schema.Types.String },
    avatar:   { type: Schema.Types.String, default: '' },
    userName: { type: Schema.Types.String, default: '' },
    tasks:    [{ type: Schema.Types.ObjectId, ref: 'task' }]
}, { timestamps: true });

userSchema.plugin(require('mongoose-beautiful-unique-validation'));

const hashingPwd = (pwdUser) => {
    const data = new TextEncoder().encode(pwdUser);
    const result = crypto.createHash('sha256').update(data).digest('hex');
    return result;
};

userSchema.virtual('pwdUser')
    .set( function(val) {
        const hash = hashingPwd(val);
        this.hashPwd = hash;
    });

userSchema.methods.checkPwd = function(pwdUser) {
    const hash = hashingPwd(pwdUser);
    const check = hash === this.hashPwd;
    return check;
};

const model = mongoose.model('user', userSchema);
module.exports = model;
const Ajv = require('ajv');
const ajv = new Ajv();

const validateMv = (schema) => (req, cb, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    console.log('valid', valid);

    if (valid) {
        next();
        return;
    }

    console.log(validate.errors);
    cb({status: 'invalid data', payliad: validate.errors});
};

module.exports = validateMv;
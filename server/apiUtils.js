const APIError = require('./apiError');

module.exports.getQueryParam = (cxt, key, transform = value => value) => {
    let value = cxt.query[key];
    if (!value || !value.length) {
        throw new APIError(`'${key}' query parameter is required.`, 400);
    }
    try {
        value = transform(value);
    } catch (error) {
        throw new APIError(`'${key}' query parameter value is invalid.`, 400);
    }
    return value;
};

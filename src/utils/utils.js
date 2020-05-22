module.exports = function parseStringAsArray(arrayAsStrings) {
    return arrayAsStrings.split(',').map(arrayAsString => arrayAsString.trim());    
};
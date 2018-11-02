const { readdir } = require('fs'); 
const def = require('./langs/english.json');

/**
 * Ensures that all property names of obj1 exists in obj2.
 * Doesn't compare values. Exept if it is an object, then it check for property names again
 *
 * @param {Object} obj1 - Default config
 * @param {Object} obj2 - Custom config (Config to compare with)
 * @returns {Boolean} true: obj2 has at least all prop of obj1
 * @memberof Utils
 */
function compareObject(obj1, obj2) {
    for (const key in obj1) {
        if (obj2[key] === undefined) {
            return false;
        }
        if (typeof obj1[key] === 'object' && !(obj1[key] instanceof Array)) {
            if (!this.compareObject(obj1[key], obj2[key])) {
                return false;
            }
        }
    }
    return true;
};

readdir('./langs', (err, files) => {
    if (err) {
        console.log('Error reading');
        throw err;
    } else {
        files.forEach((file) => {
            const f = require('./langs/' + file);
            if (!compareObject(def, f)) {
                console.log(`The file: ${file} doesn't contains all correct fields!`);
                throw new Error(`Invalid fields: ${file}`);
            }
        });
        console.log('All files are valid!');
    }
});

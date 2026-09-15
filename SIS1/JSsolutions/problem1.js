/**
 * @return {null|boolean|number|string|Array|Object}
 */

Array.prototype.last = function() {
    return this.length === 0 ? -1 : this[this.length - 1]
};

const arr = [1, 2, 3];
console.log(arr.last());

const arr1 = [0, false, null];
console.log(arr1.last());
 
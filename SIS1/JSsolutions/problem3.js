/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */

var filter = function(arr, fn) {
    const fArr = [];
    for (let i = 0; i < arr.length; i++){
        if (fn(arr[i], i)) {
            fArr.push(arr[i]);
        }
    }
    return fArr;
};

function greaterThan10(n) { 
    return n > 10; 
}
console.log(filter([0, 10, 20, 30], greaterThan10)); 
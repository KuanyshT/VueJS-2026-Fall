/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function(rowsCount, colsCount) {
    if (rowsCount * colsCount !== this.length) return [];

    const result = Array.from({ length: rowsCount }, () => new Array(colsCount));

    let index = 0;
    for (let col = 0; col < colsCount; col++) {
        if (col % 2 === 0) {
            // top to bottom
            for (let row = 0; row < rowsCount; row++) {
                result[row][col] = this[index++];
            }
        } else {
            // bottom to top
            for (let row = rowsCount - 1; row >= 0; row--) {
                result[row][col] = this[index++];
            }
        }
    }

    return result;
};


const arr = [1,2,3,4];
console.log(arr.snail(2,2)); // [[1,2,3,4]]
const arr1 = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15];
console.log(arr1.snail(5,4)); 
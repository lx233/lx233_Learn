function flat1(arr) {
    return arr.toString().split(',').map(i => parseInt(i));
}
function flat2(arr, newArr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            flat2(arr[i], newArr) // 展开的是arr【i】
        } else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
function flat3(arr) {
    return arr.flat(Infinity)
}
let arr = [1, 2, 3, [4, 5], 6, 7, [7]]
console.log(flat3(arr))
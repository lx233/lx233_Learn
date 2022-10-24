// map  提交
let map = new Map();
map.set(1, 2);
// 实际上用of时访问的时候，是完全一样的
for (let [k, v] of map) {
    console.log(k, v)
}
for (let [k, v] of map.entries()) {
    console.log(k, v)
}

// array 推荐of
let arr = [1, 3, 4]
for (i in arr) { // key 
    console.log(i)
}
for (i of arr) { // value 
    console.log(i)
}

// obj  推荐for in ，要加原型链的判断 hasOwnProperty
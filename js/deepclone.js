// 深拷贝  ⭐⭐⭐
let a = {
    b: {
        c: 0,
    },
    d: [1, 2, [3]],
    e: {
        c: [1, 2, [3]],
    }
}
// 普通拷贝，完全改掉 ----------- 
// let a1 = a;
// a1.d = '1'
// console.log(a);
// 浅拷贝, 第一层改掉 -----------
// let a2 = Object.assign({}, a)
// a2.d = '2';
// a2.b.c = '2'
// console.log(a)

// 深拷贝
a.b.c = a
let a3 = deepCopy(a) // a3,以这一版结果为准

console.log(a, a3)


// console.log(JSON.stringify(a), a3, JSON.stringify(a4))
// prototype & hasOwnproperty 
// deepclone + 循环引用 
function deepCopy(object, w = new WeakMap()) {
    if (!object || typeof object !== "object") return object;
    if (!w.has(object)) {
        w.set(object, 1);
    }
    let newObject = Array.isArray(object) ? [] : {};
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (typeof object[key] === "object") {
                if (!w.has(object[key])) {
                    w.set(object[key], 1);
                } else {
                    object[key] == null;
                    return;
                }
                newObject[key] = deepCopy(object[key], w)
            } else {
                newObject[key] = object[key];
            }
        }
    }
    return newObject;
}
// 错误示例
// a4解决数组有些问题，算是个错误示范了
// let a4 = deepClone(a)
// a4.e.c[2] = [1]
// function deepClone(obj) {
//     if (!obj || typeof obj != 'object') return;
//     let newObj = {}
//     for (let key in obj) { // for in实际上是取到key 
//         console.log(key, 'item')
//         if (Array.isArray(obj[key])) {
//             newObj[key] = [...obj[key]]
//             // 误区： 这里依然是浅拷贝，不能这样用，反面教材！！！
//             // let cc=[1,2,[3]]   /// let cc= [{obj:{obj:1{}}}]
//             // cc[2]={aaa:{aaaa:1}}
//             // let aa=[...cc]
//             // dd[2].aaa='qwq'
//         } else if (typeof obj[key] === 'object') {
//             newObj[key] = deepClone(obj[key])
//         } else {
//             newObj[key] = obj[key]
//         }
//     }
//     return newObj;
// }


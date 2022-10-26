// a instanceof Object 是运算符，写函数是模拟这个操作
function myInstanceof1(left, right) {
    if (!left) return false;
    left = left.__proto__;  // = Object.getPrototypeOf(proto);  [[prototype]]
    right = right.prototype;
    while (left) {
        if (left != right) {
            left = left.__proto__;
        } else {
            return true;
        }
    }
    return false;
}

function myInstanceof2(left, right) {
    let proto = Object.getPrototypeOf(left), // 获取对象的原型
        prototype = right.prototype; // 获取构造函数的 prototype 对象
    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

let arr = [1, 2, 3]
console.log(myInstanceof1(arr, String))
console.log(myInstanceof1(arr, Object))
console.log(myInstanceof2(arr, String))
console.log(myInstanceof2(arr, Object))

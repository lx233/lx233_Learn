// 先复习下reduce用法
let arr = [1, 9]// 字面量数组
// 默认对数组的值进行函数操作，如果传入第二个参数，第二个参数作为初始值。（否则第一个为初始值，直接进行第二部操作）
// 顺序是prev，cur 没错，然后=> 内可以只写返回值。
let sum1 = arr.reduce((prev, cur) => cur + prev * 2);
let sum2 = arr.reduce((prev, cur) => cur * 2 + prev, 10000);
console.log(sum1, sum2)

// 自己手写实现
// let fn = Array.prototype.shift(arguments);// 参数没有那么麻烦，只有1参数或2参数两种可能，不用这样
// function.call(obj), 所以this应该是代指的obj，也就是arr的部分
function myReduce(fn, initValue) {
    let arr = Object(this);// 获取context
    let res = initValue || arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (i == 0 && !initValue) { // 无初始值，照理从第二个开始计算
            continue;
        }
        res = fn(res, arr[i], i, arr)
    }
    return res;
}
// 完善 
function MyReduce(fun, initValue) {
    if (this === null) {
        // this 不存在，抛出错误
        throw new TypeError('Array.prototype.reduce ' +
            'called on null or undefined');
    }
    if (typeof fun !== 'function') {
        // fun 不是function时，抛出错误
        throw new TypeError(fun +
            ' is not a function');
    }
    const value = Object(this);
    let preValue, curValue, curIndex;
    if (initValue !== undefined) {
        preValue = initValue;
        curValue = arr[0];
        curIndex = 0;
    } else {
        preValue = arr[0];
        curValue = arr[1];
        curIndex = 1
    }
    for (let i = curIndex; i < value.length; i++) {
        const item = value[i];
        preValue = fun(preValue, item, i, arr);
    }
    return preValue;
}

function setReduce(preValue, curValue, index, arr) {
    return `${preValue} - ${curValue}`;
}
// 把方法写入到原型链上
Array.prototype.MyReduce = MyReduce;
Array.prototype.myReduce = myReduce;


let sum11 = arr.myReduce((prev, cur) => cur + prev * 2);
let sum12 = arr.myReduce((prev, cur) => cur * 2 + prev, 10000);
console.log('自己手写结果', sum11, sum12)


let sum111 = arr.MyReduce((prev, cur) => cur + prev * 2);
let sum112 = arr.MyReduce((prev, cur) => cur * 2 + prev, 10000);
console.log('规范一点的手写结果', sum111, sum112)
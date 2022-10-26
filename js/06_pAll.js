// promise race, all ,some
// 先写all吧：需要返回结果

// 1) 核⼼思路
// 1. 接收⼀个 Promise 实例的数组或具有 Iterator 接⼝的对象作为参数
// 2. 这个⽅法返回⼀个新的 promise 对象，
// 3. 遍历传⼊的参数，⽤Promise.resolve()将参数"包⼀层"，使其变成⼀个promise对象
// 4. 参数所有回调成功才是成功，返回值数组与参数顺序⼀致
// 5. 参数数组其中⼀个失败，则触发失败状态，第⼀个触发失败的 Promise 错误信息作为 Promise.all
// 的错误信息。
// 2）实现代码
// ⼀般来说，Promise.all ⽤来处理多个并发请求，也是为了⻚⾯数据构造的⽅便，将⼀个⻚⾯所⽤到的在
// 不同接⼝的数据⼀起请求过来，不过，如果其中⼀个接⼝失败了，多个请求也就失败了，⻚⾯可能啥也
// 出不来，这就看当前⻚⾯的耦合程度了
function myPromiseAll(arr) {
    // 判断arr是否合理
    if (!Array.isArray(arr)) {
        console.log('error')
    }
    let ans = new Array(arr.length)
    let num = 0; // 注意，因为resolve的时间有限制，所以并不是都按顺序的
    return new Promise((resolve, reject) => { // 调用后，返回一个正常的 promise 所以要返回这个
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then((res) => {
                ans[i] = res;
                num++;
                if (num == arr.length) {
                    resolve(ans);
                }
            }).catch((err) => { // 注意， 要走到catch里的才是error，不能用状态判断
                reject(err);
            })
        }
    })
}

function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            throw new TypeError(`argument must be a array`)
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedResult = [];
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(value => {
                resolvedCounter++;
                resolvedResult[i] = value;
                if (resolvedCounter == promiseNum) {
                    return resolve(resolvedResult)
                }
            }, error => {
                return reject(error)
            })
        }
    })
}
// test
let p1 = new Promise(function (resolve, reject) {
    console.log('先执行promise，promise定义new的时候就开始往下执行了')
    setTimeout(function () {
        resolve(1)
    }, 10)
})
console.log('顺序执行')
let p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(2)
    }, 20)
})
let p3 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        // resolve(3)
        reject('qaq')
    }, 30)
})
let arr = [p3, p1, p2, 9];
promiseAll(arr).then(res => {
    console.log(res) // [3, 1, 2]
}).catch((err) => {
    console.log('the err is', err)
})
// Q1 rejected一下试试呢 (ok的)，记得承接，用.catch

// Q2. Promsie.resolve(value) 可以将任何值转成值为 value 状态是 fulfilled 的 Promise，但如果传入的值本身是 Promise 则会原样返回它。
console.log(Promise.resolve(9), 'qwq111')
console.log(Promise.resolve(p3), 'qwq')
Promise.resolve = function (value) {
    // 如果是 Promsie，则直接输出它
    if (value instanceof Promise) {
        return value
    }
    return new Promise(resolve => resolve(value))
}

// Q3.解决数组传入问题
let set = new Set();
set.add(1)
set.add(2)
console.log(Promise.all(set), 'qwq1111112222')
//  typeof arr[Symbol.iterator] === 'function'

// 比较：
// all 返回所有成功的结果，有一个失败直接返回，
// race 返回状态改变了最快的那个promise结果
// any  返回第一个成功的结果
// Promise.allSettled() promise全部完成后，返回所有的结果，无论成功失败
// some 具体实现 如判断是否有num个返回等等。

Promise.myrace = function (args) {
    return new Promise((resolve, reject) => {
        for (let i = 0, len = args.length; i < len; i++) {
            args[i].then(resolve, reject)
        }
    })
}


function myRace(arr) {
    if (typeof arr[Symbol.iterator] != 'function') {
        // error...
    }
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then((res) => {
                // console.log('here???')
                resolve(res);
            }).catch((err) => {
                reject(err)
                // console.log('her33333e???')
            })
        }
    })
}

function myRace2(arr) {
    return new Promise((resolve, reject) => {
        const result = []
        let len = arr.length
        for (let i = 0; i < len; i++) {
            Promise.resolve(arr[i]).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }
    })
}

let p1 = new Promise((res, rej) => {
    console.log('qaq')
    res();
})
let p2 = new Promise((res, rej) => {
    setTimeout(() => {
        rej('reject rejectrejectreject')
    }, 10)
})
myRace([p1, p2]).then((r) => {
    console.log(r, '1')
}).catch((r) => {
    console.log(r, '2')
})
// Promise.race([p1, p2]).then((r) => {
//     console.log(r, '1')
// }).catch((r) => {
//     console.log(r, '2')
// })

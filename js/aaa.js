// 杨昌淑01  20:48
// 请编写一个函数输出，1, 2, 5, 6, 3, 4

var a = {
    val: 1,
    children: [{
        val: 2,
        children: [{
            val: 5
        }, {
            val: 6
        }],
    }, {
        val: 3
    }, {
        val: 4
    }]
}

function findA(a, list) {
    console.log('a', a)
    if (a.val) {
        list.push(a.val);
        if (a.children) {
            let childList = []
            for (let i = 0; i < a.children.length; i++) {
                list.push(a.children[i].val);
                if (a.children[i].children) {
                    childList.push(a.children[i].children);
                }
            }
            for (let j = 0; j < childList.length; j++) {
                if (Array.isArray(childList[j])) {
                    for (let c = 0; c < childList[j].length; c++) {
                        list = findA(childList[j][c], list)
                    }
                }
            }
        }
    }
    return list;
}

console.log(findA(a, []))

// function threeS() {
//     return new Promise((resolve, reject) => {
//         let lists = [];
//         setTimeout(() => {
//             resolve(lists);
//             timer = null;
//         }, 30000)
//     })
// }
// function getContacts() {
//     return new Promise((resolve, reject) => {
//         xxxxx.then((res) => {
//             let list = res;
//             resolve(list);
//         }).catch((err) => {
//             reject(err);
//         })
//     })
// }
// let ans = Promise.race([timer, getContacts])
// ans.catch(err=>{
//     console.log(err)
// });

// Promise.resolve
// any race
//




// function showI() {
//     for (var i = 0; i < 5; i++) {
//         setTimeout(function timer() {
//             if (i === 5) i = 0;
//             console.log(i)
//         }, 1000);
//     }
// }
// showI()
function bar() {
    console.log(namea)
}
function foo() {
    var namea = 'qwqfoo'
    bar()
}
var namea = 'qwqwindow'
foo();
// 循环引用 ⭐⭐⭐
let i = {
    a: {
    }
}
i.a.b = i
// map 声明、放入自己
function cycle(obj, w = new WeakMap()) {
    if (!obj || typeof obj != 'object') return;
    if (!w.has(obj)) {// 为0的话，就先加入自己
        w.set(obj, 1);
    }
    for (let i = 0; i < Object.keys(obj).length; i++) {
        let key = Object.keys(obj)[i]
        let item = obj[key];
        if (item && typeof item == 'object') {
            if (!w.has(item)) {
                w.set(item, 1)
                cycle(item, w);
            } else {
                obj[key] = 'cycle';
            }
        }
    }
    return obj;
}

// 第二种解法是参考的 https://juejin.cn/post/6844903930380599303#heading-1
function cycle2(obj, parent) {
    //表示调用的父级数组
    var parentArr = parent || [obj];
    for (var i in obj) { // key 
        if (typeof obj[i] === "object") {
            //判断是否有循环引用
            parentArr.forEach((pObj) => {
                if (pObj === obj[i]) {
                    obj[i] = "[cycle]"
                }
            });
            cycle2(obj[i], [...parentArr, obj[i]])
        }
    }
    return obj;
}
console.log(i)
console.log(cycle(i));
console.log(cycle2(i));

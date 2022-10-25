// new操作符 ⭐⭐⭐ 
// 1、创建一个新对象。
// 2、让这个新的对象的原型指向该构造函数的原型对象。
// 3、执行构造函数，并且将构造函数指向新的对象。
// 4、拿到构造函数最后返回的结果，判断是否是对象或者函数，如果是的话，则直接
// 返回。如果不是则返回新创建的对象。

// 1、自己写的, 不标准化，仅辅助理解，以下面两为准
function myNew(fn) {
    let obj = {};// 新对象
    obj.__proto__ = fn.prototype; //  修一下指向
    let args = Array.prototype.slice.call(arguments, 1)
    let result = fn.apply(obj, args);// 构造函数内部执行，拿到数据 [注意要apply，才能解析剩下的args]
    return result || obj; 
}  // slice和下文的shift是为了拿到fn和参数，一般可能不会传入fn（下文的constructor）

// 2、面试宝典里写的
function objectFactory() {
    let newObject = null;
    let constructor = Array.prototype.shift.call(arguments);
    let result = null;
    // 判断参数是否是⼀个函数
    if (typeof constructor !== "function") {
        console.error("type error");
        return;
    }
    // 新建⼀个空对象，对象的原型为构造函数的 prototype 对象
    newObject = Object.create(constructor.prototype);
    // 将 this 指向新建对象，并执⾏函数
    result = constructor.apply(newObject, arguments);
    // 判断返回对象
    let flag = result && (typeof result === "object" || typeof result ===
        "function");
    // 判断返回结果
    return flag ? result : newObject;
}
// 使⽤⽅法
// objectFactory(构造函数, 初始化参数);


// 3、网上的例子
function createNew(con) { // 传入的con一定是一个函数/ 构造函数
    let result = Object.create(con.prototype)
    let args = [].slice.call(arguments, 1)
    let ret = con.apply(result, args)
    return ((typeof ret === 'object' && ret !== null) || typeof ret === 'function') ? ret : result
}
function Person(name, age, score) {
    this.name = name
    this.age = age
    this.score = score
    return { name: this.name }
}

let rest = myNew(Person, 'dmc', 21, 100)
// let rest = createNew(Person, 'dmc', 21, 100)
console.log(rest)
// https://blog.csdn.net/weixin_47450807/article/details/123851632
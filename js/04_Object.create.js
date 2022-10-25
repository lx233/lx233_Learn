// 原理：传入一个原型，作为返回的对象的原型
// function myCreate(prototype) {
//     let obj = {}
//     obj.__proto__ = prototype;
//     return obj;
// // }
// 理解上是这样，但实际上完全不是哦, 因为要形成一个完整的原型链，实际上是借助了构造函数指向进行修复，一个无关的构造函数指向对象，返回的对象是new出来的对象，因为是new所以是自动补上的prototype原理。

// 所以相比new Object() 会多一层，但是在继承中，是Chinese.prototype 的值的赋值，本来它也要给new Human 赋值，给的是上一层及的Human.prototype， 这个返回的Object.create对象和new Human同级，所以在继承中，使用Object.create 没有收到影响。

function create(obj) {
    function F() { }
    F.prototype = obj
    return new F()
}

// { }，new Object()和Object.create()的区别
// 1、{ } 和 new Object() 除了本身创建的对象，都继承了 Object 原型链上(Object.prototype)的属性或者方法，eg：toString()；当创建的对象相同时，可以说 { } 等价于 new Object() 。
// 2、Object.create() 是将创建的对象继承到原型链上，而本身没有继承 Object.prototype 的属性和方法。

// 对象字面量创建的是对象，而构造函数创建的是函数对象
var a = { x: 1, y: 2 } // 对象字面量
var b = new Object({ x: 1, y: 2 }) // 构造函数
var c = Object.create({ x: 1, y: 2 }) // 创建一个对象
var d = Object.create(null)
var f = Object.create(Object.prototype)

console.log(a) // {x: 1, y: 2}
console.log(b) // {x: 1, y: 2}
console.log(c, d, f) // {}

console.log(a.x, b.x, c.x) // 1 1 1
console.log(a.__proto__.x, b.__proto__.x, c.__proto__.x) // undefined undefined 1
// a、b、f 继承 Object.prototype 的属性或者方法
// console.log('111',a.__proto__, b.__proto__, f.__proto__) // Object 原型链上(Object.prototype)的属性或者方法
// c 将创建的对象继承到原型链上，本身没有继承 Object.prototype 的属性和方法
console.log(c.__proto__) // {x: 1, y: 2}
// d 创建了一个空的对象，没有继承 Object.prototype 的属性和方法
console.log(d.__proto__) // undefined
// ----- ** ------- 
console.log(c.__proto__.constructor, c.__proto__, c.__proto__.__proto__ === a.__proto__, 'c')
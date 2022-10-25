
// // 继承 提交 部分参考 https://zhuanlan.zhihu.com/p/371637636
// ctrl + / 取消注释
// [[prototype]] 其实就是__proto__ 

// way1、原型链继承 不可传参进去的
function Animal0(age) {
    this.b = 'qwq';
    this.colors = []
    this.age = age;
}
Animal0.prototype.getName = function () {
    return this.b;
}
function Dog0() { }
Dog0.prototype = new Animal0('age');// 看示意图，实例当做prototype 
// 实例（prototype）是可以传参的，但是子不能再给父传参，所有的子都是共享的同一个父的实例。
// ---- 此时Dog0 已创建完成。没有入参入口
let dog0 = new Dog0('age');
// console.log(dog0.getName(), dog0, 'dog0')
let dog01 = new Dog0()
dog01.colors.push('brown')
let dog02 = new Dog0()
// console.log(dog02.colors)
// 原型链继承存在的问题：
// 问题1：原型中包含的引用类型属性将被所有实例共享；
// 问题2：子类在实例化的时候不能给父类构造函数传参；





// // way 2、构造函数继承
// let Animal2 = function (name) {
//     this.name = name;
//     this.colors = []
//     console.log('aaa啊啊')
//     this.getName = function () {
//         return this.name;
//     }
// }

// let Dog2 = function (name) {
//     Animal2.call(this, name)
// }
// console.log(Dog2.prototype) // 此时里面是空的
// Dog2.prototype = new Animal2; // 这行的意思是，继承是继承自 dog，还是久远的animal，大概是这样吧
// console.log(Dog2.prototype) // 此时为{ name: undefined, getName: [Function] }

// let dog1 = new Dog2('dog1')
// console.log(dog1, '1111', dog1.__proto__)
// console.log(dog1.getName())
// dog1.colors.push('white');
// let dog12 = new Dog2('dog12')
// console.log(dog12.colors)
// 借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题以及传参问题。但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法。

// 组合继承
// 组合继承结合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

// way3、组合式继承，就是既给一个new 实例，又在内部call一下
function Animal3(name) {
    this.name = name;
    this.getName = function () {
        return this.name;
    }
    console.log('啊啊啊啊')
}
function Dog3(name, age) {
    this.age = age;
    Animal3.call(this, name)
}
Dog3.prototype = new Animal3();// 第一步
Dog3.prototype.constructor = Dog3;// 第二部，修下指向呢
let dog3 = new Dog3('dog3', 2);
// console.log(dog3.getName(),dog3,'name dog3333')

// 4、寄生式组合继承
// 组合继承已经相对完善了，但还是存在问题，它的问题就是调用了 2 次父类构造函数，第一次是在 new Animal()，第二次是在 Animal.call() 这里。
// 所以解决方案就是不直接调用父类构造函数给子类原型赋值，而是通过创建空函数 F 获取父类原型的副本。
// 寄生式组合继承写法上和组合继承基本类似，区别是如下这里：
// - Dog.prototype =  new Animal()
// - Dog.prototype.constructor = Dog
// + function F() {}
// + F.prototype = Animal.prototype
// + let f = new F()
// + f.constructor = Dog
// + Dog.prototype = f
// 稍微封装下上面添加的代码后：

// function object(o) {
//     function F() {}
//     F.prototype = o
//     return new F()
// }
// function inheritPrototype(child, parent) {
//     let prototype = object(parent.prototype)
//     prototype.constructor = child
//     child.prototype = prototype
// }
// inheritPrototype(Dog, Animal)
// 如果你嫌弃上面的代码太多了，还可以基于组合继承的代码改成最简单的寄生式组合继承：

// - Dog.prototype =  new Animal()
// - Dog.prototype.constructor = Dog

// + Dog.prototype =  Object.create(Animal.prototype)
// + Dog.prototype.constructor = Dog
// 5、class 实现继承 ------------- 
class Animal5 {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Dog5 extends Animal5 {
    constructor(name, age) {
        super(name)
        this.age = age;
    }
}
let dog5 = new Dog5('dog5');
// console.log(dog5.getName())

// ----- 实战
// 请补全JavaScript代码，要求通过寄生组合式继承使"Chinese"构造函数继承于"Human"构造函数。要求如下：  
// 1. 给"Human"构造函数的原型上添加"getName"函数，该函数返回调用该函数对象的"name"属性  
// 2. 给"Chinese"构造函数的原型上添加"getAge"函数，该函数返回调用该函数对象的"age"属性
// 补全代码
function Human(name) {
    this.name = name
    this.kingdom = 'animal'
    this.color = ['yellow', 'white', 'brown', 'black']
    function getName() {
        return this.name;
    }
}
function Chinese(name, age) {
    this.color = 'yellow';
    function getAge() {
        return age;
    }
}
Chinese.prototype = Human.prototype;
Chinese.prototype.constructor = Chinese;


// --------我的解答
function Human(name) {
    this.name = name
    this.kingdom = 'animal'
    this.color = ['yellow', 'white', 'brown', 'black']
    // this.getName = function () {
    //     return this.name;
    // }
}
Human.prototype.getName = function () {
    return this.name;
}
function Chinese(name, age) {
    this.color = 'yellow';
    Human.call(this, name)
    this.getAge = function () {
        return age;
    }
}
Chinese.prototype = Object.create(Human.prototype);//new Human();
Chinese.prototype.constructor = Chinese;
function qwq() {
    const o = new Chinese('z', 18);
    console.log(o.getAge(), o.getName())
    const judge = o.getAge() === 18 && o.getName() === 'z' && o.kingdom === 'animal' && o.__proto__.constructor === Chinese;
    return judge;
}
// console.log(qwq())

const o = new Chinese('z', 18);
const h = new Human('a');

console.log(o.__proto__.__proto__ === h.__proto__, '是否相等',
    o.__proto__.__proto__.__proto__.__proto__,
    h.__proto__.__proto__.__proto__,)
console.log(Object.create(Human.prototype).__proto__ === Human.prototype)
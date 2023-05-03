// 柯里化
// arguments ✔ 
// class
///
// webpack 
// 组件封装相关
// slot  mixin
// react 生命周期

// 箭头函数和arguments ✔
// -------------------
// es 6
// vue 双向绑定！这个！每次都会问一下
// cookie * 3
// ...


const add = x => y => z => {
    console.log(x, y, z);
    return x + y + z;
};
add(4)(5)(6);
const add1 = function (x) {
    return  function (y) {
        return  function (z) {
            console.log(x,y,z)
        }
    }
}
add1(4)(5)(6);
// var func = x => x * x;
// console.log(func(2))
// // 简写函数 省略 return
// var func = (x, y) => { return x + y; };
// //常规编写 明确的返回值






// function getAge(...args) {
//     console.log(typeof args)//
//     console.log(args, ...args, args instanceof Array,arguments instanceof Array);
// }
// getAge(21);


// class Chameleon {
//     static colorChange(newColor) {
//         this.newColor = newColor;
//         return this.newColor;
//     }
//     constructor({ newColor = 'green' } = {}) {
//         // console.log(newColor,'color')
//         this.newColor = newColor;
//     }
// }
// const freddie = new Chameleon({ newColor: 'purple' });
// // console.log(freddie,'11')
// console.log(Chameleon.colorChange('orange'))
// // console.log(freddie.colorChange('orange '));
// 看下react ，插槽， 
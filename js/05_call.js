// call 函数的实现步骤：
// 1. 判断调⽤对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使⽤ call 等⽅式调⽤
// 的情况。
// 2. 判断传⼊上下⽂对象是否存在，如果不存在，则设置为 window 。
// 3. 处理传⼊的参数，截取第⼀个参数后的所有参数
// 4. 将函数作为上下⽂对象的⼀个属性。
// 5. 使⽤上下⽂对象来调⽤这个⽅法，并保存返回结果。
// 6. 删除刚才新增的属性。
// 7. 返回结果。


// call函数实现 (自己手写的，可删掉)
// function.call(obj ,...agrs ),先找到三个参数，再进行调用，
Function.prototype.myselfCall = function (context) {
    if (typeof this != 'function') {
        console.log('not function')
    }
    context = context || window;
    // console.log(arguments, 'args')
    let args = [...arguments].slice(1);
    // console.log(args, 'args',...args)
    context.fn = this;
    let res = context.fn(...args)
    delete context.fn;
    return res;
};
// 规范的写法。 
Function.prototype.myCall = function (context) {
    // 判断调⽤对象
    if (typeof this !== "function") {
        console.error("type error");
    }
    // 获取参数
    let args = [...arguments].slice(1),
        result = null;
    // 判断 context 是否传⼊，如果未传⼊则设置为 window
    context = context || window;
    // 将调⽤函数设为对象的⽅法
    context.fn = this;
    // 调⽤函数
    result = context.fn(...args);
    // 将属性删除
    delete context.fn;
    return result;
};


var foo = {
    value: 1
};
function bar(name, age) {
    console.log(this.value, age);
}

bar.myCall(foo, 'qwq', 2);
bar.myselfCall(foo, 'qwq', 2);
bar();


// node环境下的window有问题，先没法用。
// let arr = [234, 1, 2, 3, 6, 5, 333, 554]
// let max1 = Math.max.apply(null, arr);
// // let max2 = Math.max.myCall(null, arr);
// console.log(max1, max2)

// apply 函数的实现步骤：
// 1. 判断调⽤对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使⽤ call 等⽅式调⽤
// 的情况。
// 2. 判断传⼊上下⽂对象是否存在，如果不存在，则设置为 window 。
// 3. 将函数作为上下⽂对象的⼀个属性。
// 4. 判断参数值是否传⼊
// 5. 使⽤上下⽂对象来调⽤这个⽅法，并保存返回结果。
// 6. 删除刚才新增的属性
// 7. 返回结果

// apply 函数实现
Function.prototype.myApply = function (context) {
    // 判断调⽤对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    let result = null;
    // 判断 context 是否存在，如果未传⼊则为 window
    context = context || window;
    // 将函数设为对象的⽅法
    context.fn = this;
    // 调⽤⽅法
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    // 将属性删除
    delete context.fn;
    return result;
};
// 自己写的
Function.prototype.myselfBind = function (context) {
    // 判断调⽤对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    let args = [...arguments].slice(1)
    let fn = this;
    return function Fn() {
        return fn.apply(context, args.concat(...arguments))
    }
}
// 规范一点的 bind函数实现
Function.prototype.myBind = function (context) {
    // 判断调⽤对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    // 获取参数
    var args = [...arguments].slice(1),
        fn = this;
    return function Fn() {
        // 根据调⽤⽅式，传⼊不同绑定值
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        );
    };
}
bar.apply(foo, ['qwq', 2]);
bar.myBind(foo, 'qwq', 2)();
bar.myselfBind(foo, 'qwq', 2)();
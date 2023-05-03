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

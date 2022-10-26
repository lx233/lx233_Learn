
// 唯一确定前序序列 ⭐

// 1. 已知二叉树的前序、中序遍历如下：

// 前序遍历结果：1 2 4 5 8 9   3 6 10 7
// 1
// 中序遍历结果：4 2 8 9 5 1   6 10 3 7
// 4 2 8 9 5
// 求该二叉树的后续遍历结果？  左右根
// 前序： 根 左 右
// 中序： 左 根 右
function soultion(front, middle) {
    let root = onlyTree(front, middle); // 建好的树
    console.log(printTree(root, rec = []).join(' '));
}
function onlyTree(front, middle) {
    if (front.length < 0) return null;
    let rootObj = {
        left: null,
        right: null,
        val: front[0]
    }
    if (front.length == 1) return rootObj;
    let root = front[0];// 根
    let index = middle.indexOf(root);
    // 左
    let front1 = front.slice(1, index + 1);
    let middle1 = middle.slice(0, index);
    if (front1.length > 0) {
        rootObj.left = onlyTree(front1, middle1);
    }
    // 右
    let front2 = front.slice(index + 1);
    let middle2 = middle.slice(index + 1);
    if (front2.length > 0) {
        rootObj.right = onlyTree(front2, middle2);
    }
    return rootObj;
}
function printTree(root, rec) {
    let left1 = [], right1 = [];
    if (root.left) {
        left1 = printTree(root.left, []);
    }
    if (root.right) {
        right1 = printTree(root.right, []);
    }
    rec = left1.concat(right1, [root.val]);
    return rec;
}

let front = '1 2 4 5 8 9 3 6 10 7'.split(' ');
let middle = '4 2 8 9 5 1 6 10 3 7'.split(' ');
// soultion(front, middle)
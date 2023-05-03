var arr = '1 2 3 4 5'.split(' ').map(i => parseInt(i));
// 此处开始处理arr的具体逻辑
let n = arr.length;
let l = 0, r = n - 1;
let sum1 = arr[l], sum2 = arr[r];
// 不需要跑
if (sum1 == sum2) {
    console.log(0, l + 1, r + 1)
    return;
}
let rec;
let cnt = 0;
let minn = (Math.abs(sum1 - sum2));
let recl = l, recr = r;
while (l + 1 < r) {
    rec = (Math.abs(sum1 - sum2));
    if (minn > rec) {
        minn = rec;
        recl = l;
        recr = r;
    }
    console.log('l', l + 1, 'r', r + 1, sum1, sum2, rec)
    if (sum1 < sum2) {
        l++;
        sum1 = sum1 + arr[l];
    } else if (sum1 > sum2) {
        r--;
        sum2 = sum2 + arr[r];
    } else if (sum1 === sum2) { // 相等，直接输出
        console.log(rec, l + 1, r + 1)
        return;
    }
    cnt++;
}
if (minn > rec) {
    minn = rec;
    recl = l;
    recr = r;
}
console.log(minn, recl + 1, recr + 1)
// if (cnt == 1) {
//     console.log(rec, 1, n)
// } else {
//     console.log(rec, l + 1, r + 1);
// }

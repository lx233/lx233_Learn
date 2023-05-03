


























// 22.11.2 
// 只有012的数组排序，不能用额外空间
let arr = '0 1 1 2 2 0 1 2 0 1 1 2'.split(' ').map(i => parseInt(i));
let rec0 = -1;
let rec2 = arr.length;
let tmp;
// console.log(arr, typeof arr, arr.length)
for (let i = 0; i < arr.length; i++) {
    if (rec0 == rec2) break;
    if (arr[i] == 0) {
        if (rec0 + 1 == i) { // 正好的是这个数
            rec0++;
        } else { // 否则，和rec0+1进行交换
            tmp = arr[rec0 + 1];
            arr[rec0 + 1] = 0;
            arr[i] = tmp;
            rec0++;
            // console.log('0',i,rec0+1,arr)
        }
    } else if (arr[i] == 2) {
        if (rec2 - 1 == i) { // 正好的是这个数
            rec2--;
        } else { // 否则，和rec0+1进行交换
            // console.log('2 1', i, rec2,arr[i])
            while (arr[rec2 - 1] == 2 && rec2 > rec0) {
                rec2--;
            }
            tmp = arr[rec2 - 1];
            arr[rec2 - 1] = 2;
            arr[i] = tmp;
            rec2--;
            // console.log('2 2', i, rec2,arr[i])
        }
    }
}
// console.log(rec2, rec0)
console.log(arr)




// 原文
// console.log('Hello World!');
// let arr = '0 1 1 2 2 0 1 2 0 1 1 2'.split(' ').map(i => parseInt(i));
// let rec0 = -1;
// let rec2 = arr.length;
// let tmp;
// console.log(arr,typeof arr,arr.length)
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] == 0) {
//         if (rec0 + 1 == i) { // 正好的是这个数
//             rec0++;
//         } else { // 否则，和rec0+1进行交换
//             tmp = arr[rec0 + 1];
//             arr[rec0 + 1] = 0;
//             arr[i] = tmp;
//             rec0++;
//             //          console.log('0',i,rec0+1,arr)
//         }
//     } else if (arr[i] == 2) {
//         if (rec2 - 1 == i) { // 正好的是这个数
//             rec2++;
//         } else { // 否则，和rec0+1进行交换
//             tmp = arr[rec2 - 1];
//             arr[rec2 - 1] = 2;
//             arr[i] = tmp;
//             rec2++;
//             console.log('2', i, rec2 - 1, arr)
//         }
//     }
// }
// console.log(arr)
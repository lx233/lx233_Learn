// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
// 示例 1：

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    let cnt = nums.reduce((prev, cur) => prev * cur, 1) //计算一下累加和
    console.log(cnt);
    let ans = new Array(cnt + 1);
    // 还是第一个有三种选法，第二个有两种选法…… 云云 
    let rec = nums.length;
    while (rec >= 0) {
        // 

        rec--;
    }
};

let nums = [1, 2, 3];
console.log(permute(nums))
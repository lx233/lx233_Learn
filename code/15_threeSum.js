// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

// 你返回所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

//  
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        let res = 0 - nums[i];
        let set = new Set();
        // 转化为值为res的两数之和问题
        for (let j = 0; j < nums.length; j++) {
            if (i != j) { // 取消i的影响
                let q1 = res - nums[j];
                if (set.has(q1)) {
                    let arr = JSON.stringify([nums[i], nums[j], q1].sort((a, b) => a - b));
                    if (!map.get(arr)) {
                        map.set(arr, 1);
                    } else {
                        // break;// 再往下就都是重复的，暂停掉
                    }
                } else {
                    set.add(nums[j]);
                }
            }
        }
    }
    let ans = []
    for (let i of map) {
        ans.push(JSON.parse(i[0]))
    }
    return ans
};

let nums = [34, 55, 79, 28, 46, 33, 2, 48, 31, -3, 84, 71, 52, -3, 93, 15, 21, -43, 57, -6, 86, 56, 94, 74, 83, -14, 28, -66, 46, -49, 62, -11, 43, 65, 77, 12, 47, 61, 26, 1, 13, 29, 55, -82, 76, 26, 15, -29, 36, -29, 10, -70, 69, 17, 49]
console.log(threeSum(nums).length)
// [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]
// 输出：[[-1,-1,2],[-1,0,1]]
// map的遍历还是用of啊啊啊啊！object 是in，就像vue的方法一样
// 那个break就不用加，纯属我傻了才加的
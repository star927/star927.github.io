/* 该脚本用于给文档中的标题和目录添加前缀序号
对于任一标题, 必须满足下列条件之一:
- 是第一个标题, 它的层级不小于任一标题的层级
- 它的层级比它的上一个标题的层级小1
- 它的层级比它的上一个标题的层级大
*/

// 给标题添加序号
const titles = document.querySelector(".content").querySelectorAll("h1, h2, h3, h4, h5, h6");
const counters = [0, 0, 0, 0, 0, 0]; // 初始化层级计数器，用于 h1 到 h6 的计数
titles.forEach((title) => {
    const level = parseInt(title.tagName.charAt(1), 10); // 标题的层级, h 标签的数字部分
    counters[level - 1] += 1; // 增加当前层级计数
    // 重置当前层级以下的计数器
    for (let i = level; i < counters.length; i++) {
        counters[i] = 0;
    }
    // 生成序号，过滤掉前面为 0 的部分，比如没有 h1 的部分，最大的标题是 h2
    const prefix =
        counters
            .slice(0, level)
            .filter((num) => num > 0)
            .join(".") + " ";
    const titleSpan = title.querySelector("span");
    titleSpan.textContent = prefix + titleSpan.textContent; // 添加前缀到标题文本
});

// 给目录添加序号
function processList(ul, prefix = []) {
    Array.from(ul.children).forEach((li, index) => {
        const currentNumber = [...prefix, index + 1].join("."); // 计算层级前缀
        const anchor = li.querySelector("a");
        anchor.textContent = `${currentNumber} ${anchor.textContent}`; // 添加前缀到目录文本

        const childUl = li.querySelector("ul"); // 检查是否有嵌套的 ul
        if (childUl) {
            processList(childUl, [...prefix, index + 1]); // 递归处理子列表
        }
    });
}
processList(document.querySelector("#TableOfContents").querySelector("ul"));

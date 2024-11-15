// Fixit主题显示文章列表是标题-日期的顺序，该脚本的作用是将日期放在标题前面，这样结合_custom.scss中自定义的样式，文章列表就呈现出时间线的效果
const archiveItems = document.querySelectorAll(".archive-item:not(.card-item-wrapper .archive-item)");
archiveItems.forEach(function (item) {
    const date = item.querySelector(".archive-item-date");
    const link = item.querySelector(".archive-item-link");
    if (date && link) {
        item.insertBefore(date, link);
    }
});

// 详见 themes/FixIt/layouts/partials/paginator.html
// 对于首页、/archives、/posts 这三个页面，如果文章列表存在多页时，才会在页面底部显示页码，而文章列表只有一页时，页面底部不会显示页码，
// 此时如果文章列表超过浏览器的高度时，页面底部的空间就有些窄，该段代码作用就是在这种情况下，在页面底部增加一个标签以增大页面底部空间。
function addPaginationIfNeeded(selector) {
    const page = document.querySelector(selector);
    if (!page) return;
    const lastChild = page.lastElementChild;
    if (lastChild && (lastChild.tagName !== "UL" || !lastChild.classList.contains("pagination"))) {
        const pagination = document.createElement("ul");
        pagination.className = "pagination";
        page.appendChild(pagination);
    }
}
addPaginationIfNeeded(".page.home.posts");
addPaginationIfNeeded(".page.archive:has(> article:last-child)");

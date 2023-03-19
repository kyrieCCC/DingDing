module.exports = {
    title: 'Hello DingDing',
    description: 'Just playing around.',
    themeConfig: {
        footer: {
            message: "一起加入DingDing吧🤩<a>https://github.com/KyrieCCC/DingDing</a>",
        },
        sidebar: [
            {
              text: "基本配置",
              items: [{ text: "导入", link: "/doc/index" }],
            },
            {
                text: "文档报告",
                items: [{ text: '研发背景', link: "/doc/background.md" },
                        { text: '开发方法', link: "/doc/idea.md" },
                        { text: '设计方法', link: "/doc/design.md" }
                ]
            }
        ]
    }
}
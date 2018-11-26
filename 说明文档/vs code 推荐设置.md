```
{
    "workbench.colorTheme": "Solarized-light-fjs",
    "workbench.startupEditor": "welcomePage",
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "editor.quickSuggestions": {
        "strings": true
    },
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    "workbench.iconTheme": "vscode-icons",
    "files.autoSaveDelay": 10000,
    "eslint.options": {
        //这里为你项目中配置的.eslintrc.js文件，这样保存时效验的规则就和项目一致了，只需轻轻一按  ctrl+s  完美格式化，麻麻再也不用担心我的格式了
        "configFile": "你的项目路径/.eslintrc.js",
        "plugins": ["html"]
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "files.autoSave": "off",
    "window.zoomLevel": 0,
    "vsicons.dontShowNewVersionMessage": true,
}
```

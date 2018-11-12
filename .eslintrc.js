// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',

    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        //'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
        'html'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        "generator-star-spacing": 'off',
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "semi": [2, "always"], //语句强制分号结尾.
        // "indent": ["error", "tab"], //缩进风格
        "indent": [2, 4], //缩进风格
        "no-mixed-spaces-and-tabs": [2, true],
        "vue/max-attributes-per-line": 0,
        "spaced-comment": 0, //注释风格要不要有空格什么的
        "eqeqeq": 0, //必须使用全等
        'no-tabs': 'off', //禁止使用tab
        "no-return-assign": 0, //return 语句中不能有赋值表达式
        "no-extra-parens": 'off', //禁止混用不同的操作符
        "no-mixed-operators": 'off', //禁止混合使用不同的操作符
        "space-before-function-paren": [0, "always"], //方法空格
        "eol-last": [0, "always"], //结尾换行
        "arrow-parens": 0, //箭头函数用小括号括起来
    }
}
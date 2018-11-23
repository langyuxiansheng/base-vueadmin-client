'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: `"development"`,
    BASE_URL: `"/api"` //开发环境API地址
})
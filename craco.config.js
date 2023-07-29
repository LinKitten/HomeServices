/* craco.config.js */
const path = require('path')

module.exports = {
  webpack: {
    // 别名
    alias: {
      "@": path.resolve("src"),
    }
  },
  //配置代理解决跨域
  devServer: {
    proxy: {
        "/shop": {
            target: "http://www.fast.com/shop",  
            changeOrigin: true,
            pathRewrite: {
                "^/shop": ""
            }
        }
    }
  }
}

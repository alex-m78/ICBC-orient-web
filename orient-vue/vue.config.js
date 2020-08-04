module.exports = {
    devServer: {
        port: 8000,
        proxy: {
            "/api": {
                target: "http://47.103.137.116:8080",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}
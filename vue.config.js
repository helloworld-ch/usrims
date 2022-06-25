module.exports={
    //关闭代码校验
    lintOnSave:false,
    productionSourceMap: false,
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
        port: 8090,
        // host: 'localhost',
        https: false,
        open: false,
        proxy: {
            '/api': {
                target: `http://localhost:7232`,
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            }
        },
        disableHostCheck: true
    },

}

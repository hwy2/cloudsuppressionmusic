module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({ //这里是配置项，详见官方文档
                        rootValue: 37.5, // 换算的基数
                        selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
                        propList: ['*'],
                    }),
                ]
            }
        }
    },
    //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
    chainWebpack: config => {
        config.plugin('html')
            .tap(args => {
                args[0].title = "网抑云音乐";
                return args;
            })
    },
    // devServer: {
    //     open: true,
    //     host: 'localhost',
    //     port: 8080,
    //     https: false,
    //     //以上的ip和端口是我们本机的;下面为需要跨域的
    //     proxy: { //配置跨域
    //         '/': {
    //             target: 'http://3dcw.cn:5005/', //后台接口
    //             ws: true,
    //             changOrigin: true, //允许跨域
    //         }

    //     }
    // }

}
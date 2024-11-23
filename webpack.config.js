const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist/'),
    clean: true,
  },
  resolve: {
    alias: {
      '@scripts': path.join(__dirname, './test3/src/js/'),
      '@styles': path.join(__dirname, './test3/src/css/'),
      '@images': path.join(__dirname, './test3/src/images/'),
      '@fonts': path.join(__dirname, './test3/src/fonts/'),
      '@pages': path.join(__dirname, './test3/src/pages/'),
    },
    
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: {
          import: path.join(__dirname, './test3/src/pages/index/index.html'),
          data: {
            title: 'home',
            id: 'one',
          }
        },
      },
      css: {
        filename: '[name].[contenthash:8].css',
      },
      verbose: true,
      minify: {
        removeComments: true,       // 移除 HTML 注释
        collapseWhitespace: false,  // 删除多余的空格和换行
        minifyJS: true,             // 压缩 HTML 中的内联 JavaScript 代码
        minifyCSS: true,            // 压缩 HTML 中的内联 CSS
      },
      preprocessor: 'eta',
      preprocessorOptions: {
        views: path.join(__dirname, './test3/src/pages'),
      },
    }),
    
  ],

  module: {
    rules: [
      {
        test: /\.(ico|png|jp?g|svg|webp)$/,
        type: 'asset',
        parser:{
          dataUrlCondition:{ maxSize: 10*1024 }
        },
        generator:{
            filename: 'images/[name].[hash:8][ext]',
        },
      },
      {
        test: /.(html)$/,
        loader: HtmlBundlerPlugin.loader,
        options: {
          sources: [{ tag: 'img', attributes: ['data-src', 'data-srcset'] }],
        },
      },
      { 
        test: /\.(css|scss)$/,
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                    require('postcss-preset-env')({
                      stage: 1,                                       // 启用较稳定的 CSS 草案特性
                      autoprefixer: {
                        grid: true,                                   // 启用 CSS Grid 的前缀
                        flexbox: 'no-2009',                           // 禁用早期 Flexbox 前缀
                      },
                      browsers: ["> 1%", "last 3 versions", "ie 11"],  // 目标浏览器
                      features: {
                        'nesting-rules': true,                        // 启用嵌套规则
                        'custom-media-queries': true,                 // 启用自定义媒体查询
                      },
                    }),
                    require('cssnano')({ preset: 'default' }),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
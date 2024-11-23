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
        removeComments: true,       
        collapseWhitespace: false,  
        minifyJS: true,            
        minifyCSS: true,            
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
                      stage: 1,                                       
                      autoprefixer: {
                        grid: true,                                  
                        flexbox: 'no-2009',                           
                      },
                      browsers: ["> 1%", "last 3 versions", "ie 11"], 
                      features: {
                        'nesting-rules': true,                       
                        'custom-media-queries': true,            
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

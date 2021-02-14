const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин html-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключаем плагин для удаление содержимого папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключаем плагин для объединения css файлов в один

module.exports = { // module.exports — это синтаксис экспорта в Node.js
  entry: {
    main: './src/pages/index.js' // указали первое место, куда заглянет webpack, — файл index.js в папке src
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // переписали точку выхода, используя утилиту path
    filename: 'main.js',
    publicPath: ''
  },

  mode: 'development', // добавили режим разработчика
  devServer: {
    contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        // test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        // use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        // exclude: '/node_modules'
      },
      // добавили правило для обработки файлов картинок и шрифтов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|ico)$/,
        type: 'asset/resource'
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 } // опция для использования @import в css файлах
        },
        'postcss-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),

    new CleanWebpackPlugin(), // вызываем плагин для очистки папки dist

    new MiniCssExtractPlugin(), // подключение плагина для объединения css файлов
  ]
};

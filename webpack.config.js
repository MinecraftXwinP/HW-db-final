'use strict'

var path = require('path')

module.exports = {
  entry:
  {
    app:'./build/app.cjsx'
  },
  output:{
    path: path.join(__dirname,'public','dist'),
    filename:'[name].js'
  },
  module:{
    loaders:[{test: /\.cjsx/,loader:'coffee-jsx-loader'}]
  }
}

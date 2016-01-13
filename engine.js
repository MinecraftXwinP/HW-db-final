'use strict'

var fs = require('fs')

module.exports = function(filePath,options,callback)
{
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    var rendered = content.toString();
    for(var o in options)
    {
      console.log('[Template Engine]: Applying variable \'' + o + '\'')
      rendered = rendered.replace('{!' + o + '!}',options[o]);
    }
    return callback(null, rendered);
  })
}

var connect = require('connect');
var serveStatic = require('serve-static'); 
var app = connect(); 

app.use(serveStatic('dist')); 

app.listen(9500);

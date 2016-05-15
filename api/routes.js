var Item = require('./../models/items.js');
var User = require('./../models/users.js');
var crudRoutes = require('./crud.js');

module.exports = function(app) {
    crudRoutes(app, '/api/items', Item);
    crudRoutes(app, '/api/users', User);
}
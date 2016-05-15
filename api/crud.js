var _ = require('lodash');

module.exports = function(app, path, model) {

    app.get(path, function(req, res) {
        model.find(function(err, items) {
            if (err) {
                res.json({info: 'error during get', error: err});
            } else {
                res.json({info: 'item found successfully', data: items});
            }
        });
    });

    app.get(path + '/:id', function(req, res){
        model.findById(req.params.id, function(err, item){
            if (err) {
                res.json({info: 'error finding item', error: err});
            } else if(item) {
                res.json({info: 'item found successfully', data: item});
            } else {
                res.json({info: 'item not found'});
            }
        })
    });

    app.post(path, function(req, res) {
        var newItem = new model(req.body);
        newItem.save(function(err) {
            if(err) {
                res.json({info: 'error during create', error: err});
            } else {
                res.json({info: 'successfully created item'});
            }
        });
    });

    app.put(path + '/:id', function(req, res){
        model.findById(req.params.id, function(err, item){
            if (err) {
                res.json({info: 'error during update', error: err});
            } else if (item) {
                _.merge(item, req.body);
                item.save(function(err) {
                    if (err) {
                        res.json({info: 'error during update', error: err});
                    } else {
                        res.json({info: 'updated successfully'});
                    }
                });
            } else {
                res.json({info: 'item not found'});
            }
        });
    });

    app.delete(path + '/:id', function (req, res) {
        model.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during delete', error: err});
            } else {
                res.json({info: 'successfully deleted item'});
            }
        });
    });
}
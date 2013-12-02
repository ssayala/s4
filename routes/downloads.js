AWS = require('aws-sdk'),
    settings = require('../config/settings'),
    util = require('util');

AWS.config.loadFromPath('./config/keys.json');
var s3 = new AWS.S3();

exports.getDownloadByName = function(req, res){
    var user = req.session.user;

    var params = {
        Bucket: settings.bucket,
        Key: util.format('%s/%s/%s', settings.awsPrefix, user.customerId, req.params.name)
    };
    s3.getSignedUrl('getObject', params, function (err, url) {
        res.redirect(url);
    });
};


exports.get =  function(req,res){

    var user = req.session.user;
    var model = {
        settings: settings,
        keys: [],
        navbar: { username: user.name, headers: []}
    };
    s3.listObjects({Bucket: settings.bucket, Prefix: util.format('%s/%s/', settings.awsPrefix, user.customerId), Delimiter: '/'},function(err, data) {

        data.Contents.forEach(function(item) {

            var paths = item.Key.split('/');
            var fileName = paths[paths.length - 1];
            if (fileName !== "" ) {
                model.keys.push({
                    title: fileName,
                    url: '/download/' + fileName,
                    awsKey: item.Key
                });
            }
        });
        res.render('downloads',model );
    });
};

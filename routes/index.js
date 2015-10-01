var express = require('express');
var logic = require('../logic');
var archiver = require('archiver');

var submissions_retriever = logic.submissions_retriever;
var token_retriever = logic.token_retriever;

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS Downloader' });
});

//Post request which retrieves the token for a given user. It is sent after that a user press the download button
router.post('/get_token', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    token_retriever.getToken(username, password, function(tokenTemp){
        var token = tokenTemp;
        if(token == '') {
            //Invalid username and/or password
            res.statusCode = 401;
        }
        else {
            res.send({
                token : token
            });
        }
        res.end();
    });
});

//Post request which retrieves the files. It is sent after the token is retrieved
router.post('/download', function(req, res, next) {
    var zip = archiver('zip');
    var username = req.body.hidUsername;
    var token = req.body.hidToken;

    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=downloaded_files.zip'
    });

    zip.pipe(res);

    submissions_retriever.getSubmissions(username, token, zip);
});



module.exports = router;

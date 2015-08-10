var express = require('express');
var logic = require('../logic');
var submissions_retriever = logic.submissions_retriever;
var token_retriever = logic.token_retriever;

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS Downloader' });
});

//Post request(When the download button is pressed)
router.post('/', function(req, res, next) {
    var zip = submissions_retriever.zip;
    var username = req.body.username;
    var password = req.body.password;

    token_retriever.getToken(username, password, function(tokenTemp){
        var token = tokenTemp;
        if(token == '') {
            //Invalid username and/or password
            res.redirect('/');
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/zip',
                'Content-disposition': 'attachment; filename=downloaded_files.zip'
            });

            zip.pipe(res);
            submissions_retriever.getSubmissions(username, token);
        }
    });
});

module.exports = router;

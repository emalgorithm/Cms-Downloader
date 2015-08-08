var express = require('express');
var logic = require('../logic');
var submissions_retriever = logic.submissions_retriever;
var token_retriever = logic.token_retriever;
var zip = submissions_retriever.zip;

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS Downloader' });
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    token_retriever.getToken(username, password, function(tokenTemp){
        var token = tokenTemp;
        res.writeHead(200, {
            'Content-Type': 'application/zip',
            'Content-disposition': 'attachment; filename=downloaded_files.zip'
        });

        zip.pipe(res);
        submissions_retriever.getSubmissions(username, token);
        /*setTimeout(function(){
            zip.finalize();
        }, 20000);*/
    });
});

module.exports = router;

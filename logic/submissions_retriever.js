/**
 * Created by emaros on 04/08/15.
 */

var request = require("request");
var archiver = require('archiver');

var zip = module.exports.zip = archiver('zip');

var username = '';
var token = '';
var size = 0;
var counter = 0;


var getDigestRequest = function(taskName, index){
    var getDigestURL = "http://cms.di.unipi.it/submission";
    var getDigestParams = {
        json: {
            "action": "list",
            "task_name": taskName,
            "username": username,
            "token": token
        }
    }
    request.post(
        getDigestURL,
        getDigestParams,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var submission = body["submissions"][0];
                var digest = submission["files"][0]["digest"];
                var fileName = taskName + ".cpp";
                var downloadURL = "http://cms.di.unipi.it/files/" + digest + "/" + fileName;
                downloadRequest(downloadURL, fileName, index);
            }
        }
    );
}

var downloadRequest = function(downloadURL, fileName){
    request.post(
        downloadURL,
        function(error, response, body){
            zip.append(body, {name: fileName});
            counter++;
            console.log(fileName + " " + counter);
            if(counter == size) {
                console.log("Zip finalized");
                zip.finalize();
            }
        }
    );
}

var getNamesListRequest = function() {
    var getNamesListURL = "http://cms.di.unipi.it/user";
    var getNamesListParams = {
        json: {
            "action": "get",
            "username": username
        }
    };

    request.post(
        getNamesListURL,
        getNamesListParams,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                size = body["scores"].length;
                body["scores"].forEach(function(taskObj) {
                    var taskName = taskObj["name"];
                    getDigestRequest(taskName);
                });
                console.log("ciao "+ size);
            }
        }
    );
}

module.exports.getSubmissions = function(usernameTemp, tokenTemp) {
    username = usernameTemp;
    token = tokenTemp;
    counter = 0;
    getNamesListRequest();
};
/**
 * Created by emaros on 07/08/15.
 */

var request = require("request");

var getToken = module.exports.getToken = function(username, password, cb){
    var url = "http://cms.di.unipi.it/user";

    var params = {
        json: {
            "action": "login",
            "username": username,
            "password": password
        }
    };

    request.post(
        url,
        params,
        function(err, res, body){
            if(!err && res.statusCode == 200){
                var token = '';
                if(body.hasOwnProperty('error')){
                    console.log("Errorrrrrrrrr");
                }
                else {
                    token = body['token'];
                }
                cb(token);
            }
            else if(err)
                console.log(err);
            else
                console.log(res.statusCode);
        }
    )
};
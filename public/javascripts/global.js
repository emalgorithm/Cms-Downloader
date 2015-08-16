/**
 * Created by emaros on 08/08/15.
 */

$(document).ready(function(){
    var $btn = $('.btn');

    $btn.hover(
        function(){
            $btn.css('color', '#333333');
        },
        function(){
            $btn.css('color', '#ffffff');
        }
    );

    $btn.on('click', function(){
        var $errorDiv = $('.error'); //Remove the error about user and password each time the user clicks
        $errorDiv.empty();


        var $username = $('#user').val();    //Prepare and send POST request to /get_token
        var $password = $('#pass').val();
        var obj = {
            username : $username,
            password : $password
        };

        $.ajax({
            url: "/get_token",
            type: "POST",
            dataType: "json",
            data: obj,
            complete: function() {
                console.log('process complete');
            },

            success: function(data) {
                console.log("Process successful"); //Not displayed at the first click when trigger is present

                var token = data.token;
                var $hidToken = $('#hidTok');
                var $hidUser = $('#hidUser');
                var $hidButton = $('#hidButt');

                $hidToken.val(token);
                $hidUser.val($username);

                //console.log("Token:  " + $hidToken.val + ",   username:   " + $hidUser.val + ',   button: ' + $hidButton);

                $hidButton.trigger('click');    //Trigger a click to simulate the user sending a POST request to /download
            },

            error: function() {
                console.log('process error');
                var $errorDiv = $('.error');
                console.log($errorDiv);
                var errorText = '<p>Password e/o username incorretti<p>'
                $errorDiv.append(errorText);
            },
        });
    });
});
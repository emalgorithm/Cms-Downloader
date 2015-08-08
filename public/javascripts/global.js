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
});
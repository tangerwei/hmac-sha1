(function(w){
    var jquery = function(){
        console.log('hello world');
    }
    jquery.console = function(){
        console.log('me too');
    }
    w.jquery = jquery;
})(window)
(function(w){
    //define dom node
    var d = function(tag){
        this.node = tag;
        this.childNodes = [];
    }
    d.prototype = {
        
    }
    w.DOMNode = d;
})(window)
(function (w) {
    //define dom tree
    var dt = function (o) {
        this.node = o instanceof DOMNode ? o : new DOMNode();
    }
})(window);
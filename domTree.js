(function (w) {
    //define dom node
    var d = function (tag) {
        this.node = tag;
        this.childNodes = [];
    }
    d.prototype = {
        appendChild: function (e) {
            if (!(e instanceof DOMNode)) {
                console.error('appendChild need a node');
                return;
            }
            this.childNodes.appendChild(e);
        }
    }
    w.DOMNode = d;
})(window);
(function (w) {
    //define dom tree
    var dt = function (o) {
        this.node = o instanceof DOMNode ? o : new DOMNode();
    }
})(window);
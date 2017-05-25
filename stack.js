(function (w) {
    var stack = function () {
        this.data = [];
    };
    stack.prototype = {
        push: function () {
            for(var i = 0; i < arguments.length;i++){
                this.data.push(arguments[i]);
            }
        },
        pop: function () {
            return this.data.pop();
        },
        peek: function () {
            return this.data[this.data.length - 1];
        },
        isEmpty:function(){
            return this.data.length === 0;
        },
        clear:function(){
            this.data = [];
        },
        size:function(){
            return this.data.length;
        }
    }
    stack.isStack = function (a) {
        return a instanceof stack;
    }
    w.Stack = stack;
})(window);
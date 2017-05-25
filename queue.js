(function(w){
    var queue = function(){
        this.data = [];
    }
    queue.prototype = {
        enqueue:function(){
            for(var i = 0; i < arguments.length;i++){
                this.data.push(arguments[i]);
            }
        },
        dequeue:function(){
            return this.data.shift();
        },
        front:function(){
            return this.data[0];
        },
        isEmpty:function(){
            return this.data.length === 0;
        },
        clear:function(){
            return this.data = [];
        },
        size:function(){
            return this.data.length;
        }
    }
    queue.isQueue = function(a){
        return a instanceof queue;
    }
    w.Queue = queue;
})(window);
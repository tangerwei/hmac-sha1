# hmac-sha1
this is a demo to use hengqian public API

# add a stack -- a data construct
This is API of stack.js
--------------------
### create:
> var s = new Stack();
### push
> s.push(1);
> s.push(1,3,5);
### pop : return the top elemnt and remove this element from stack
> var t = s.pop();
### peek : return the top elemnt but not remove this element from stack
> var t = s.peek();
### isEmpty : judge stack is empty or not?
> s.isEmpty();
### clear : remove all element from stack
> s.clear();
### size : return the length of stack
> s.size();
### Stack.isStack : judge a element is stack or not;
>Stack.isStack(s)

# add a queue -- a data construct
This is API of queue.js
--------------------
### create:
> var s = new Queue();
### push
> s.enqueue(1);
> s.enqueue(1,3,5);
### pop : return the top elemnt and remove this element from stack
> var t = s.dequeue();
### front : return the top elemnt but not remove this element from stack
> var t = s.front();
### isEmpty : judge stack is empty or not?
> s.isEmpty();
### clear : remove all element from stack
> s.clear();
### size : return the length of stack
> s.size();
### Queue.isQueue : judge a element is Queue or not;
>Queue.isQueue(s)
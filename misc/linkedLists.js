module.exports = {
  Queue: Queue,
  Stack: Stack
};

function LinkedList() {

    this.clear = function () {
        delete this.head;
    };

    this.removeFirst = function () {

        if (!this.head) {
            return null;
        }

        var removedNodeData = this.head.data;

        //Even if there's only one element setting head to a null next will not break the list
        this.head = this.head.next;

        this.size--;

        return removedNodeData;
    };

    this.print = function () {

        var string = '[';

        if (!this.head) {
            return string + ']';
        }

        //this will be the variable we use to run to the end of the list
        var runningPointer = this.head;

        string += runningPointer.data;

        //This will keep going deeper into the list until we hit the end
        while (runningPointer.next != null) {
            runningPointer = runningPointer.next;
            string += ', ' + runningPointer.data;
        }

        return string + ']';
    }
}

function LinkedListSingleLink() {

    this.size = 0;

    this.addFirst = function (data) {

        var newNode = new SingleLinkNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            //Because the new node is coming into the front we set its next to head
            newNode.next = this.head;

            //Move head pointer to the new node
            this.head = newNode;
        }

        this.size++;
    };

    this.addLast = function (data) {

        var newNode = new SingleLinkNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    };

    function SingleLinkNode (data) {
        this.data = data;
        this.next = null;
    }
}

LinkedListSingleLink.prototype = new LinkedList();

function LinkedListDoubleLink() {

    this.size = 0;

    this.addFirst = function (data) {

        var newNode = new DoubleLinkNode(data);

        if (!this.head) {
            this.head = newNode;
        } else {
            //This will put new node in front
            newNode.next = this.head;

            //This will set prev correctly (before changing head pointer)
            this.head.prev = newNode;

            //Move head pointer
            this.head = newNode;
        }

        this.size++;
    };

    this.addLast = function (data) {

        var newNode = new DoubleLinkNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    };

    this.printReverse = function () {

        var runningPointer = this.tail,
            string = '[';

        if (!this.head) {
            return string + ']';
        }

        string += runningPointer.data;
        runningPointer = runningPointer.prev;

        while (runningPointer != null) {
            string += ', ' + runningPointer.data;
            runningPointer = runningPointer.prev;
        }

        return string + ']';
    };

    function DoubleLinkNode (data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

LinkedListDoubleLink.prototype = new LinkedList();

function Stack () {

    var list = new LinkedListSingleLink();

    this.push = function (data) {
        list.addFirst(data);
    };

    this.pop = function () {
        return list.removeFirst();
    };

    this.getSize = function () { return list.size; };
    this.print = function () { return list.print() };
}

function Queue () {

    //NOTE: We could implement a queue with either a single or doubly linked list
    var list = new LinkedListDoubleLink();

    this.enqueue = function (data) {
        //The main difference between a Stack/Queue is that with a Queue new elements are added to the tail
        list.addLast(data);
    };

    this.dequeue = function () {
        return list.removeFirst();
    };

    this.getSize = function () { return list.size; };
    this.print = function () { return list.print() };
    this.printReverse = function () { return list.printReverse() };
}
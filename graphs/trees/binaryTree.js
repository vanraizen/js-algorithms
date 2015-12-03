module.exports = BinaryTree;

function BinaryTree() {

    this.addElement = function (data) {
        if(!this.root) {
            this.root = new Node(null, data);
        } else {
            addToTree(this.root, data);
        }
    };

    this.getInOrder = function () {
        return inOrderTraversal(this.root);
    };

    function inOrderTraversal(currentNode, output) {

        // go left
        if(currentNode.left) {
            output = inOrderTraversal(currentNode.left, output);
        }

        // print Node
        output = output ? output + ", " + currentNode.data : currentNode.data;

        // go right
        if(currentNode.right) {
            output = inOrderTraversal(currentNode.right, output);
        }

        return output;
    }

    this.getPreOrder = function () {
        return preOrderTraversal(this.root);
    };

    function preOrderTraversal(currentNode, output) {

        // print Node
        output = output ? output + ", " + currentNode.data : currentNode.data;

        // go left
        if(currentNode.left) {
            output = preOrderTraversal(currentNode.left, output);
        }

        // go right
        if(currentNode.right) {
            output = preOrderTraversal(currentNode.right, output);
        }

        return output;
    }

    this.getPostOrder = function () {
        return postOrderTraversal(this.root);
    };

    function postOrderTraversal(currentNode, output) {

        // go left
        if(currentNode.left) {
            output = postOrderTraversal(currentNode.left, output);
        }

        // go right
        if(currentNode.right) {
            output = postOrderTraversal(currentNode.right, output);
        }

        // print Node
        output = output ? output + ", " + currentNode.data : currentNode.data;

        return output;
    }

    function addToTree(currentNode, data) {
        if(data > currentNode.data) {
            if(currentNode.right) {
                return addToTree(currentNode.right, data);
            } else {
                return currentNode.right = new Node(currentNode, data);
            }
        } else if(data < currentNode.data) {
            if(currentNode.left) {
                return addToTree(currentNode.left, data);
            } else {
                return currentNode.left = new Node(currentNode, data);
            }
        }
    }
}

function Node(parentNode, data) {
    this.parent = parentNode;
    this.data = data;
    this.left = this.right = null;
}
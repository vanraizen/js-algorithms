var expect = require('chai').expect,
    BinaryTree = require('../graphs/trees/binaryTree');

describe('Binary Trees', function() {

    it('Test In Order Traversal', function () {
        expect(getTree().getInOrder()).to.equal('1, 2, 3, 5, 6, 7, 12');
        expect(getTree().getPreOrder()).to.equal('2, 1, 5, 3, 7, 6, 12');
        expect(getTree().getPostOrder()).to.equal('1, 3, 6, 12, 7, 5, 2');
    });

    /**
     * Builds a simple tree
     * @returns {BinaryTree}
     */
    function getTree() {
        var tree = new BinaryTree();
        tree.addElement(2);
        tree.addElement(5);
        tree.addElement(7);
        tree.addElement(12);
        tree.addElement(1);
        tree.addElement(3);
        tree.addElement(6);
        return tree;
    }
});
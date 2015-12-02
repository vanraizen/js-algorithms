var expect = require('chai').expect,
    regex = require('../regex');

describe('Regex Tests', function() {

    describe('Search Highlighting', function () {

        it('Basic search', function () {
            expect(regex.simpleSearchHighlight('cheese', 'menu: (1) meat lovers pizza (2) cheese lovers pizza (3) veggie lovers pizza. Extra cheese available'))
                .to.equal('menu: (1) meat lovers pizza (2) <b>cheese</b> lovers pizza (3) veggie lovers pizza. Extra <b>cheese</b> available');
        });

        it('Basic search custom highlight tag', function () {
            expect(regex.simpleSearchHighlight('cheese', 'menu: (1) meat lovers pizza (2) cheese lovers pizza (3) veggie lovers pizza. Extra cheese available', 'span'))
                .to.equal('menu: (1) meat lovers pizza (2) <span>cheese</span> lovers pizza (3) veggie lovers pizza. Extra <span>cheese</span> available');
        });
    });

    describe('Tag attribute replace', function () {

        it('Change width', function () {
            expect(regex.changeWidthAttributeValue('<div width="100" height="100"></div>', 200)).to.equal('<div width="200" height="100"></div>');
        });
    });

    describe('Utilities', function () {

        it('Trim', function () {
            expect(regex.trim('    this is a test     ')).to.equal('this is a test');
        });

    });
});
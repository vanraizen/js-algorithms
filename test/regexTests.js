var expect = require('chai').expect,
    regex = require('../misc/regex');

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

        it('Is Valid Email Address', function () {
            expect(regex.isEmail('test@test.com')).to.equal(true);
            expect(regex.isEmail('test@@test.com')).to.equal(false);
            expect(regex.isEmail('t!est@test.com')).to.equal(false);
            expect(regex.isEmail('test@test@test.com')).to.equal(false);
            expect(regex.isEmail('.com@test.com')).to.equal(false);
        });
    });

    describe('Parse File System', function () {

        it('Test Small Sample', function () {
            var input = ["dir1/dir2///dir3/file1.jpg", "dir1/dir2///dir3/file2.jpg", "dir1/dir2///file3.jpg", "dir1/file4.jpg"],
                expectedResult = {
                    dir1: {
                        dir2: {
                            dir3: {
                                'file1.jpg': true,
                                'file2.jpg': true
                            },
                            'file3.jpg': true
                        },
                        'file4.jpg': true
                    }
                };

            expect(regex.parseFileSystem(input)).to.eql(expectedResult);
        });
    });
});
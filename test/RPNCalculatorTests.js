var expect = require('chai').expect,
    RPNCalculator = require('../misc/RPNCalculator');

describe('RPN Calculator Tests', function() {

    var calculator;

    before(function () {
        calculator = new RPNCalculator();
    });

    beforeEach(function() {
        calculator.clear();
    });

    it('Test Adding Invalid Input', function () {
        expect(function(){calculator.in("this is not a number")}).to.throw(Error, "Input must be a valid number");
    });

    it('Test Operation with no Input', function () {
        expect(function(){calculator.in('+')}).to.throw(Error, "Input must be a valid number");
    });

    it('Test Operation with not enough input', function () {
        calculator.in(5);
        expect(function(){calculator.in('+')}).to.throw(Error, "Input must be a valid number");
    });

    it('Test Adding Positive Numbers to Queue', function () {
        calculator.in(5);
        calculator.in(8);
        expect(calculator.getStack()).to.eql([5,8]);
    });

    it('Test Adding Negative Numbers to Queue', function () {
        calculator.in(-3);
        calculator.in(-2);
        expect(calculator.getStack()).to.eql([-3,-2]);
    });

    it('Test Addition', function () {
        calculator.in(5);
        calculator.in(8);
        expect(calculator.in('+')).to.equal(13);
    });

    it('Test Multiplication', function () {
        calculator.in(-3);
        calculator.in(-2);
        expect(calculator.in('*')).to.equal(6);
    });

    it('Test Subtraction', function () {
        calculator.in(20);
        calculator.in(13);
        expect(calculator.in('-')).to.equal(7);
    });

    it('Test Division', function () {
        calculator.in(7);
        calculator.in(2);
        expect(calculator.in('/')).to.equal(3.5);
    });

    it('Test Multiple Operations 1', function () {
        calculator.in(-3);
        calculator.in(-2);
        calculator.in('*');
        calculator.in(5);
        expect(calculator.in('+')).to.equal(11);
    });

    it('Test Multiple Operations 2', function () {
        calculator.in(2);
        calculator.in(9);
        calculator.in(3);
        expect(calculator.in('+')).to.equal(12);
        expect(calculator.getStack()).to.eql([2, 12]);
        expect(calculator.in('*')).to.equal(24);
    });

    it('Test Multiple Operations 3', function () {
        calculator.in(20);
        calculator.in(13);
        calculator.in('-');
        calculator.in(2);
        expect(calculator.in('/')).to.equal(3.5);
    });

    it('Test Multiple Operations 4', function () {
        calculator.in(5);
        calculator.in(1);
        calculator.in(2);
        calculator.in('+');
        calculator.in(4);
        calculator.in('*');
        calculator.in('+');
        calculator.in(3);
        expect(calculator.in('-')).to.equal(14);
    });

    it('Test Multiple Operations 5', function () {
        calculator.in(4);
        calculator.in(2);
        calculator.in(5);
        calculator.in('*');
        calculator.in('+');
        calculator.in(1);
        calculator.in(3);
        calculator.in(2);
        calculator.in('*');
        calculator.in('+');
        expect(calculator.in('/')).to.equal(2);
    });
});

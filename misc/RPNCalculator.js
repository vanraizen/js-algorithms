module.exports = RPNCalculator;

function RPNCalculator() {

    var stack = [];

    this.clear = function () {
        stack = [];
    };

    this.getStack = function () { return stack; };

    /**
     * Processes an input token, after processing the result is returned.
     *
     * @param {string|Number} input  - Can either be an operation: ['+','-','*','/'] or a valid number
     * @returns {Number} result - Output of calculation
     * @throws {Error} - Thrown if invalid input or an invalid operation passed in
     */
    this.in = function (input) {
        var result;

        switch (input) {
            case '+':
                result = operation(add);
                break;
            case '*':
                result = operation(multiply);
                break;
            case '-':
                result = operation(subtract);
                break;
            case '/':
                result = operation(divide);
                break;
            default:
                input = Number(input);
                if (isNaN(input)) {
                    throw new Error("Input must be a valid number");
                } else {
                    stack.push(input);
                    result = input;
                }
        }

        return result;
    };

    //Private method to handle operations
    function operation (fn) {
        var result,
            operand1,
            operand2;
        if (stack.length < 2) {
            throw new Error("Input must be a valid number");
        }
        operand2 = stack.pop();
        operand1 = stack.pop();
        result = fn(operand1, operand2);
        stack.push(result);
        return result;
    }
}

function add(operand1, operand2) { return operand1 + operand2; }
function subtract(operand1, operand2) { return operand1 - operand2; }
function multiply(operand1, operand2) { return operand1 * operand2; }
function divide(operand1, operand2) { return operand1 / operand2; }
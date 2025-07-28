const display = document.getElementById('display');
const buttons = document.querySelectorAll('.bttns button');

let currentExpression = '';
let lastResult = '';
let equalsPressed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        const lastChar = currentExpression.slice(-1);

        if (buttonText === 'AC') {
            currentExpression = '';
            display.value = '';
            equalsPressed = false;
            return;
        }

        if (buttonText === 'DE') {
            currentExpression = currentExpression.slice(0, -1);
            display.value = currentExpression;
            equalsPressed = false;
            return;
        }

        if (buttonText === 'Ans') {
            if (lastResult !== '') {
                if (equalsPressed || currentExpression === '') {
                    currentExpression = lastResult;
                } else {
                    currentExpression += lastResult;
                }
                display.value = currentExpression;
                equalsPressed = false;
            }
            return;
        }

        if (buttonText === '=') {
            if (currentExpression === '') return;

            try {
                let evalExpression = currentExpression.replace(/%/g, '/100');
                const result = eval(evalExpression);

                if (isNaN(result) || !isFinite(result)) {
                    display.value = 'Error';
                    currentExpression = '';
                } else {
                    display.value = result;
                    currentExpression = result.toString();
                    lastResult = result.toString();
                    equalsPressed = true;
                }
            } catch (error) {
                display.value = 'Error';
                currentExpression = '';
            }
            return;
        }

        if (equalsPressed && !['+', '-', '*', '/', '%'].includes(buttonText)) {
            currentExpression = buttonText;
            equalsPressed = false;
        } else if (equalsPressed && ['+', '-', '*', '/', '%'].includes(buttonText)) {
            currentExpression = lastResult + buttonText;
            equalsPressed = false;
        } else if (buttonText === '.') {
            const parts = currentExpression.split(/[\+\-\*\/%]/);
            const lastNumberPart = parts[parts.length - 1];
            if (lastNumberPart.includes('.') || lastNumberPart === '') {
                return;
            }
            currentExpression += buttonText;
        } else if (
            ['+', '-', '*', '/', '%'].includes(buttonText) &&
            ['+', '-', '*', '/', '%'].includes(lastChar)
        ) {
            currentExpression = currentExpression.slice(0, -1) + buttonText;
        } else {
            currentExpression += buttonText;
        }

        display.value = currentExpression;
    });
});
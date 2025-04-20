document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let shouldResetDisplay = false;

    // 添加按钮点击动画
    function addButtonAnimation(button) {
        button.classList.add('button-press');
        setTimeout(() => button.classList.remove('button-press'), 200);
    }

    // 显示错误动画
    function showError() {
        display.classList.add('error');
        setTimeout(() => display.classList.remove('error'), 1500);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            addButtonAnimation(button);
            
            if (button.classList.contains('number')) {
                handleNumber(button.textContent);
            } else if (button.classList.contains('operator')) {
                handleOperator(button.textContent);
            } else if (button.classList.contains('equals')) {
                handleEquals();
            } else if (button.classList.contains('decimal')) {
                handleDecimal();
            } else if (button.classList.contains('clear')) {
                handleClear();
            }
        });
    });

    function handleNumber(num) {
        if (shouldResetDisplay) {
            display.value = num;
            shouldResetDisplay = false;
        } else {
            display.value = display.value === '0' ? num : display.value + num;
        }
        currentInput = display.value;
    }

    function handleOperator(op) {
        if (operation !== null) {
            handleEquals();
        }
        previousInput = display.value;
        operation = op;
        shouldResetDisplay = true;
    }

    function handleEquals() {
        if (operation === null || shouldResetDisplay) return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 'Error';
                break;
        }

        display.value = result;
        operation = null;
        previousInput = '';
        currentInput = result;
        shouldResetDisplay = true;
    }

    function handleDecimal() {
        if (!display.value.includes('.')) {
            display.value += '.';
            currentInput = display.value;
            shouldResetDisplay = false;
        }
    }

    function handleClear() {
        display.value = '0';
        currentInput = '';
        previousInput = '';
        operation = null;
        shouldResetDisplay = false;
    }
});
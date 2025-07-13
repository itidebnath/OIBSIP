const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let resetNext = false;

function updateDisplay() {
  display.value = currentInput || '0';
}

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const value = this.getAttribute('data-value');

    if (this.id === 'clear') {
      currentInput = '';
      updateDisplay();
      return;
    }

    if (this.id === 'equals') {
      try {
        
        let result = eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*'));
        
        if (result === undefined || isNaN(result)) {
          result = '';
        }
        currentInput = result.toString();
        updateDisplay();
        resetNext = true;
      } catch (e) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
          currentInput = '';
          updateDisplay();
        }, 1000);
      }
      return;
    }

    
    if (value === '.') {
      const parts = currentInput.split(/[\+\-\*\/]/);
      const last = parts[parts.length - 1];
      if (last.includes('.')) return;
    }

    
    if (resetNext && !isNaN(value)) {
      currentInput = '';
      resetNext = false;
    }

    currentInput += value;
    updateDisplay();
  });
});


updateDisplay();
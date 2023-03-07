const inputs = document.querySelectorAll('.form-control');
const targetWord = 'apple'; // Change this to the desired target word

let currentIndex = 0;

inputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    const currentInput = event.target;
    const inputValue = currentInput.value.trim();

    // If the current input has a value, move focus to the next input
    if (inputValue) {
      const nextInput = inputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }

    

    // Compare the user input with the target word after every 5th letter
    if (currentIndex % 5 === 4) {
      const userWord = inputs
        .map(input => input.value.trim())
        .join('');
      
      for (let i = 0; i < inputs.length; i++) {
        const inputLetter = userWord[i];
        const targetLetter = targetWord[i];

        if (inputLetter === targetLetter) {
          inputs[i].style.backgroundColor = '#c3e6cb'; // Green
        } else if (targetWord.includes(inputLetter)) {
          inputs[i].style.backgroundColor = '#ffeeba'; // Yellow
        } else {
          inputs[i].style.backgroundColor = '#d6d8d9'; // Grey
        }
      }
    }

    currentIndex++;
  });
});

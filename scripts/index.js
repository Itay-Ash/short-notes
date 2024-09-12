const inputs = document.querySelectorAll('.input-note');

//Makes placeholder appear only on hover
inputs.forEach(input => {
  const placeholderText = input.getAttribute('placeholder');
  input.setAttribute('placeholder', '')

  // Add event listener for mouseenter (hover)
  input.addEventListener('mouseenter', function() {
    input.setAttribute('placeholder', placeholderText); // Show placeholder on hover
  });

  // Add event listener for mouseleave
  input.addEventListener('mouseleave', function() {
    input.setAttribute('placeholder', ''); // Hide placeholder when not hovering
  });
});

     // Function to detect Hebrew characters
     function containsHebrew(text) {
        return /[\u0590-\u05FF]/.test(text); // Unicode range for Hebrew characters
      }
  
      inputs.forEach(input => {
        input.addEventListener('input', function() {
          let currentValue = input.value;
  
          // Ensure the text starts with an asterisk
          if (currentValue && !currentValue.startsWith('●')) {
            currentValue = '●' + currentValue;
            input.value = currentValue;
          }
  
          // Remove the asterisk if it's the only character
          if (currentValue === '●') {
            input.value = ''; // Clear the input if only '●' is present
          }
  
          // Check if the input contains Hebrew and set text direction and alignment
          if (containsHebrew(currentValue)) {
            input.style.direction = 'rtl';  // Right-to-left for Hebrew text
            input.style.textAlign = 'right'; // Align text to the right for Hebrew
          } else {
            input.style.direction = 'ltr';  // Left-to-right for non-Hebrew text
            input.style.textAlign = 'left';  // Align text to the left for non-Hebrew
          }
        });
  
        // Handle pasting text into the input
        input.addEventListener('paste', function(e) {
          setTimeout(() => {
            let pastedValue = input.value;
  
            // Ensure the pasted value starts with an asterisk
            if (!pastedValue.startsWith('●')) {
              pastedValue = '●' + pastedValue;
              input.value = pastedValue;
            }
  
            // Remove the asterisk if it's the only character
            if (pastedValue === '●') {
              input.value = ''; // Clear the input if only '●' is present
            }
  
            // Check if the pasted value contains Hebrew and adjust direction and alignment
            if (containsHebrew(pastedValue)) {
              input.style.direction = 'rtl';
              input.style.textAlign = 'right';
            } else {
              input.style.direction = 'ltr';
              input.style.textAlign = 'left';
            }
          }, 0);
        });
      });
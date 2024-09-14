const inputs = document.querySelectorAll('.input-note');

// Function to detect Hebrew characters
function containsHebrew(text) {
  return /[\u0590-\u05FF]/.test(text); // Unicode range for Hebrew characters
}

  // Function to load data from localStorage
  function loadData() {
    const savedData = localStorage.getItem('inputData');
    if (savedData) {
      const savedValues = savedData.split('\n'); // Assuming data is line-separated
      inputs.forEach((input, index) => {
        input.value = savedValues[index] || '';
      });
    }
  }

  // Function to save data to localStorage
  function saveData() {
    const content = Array.from(inputs).map(input => input.value).join('\n');
    localStorage.setItem('inputData', content);
  }

  
  // Load data when the page loads
  loadData();


inputs.forEach(input => {

  // Makes placeholder appear only on hover
  const placeholderText = input.getAttribute('placeholder');
  input.setAttribute('placeholder', ''); // Hides placeholder initially

  input.addEventListener('mouseenter', function() {
    input.setAttribute('placeholder', placeholderText); // Show placeholder on hover
  });

  input.addEventListener('mouseleave', function() {
    input.setAttribute('placeholder', ''); // Hide placeholder when not hovering
  });
  /////////////////////////////////////////////////////////////////////

  // Makes start_char appear
  // Fixed text direction based on English and Hebrew
  const start_char = '●';

  function manage_start_char(currentValue) {
    // Ensure the text starts with start_char
    if (currentValue && !currentValue.startsWith(start_char)) {
      currentValue = start_char + currentValue;
      input.value = currentValue;
    }

    // Remove the start_char if it's the only character
    if (currentValue === start_char) {
      input.value = '';
    }
  }

  function shift_text(currentValue) {
    // Check if the input contains Hebrew and set text direction and alignment
    if (containsHebrew(currentValue)) {
      input.style.direction = 'rtl';  // Right-to-left for Hebrew text
      input.style.textAlign = 'right'; // Align text to the right for Hebrew
    } else {
      input.style.direction = 'ltr';  // Left-to-right for non-Hebrew text
      input.style.textAlign = 'left';  // Align text to the left for non-Hebrew
    }
  }

  input.addEventListener('input', function() {
    //Save Data on input change
    saveData();
    //Change text accordingly
    let currentValue = input.value;
    manage_start_char(currentValue);
    shift_text(currentValue);
  });

  // Handle pasting text into the input
  input.addEventListener('paste', function(e) {
    //Save Data on input change
    saveData();
    //Change text accordingly
    let currentValue = input.value;
    manage_start_char(currentValue);
    shift_text(currentValue);
  });
  ////////////////////////////////////////////////////


});


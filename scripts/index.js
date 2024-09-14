const inputs = document.querySelectorAll('.input-note');
const start_char = '●';

// Function to detect Hebrew characters
function containsHebrew(text) {
  return /[\u0590-\u05FF]/.test(text); // Unicode range for Hebrew characters
}

// Function to Check if the input contains Hebrew and set text direction and alignment
function shift_text_by_language(input, currentValue) {
  if (containsHebrew(currentValue)) {
    input.style.direction = 'rtl';  // Right-to-left for Hebrew text
    input.style.textAlign = 'right'; // Align text to the right for Hebrew
  } else {
    input.style.direction = 'ltr';  // Left-to-right for non-Hebrew text
    input.style.textAlign = 'left';  // Align text to the left for non-Hebrew
  }
}

// Function to Ensure the text starts with start_char
function manage_start_char(input, currentValue) {
  if (currentValue && !currentValue.startsWith(start_char)) {
    currentValue = start_char + currentValue;
    input.value = currentValue;
  }

  // Remove the start_char if it's the only character
  if (currentValue === start_char) {
    input.value = '';
  }
}
  //Function to Make the placeholder appear only on hover
  function manage_placeholder_visibility(input){
    const placeholderText = input.getAttribute('placeholder');

    input.setAttribute('placeholder', ''); // Hides placeholder initially
  
    input.addEventListener('mouseenter', function() {
      input.setAttribute('placeholder', placeholderText); // Show placeholder on hover
    });
    input.addEventListener('mouseleave', function() {
      input.setAttribute('placeholder', ''); // Hide placeholder when not hovering
    });
}

//Function to manage all neccesary changes and loads on inputs
function general_input_management(input){
    // Save Data on input change
    saveData();
    // Change text accordingly
    let currentValue = input.value;
    manage_start_char(input, currentValue);
    shift_text_by_language(input, currentValue);
}

// Function to save data to localStorage
function saveData() {
  const content = Array.from(inputs).map(input => input.value).join('\n');
  localStorage.setItem('inputData', content);
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

// Load data when the page loads
loadData();

inputs.forEach(input => {
  
  manage_placeholder_visibility(input)

  input.addEventListener('input', function() {
    general_input_management(input);
  });

  input.addEventListener('paste', function(e) {
    general_input_management(input);
  });

});

const inputNotes = document.querySelectorAll('.input-note');
const startChar = '●';
const savedData = localStorage.getItem('inputData');
const savedValues = savedData ? savedData.split('\n') : [];
const PositiveDirection = 1
const NegativeDirection = -1

// Function to detect Hebrew characters
function containsHebrew(text) {
  return /[\u0590-\u05FF]/.test(text); // Unicode range for Hebrew characters
}

// Function to check if the input contains Hebrew and set text direction and alignment
function adjustTextDirection(input, text) {
  if (containsHebrew(text)) {
    input.style.direction = 'rtl';  // Right-to-left for Hebrew text
    input.style.textAlign = 'right'; // Align text to the right for Hebrew
  } else {
    input.style.direction = 'ltr';  // Left-to-right for non-Hebrew text
    input.style.textAlign = 'left';  // Align text to the left for non-Hebrew
  }
}

// Function to ensure the text starts with startChar
function ensureStartChar(input, text) {
  if (text && !text.startsWith(startChar)) {
    input.value = startChar + text;
  }

  // Remove startChar if it's the only character
  if (text === startChar) {
    input.value = '';
  }
}

// Function to handle placeholder visibility on hover
function handlePlaceholderVisibility(input) {
  const placeholderText = input.getAttribute('placeholder');
  input.setAttribute('placeholder', ''); // Hide placeholder initially

  input.addEventListener('mouseenter', function() {
    input.setAttribute('placeholder', placeholderText); // Show placeholder on hover
  });

  input.addEventListener('mouseleave', function() {
    input.setAttribute('placeholder', ''); // Hide placeholder when not hovering
  });
}

// Function to manage input events (save data, adjust text direction, and ensure startChar)
function handleTextInputEvents(input) {
  saveInputData(); // Save input data to localStorage
  const text = input.value;
  ensureStartChar(input, text); // Ensure text starts with startChar
  adjustTextDirection(input, text); // Adjust text direction based on language
}

function moveOneNote(index, direction){
  //Direction decides if the movment will be towards positive or negative.
  NoteIndex = index + (1 * direction)
  
  if (NoteIndex < 0)
    NoteIndex = inputNotes.length - 1
  else if (NoteIndex >= inputNotes.length)
    NoteIndex = 0;
  const nextInputNote = inputNotes[NoteIndex];
  nextInputNote.focus()
}

// Function to save input data to localStorage
function saveInputData() {
  const content = Array.from(inputNotes).map(input => input.value).join('\n');
  localStorage.setItem('inputData', content);
}

// Function to load saved data into inputs
function loadInputData(input, index) {
  if (savedData && savedValues[index]) {
    input.value = savedValues[index];
    handleTextInputEvents(input); // Ensure text and direction are adjusted after loading
  }
}

// Initialize functionality for all input elements (notes)
inputNotes.forEach((input, index) => {
  // 1. Load saved data for each input field
  loadInputData(input, index);
  
  // 2. Manage placeholder visibility on hover
  handlePlaceholderVisibility(input);

  // 3. Add event listeners for input and paste events
  input.addEventListener('input', () => {
    handleTextInputEvents(input);
  });

  input.addEventListener('paste', () => {
    handleTextInputEvents(input);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
      event.preventDefault();
      moveOneNote(index, PositiveDirection)
    }

    if (event.key == 'ArrowDown'){
      event.preventDefault();
      moveOneNote(index, PositiveDirection)
    }

    if(event.key == "ArrowUp"){
      event.preventDefault();
      moveOneNote(index, NegativeDirection)
    }
  });
});

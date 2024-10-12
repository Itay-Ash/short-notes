const startChar = '●';
const positiveDirection = 1;
const negativeDirection = -1;
const buttonSelectClassName = "selected-menu-button"

const inputNotes = document.querySelectorAll('.input-note');
const MenuButtons = document.querySelectorAll('.menu-button');
const thElements = document.querySelectorAll('.notes-header th');

let notesindex = 0;
const notesTitle = Array.from(thElements).map(th => th.id); //An array of all notes title, all ths.
let savedData = localStorage.getItem(notesTitle[notesindex]);
const savedValues = savedData ? savedData.split('\n') : [];

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

  input.addEventListener('mouseenter', function () {
    input.setAttribute('placeholder', placeholderText); // Show placeholder on hover
  });

  input.addEventListener('mouseleave', function () {
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

//Function to move One Note up or down
function moveOneNote(index, direction) {
  //Direction decides if the movment will be towards positive or negative.
  NoteIndex = index + (1 * direction)

  if (NoteIndex < 0)
    NoteIndex = inputNotes.length - 1
  else if (NoteIndex >= inputNotes.length)
    NoteIndex = 0;
  const nextInputNote = inputNotes[NoteIndex];
  nextInputNote.focus()
}

//Function to retrive MainURL and place it inside the site-title variable.
async function retriveMainURL() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  const FullURL = tab.url;
  // String manipulation to extract the main URL
  let protocolEndIndex = FullURL.indexOf("://") + 3; // Find the end of the protocol
  let hostEndIndex = FullURL.indexOf("/", protocolEndIndex); // Find the end of the host

  // Handle case where there is no path (like "https://example.com")
  if (hostEndIndex === -1) {
    hostEndIndex = FullURL.length; // Use the full length if no path
  }

  let mainURL = FullURL.substring(protocolEndIndex, hostEndIndex); // Extract the main URL

  //Names site-title by the current URL
  document.getElementById('site-title').textContent = mainURL;
}

// Function to save input data to localStorage
function saveInputData() {
  const content = Array.from(inputNotes).map(input => input.value).join('\n');
  // Saving notes by site name/general
  localStorage.setItem(notesTitle[notesindex], content);
}

// Function to load saved data into inputs
function loadInputData(input, index) {
  if (savedData && savedValues[index]) {
    input.value = savedValues[index];
    handleTextInputEvents(input); // Ensure text and direction are adjusted after loading
  }
}

MenuButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const isButtonSelected = button.classList.contains(buttonSelectClassName);

    // If the button is not already selected
    if (!isButtonSelected) {
      // Remove the class from all other buttons
      MenuButtons.forEach(btn => btn.classList.remove(buttonSelectClassName));

      // Add the selected class to the clicked button
      button.classList.add(buttonSelectClassName);

      //Changed NotesIndex to LoadData
      notesindex = index;
    }
  });
});

//Retrive Main Url for url title
retriveMainURL();

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
    if (event.key === 'Enter') {
      event.preventDefault();
      moveOneNote(index, positiveDirection)
    }

    if (event.key == 'ArrowDown') {
      event.preventDefault();
      moveOneNote(index, positiveDirection)
    }

    if (event.key == "ArrowUp") {
      event.preventDefault();
      moveOneNote(index, negativeDirection)
    }
  });
});

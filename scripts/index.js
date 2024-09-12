const inputs = document.querySelectorAll('.input-note');

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
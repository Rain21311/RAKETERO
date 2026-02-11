<script>
function performSearch() {
  // 1. Kuhanin ang text mula sa search bar
  const query = document.getElementById('jobSearchInput').value.toLowerCase();
  
  // 2. Kuhanin lahat ng job containers (lahat ng may class na group-6, group-8, etc.)
  // Sa structure mo, ang mga job cards ay may class na 'JOB-loren-epsum'
  const jobCards = document.querySelectorAll('[class^="group-"]');

  if (query === "") {
    alert("Please enter a keyword to search.");
    return;
  }

  let found = false;
  
  jobCards.forEach(card => {
    const jobTitle = card.querySelector('.JOB-loren-epsum');
    if (jobTitle) {
      const text = jobTitle.innerText.toLowerCase();
      
      // 3. I-hide ang card kung hindi match, ipakita kung match
      if (text.includes(query)) {
        card.style.display = "block";
        found = true;
      } else {
        // Siguraduhin na hindi natin maitatago ang header o footer elements
        if (card.classList.contains('group-5') || card.classList.contains('group') || card.classList.contains('group-4')) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    }
  });

  if (!found) {
    alert("No jobs found for: " + query);
  }
}

// Para gumana rin ang search kapag pinindot ang "Enter" key
document.getElementById('jobSearchInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    performSearch();
  }
});
</script>

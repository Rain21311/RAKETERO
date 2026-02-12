<script>
function performSearch() {
  // Kuhanin ang text mula sa search bar
  const query = document.getElementById('jobSearchInput').value.toLowerCase().trim();
  
  // Kuhanin lahat ng job containers
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
      
      // I-hide ang card kung hindi match, ipakita kung match
      if (text.includes(query)) {
        card.style.display = "block";
        card.style.visibility = "visible";
        found = true;
      } else {
        // Siguraduhin na hindi natin maitatago ang header o footer elements
        if (card.classList.contains('group-5') || 
            card.classList.contains('group') || 
            card.classList.contains('group-4')) {
          card.style.display = "block";
          card.style.visibility = "visible";
        } else {
          card.style.display = "none";
          card.style.visibility = "hidden";
        }
      }
    }
  });

  if (!found) {
    alert("No jobs found for: " + query);
  }
}

// Para gumana rin ang search kapag pinindot ang "Enter" key
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('jobSearchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
});
</script>

<style>
/* Ensure scrolling works properly */
body, html {
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

/* Job cards container - allow horizontal scroll */
.job-container {
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling sa iOS */
}

/* Job card styling */
[class^="group-"] {
  flex-shrink: 0;
  min-width: 280px; /* Prevent shrinking below this width */
  margin: 10px;
  transition: opacity 0.3s ease;
}

[class^="group-"]:disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Mobile optimization */
@media (max-width: 768px) {
  [class^="group-"] {
    min-width: 250px;
  }
  
  body {
    -webkit-user-select: none;
    user-select: none;
  }
}
</style>
function performSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Implement your search logic here
  const cards = document.querySelectorAll(".card");
  const searchResults = document.getElementById("searchResults");

  // Clear previous results
  searchResults.innerHTML = "";

  cards.forEach(card => {
    const cardTitle = card.querySelector("h2").textContent.toLowerCase();
    if (cardTitle.includes(searchTerm)) {
      card.style.display = "block";
      searchResults.innerHTML += `<li class="result-item">${cardTitle}</li>`; // Add matching titles to results
    } else {
      card.style.display = "none";
    }
  });

  // Show or hide search results based on findings
  if (searchResults.innerHTML === "") {
    searchResults.innerHTML = "<p>No results found.</p>";
    searchResults.classList.add("active"); // Show results container
  } else {
    searchResults.classList.remove("active"); // Hide results if subsequent searches are empty
  }
}

// Add event listener to the search button
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", performSearch);
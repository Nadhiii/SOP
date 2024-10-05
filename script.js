let jsonData = [];

// Fetching the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data; // Store the fetched data in jsonData
    })
    .catch(error => console.error('Error fetching data:', error));

// Event listener for search input to show suggestions
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    if (query) {
        const filteredData = jsonData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(query))
        );

        if (filteredData.length > 0) {
            suggestionsContainer.style.display = 'block'; // Show suggestions
            filteredData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.title; // Display only the title
                li.addEventListener('click', () => {
                    document.getElementById('search-input').value = item.title; // Set input value to the clicked suggestion
                    suggestionsContainer.style.display = 'none'; // Hide suggestions after selection
                    performSearch(); // Perform search with the selected title
                });
                suggestionsContainer.appendChild(li);
            });
        } else {
            suggestionsContainer.style.display = 'none'; // No suggestions found
        }
    } else {
        suggestionsContainer.style.display = 'none'; // Hide if no query
    }
});

// Function to perform search
function performSearch() {
    const searchInput = document.getElementById("search-input"); // Updated ID
    const searchTerm = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".card");
    const searchResults = document.getElementById("searchResults");

    // Clear previous results
    searchResults.innerHTML = "";

    let hasResults = false; // Flag to check if any results are found

    cards.forEach(card => {
        const cardTitle = card.querySelector("h2").textContent.toLowerCase();
        if (cardTitle.includes(searchTerm)) {
            card.style.display = "block"; // Show matching card
            hasResults = true; // Set flag to true when results are found
        } else {
            card.style.display = "none"; // Hide non-matching card
        }
    });

    // Show search result message if no matching cards
    if (!hasResults) {
        searchResults.innerHTML = "<p>No results found.</p>";
        searchResults.classList.add("active"); // Show results container
    } else {
        searchResults.classList.remove("active"); // Hide the message if results are found
    }
}

// Add event listener to the search button
const searchButton = document.querySelector(".search-button"); // Target the correct button
searchButton.addEventListener("click", performSearch);

// Add event listener for Enter key
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch(); // Trigger search on Enter key
    }
});

// Hide results when clicking outside of search results or suggestions
document.addEventListener('click', function(event) {
    const resultsContainer = document.getElementById('searchResults');
    const suggestionsContainer = document.getElementById('suggestions');
    const searchInput = document.getElementById('search-input');

    // Check if the click was outside the search input, results, or suggestions
    if (
        !searchInput.contains(event.target) &&
        !resultsContainer.contains(event.target) &&
        !suggestionsContainer.contains(event.target)
    ) {
        resultsContainer.style.display = 'none'; // Hide search results
        suggestionsContainer.style.display = 'none'; // Hide suggestions
    }
});

// Optional: Hide search results on input focus
document.getElementById('search-input').addEventListener('focus', function() {
    const resultsContainer = document.getElementById('searchResults');
    const suggestionsContainer = document.getElementById('suggestions');
    
    resultsContainer.style.display = 'block'; // Show results when input is focused
    suggestionsContainer.style.display = 'block'; // Show suggestions when input is focused
});

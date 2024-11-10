// Fetch quotes from a file
async function fetchQuotes() {
    try {
        const response = await fetch('quotes.quotes'); // Ensure this file is accessible on the server
        const data = await response.text();
        
        // Split the file content into lines, treating each line as a quote
        const quotes = data.split('\n').map(line => line.trim()).filter(line => line);

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        console.log("Today's Date:", today);
        
        // Check localStorage for a saved quote and date
        const savedQuote = localStorage.getItem('quoteOfTheDay');
        const savedDate = localStorage.getItem('quoteDate');
        console.log("Saved Date:", savedDate);
        console.log("Saved Quote:", savedQuote);

        // If today's quote is already saved, display it
        if (savedQuote && savedDate === today) {
            console.log("Using saved quote for today.");
            document.getElementById("quote").innerText = savedQuote;
        } else {
            // Otherwise, select a new random quote
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            console.log("Selected New Quote:", randomQuote);
            
            // Update HTML with the new quote
            document.getElementById("quote").innerText = randomQuote;
            
            // Save the new quote and today's date in localStorage
            localStorage.setItem('quoteOfTheDay', randomQuote);
            localStorage.setItem('quoteDate', today);
        }
    } catch (error) {
        console.error("Error fetching quotes:", error);
        document.getElementById("quote").innerText = "please dm me QOUTES ARENT FREAKING WORKING.";
    }
}

// Load a quote on page load
fetchQuotes();
// Chatgpt doesn't understand simple requests... It was supposed to refresh daily, not every refresh!
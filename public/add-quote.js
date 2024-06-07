const submitButton = document.getElementById("submit-quote");
const newQuoteContainer = document.getElementById("quote-container");
const quoteInput = document.getElementById("quote");
const personInput = document.getElementById("person");
const yearInput = document.getElementById("year");

const resetQuotes = () => {
  newQuoteContainer.innerHTML = "";
};

submitButton.addEventListener("click", () => {
  const quote = quoteInput.value.trim();
  const person = personInput.value.trim();
  const year = yearInput.value.trim();

  if (quote && person && year) {
    errorMessage.style.display = "none";
    newQuoteContainer.style.display = "block";
    fetch(`/api/quotes?quote=${quote}&person=${person}&year=${year}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: quote,
        person: person,
        year: year,
      }),
    })
      .then((response) => response.json())
      .then(({ quote }) => {
        resetQuotes();

        const newQuote = document.createElement("div");
        newQuote.innerHTML = `
          <h3>Congrats, your quote was added!</h3>
          <div class="quote-text">${quote.quote}</div>
          <div class="attribution">- ${quote.person}</div>
          <div class="year">${quote.year}</div>
          <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
          `;
        newQuoteContainer.appendChild(newQuote);
        quoteInput.value = "";
        personInput.value = "";
        yearInput.value = "";
      });
  } else {
    errorMessage.style.display = "block";
    newQuoteContainer.style.display = "none";
  }
});

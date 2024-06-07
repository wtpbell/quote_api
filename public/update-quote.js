const submit = document.getElementById("submit-quote");
const updateQuoteContainer = document.getElementById("quote-container");
const errorMessage = document.getElementById("errorMessage");
const idInput = document.getElementById("id");
const quoteInput = document.getElementById("quote");
const personInput = document.getElementById("person");
const yearInput = document.getElementById("year");

const resetQuotes = () => {
  updateQuoteContainer.innerHTML = "";
};

submit.addEventListener("click", () => {
  const id = idInput.value.trim();
  const quote = quoteInput.value.trim();
  const person = personInput.value.trim();
  const year = yearInput.value.trim();

  if (quote && person && year) {
    errorMessage.style.display = "none";
    newQuoteContainer.style.display = "block";
    fetch(`/api/quotes/${id}`, {
      method: "PUT",
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
        const updatedQuote = document.createElement("div");
        updatedQuote.innerHTML = `
            <h3 class='congratulation>Congrats, the quote was updated!</h3>
            Quote id: ${quote.id}. <blockquote class="quote-text">${quote.quote}</blockquote>
            <div class="quote-text">~ ${quote.quote}</div>
            <div class="attribution">- ${quote.person}</div>
            <div class="year">* ${quote.year}</div>
            <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
        `;
        updateQuoteContainer.appendChild(updatedQuote);
        id.value = "";
        quoteInput.value = "";
        personInput.value = "";
        yearInput.value = "";
      });
  } else {
    errorMessage.style.display = "block";
    newQuoteContainer.style.display = "none";
  }
});

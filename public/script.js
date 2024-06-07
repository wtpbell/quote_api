const fetchAllButton = document.getElementById("fetch-quotes");
const fetchRandomButton = document.getElementById("fetch-random");
const fetchByAuthorButton = document.getElementById("fetch-by-author");
const deleteByIdButton = document.getElementById("delete-by-id");

const quoteContainer = document.getElementById("quote-container");
const idInput = document.getElementById("deletionId");
const authorInput = document.getElementById("author");

const resetQuotes = () => {
  quoteContainer.innerHTML = "";
};

const renderError = (response) => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
};

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach((quote) => {
      const newQuote = document.createElement("div");
      newQuote.className = "single-quote";
      newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      <div class="year">- ${quote.year}</div>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = "<p>Your request returned no quotes.</p>";
  }
};

const renderDeleteMessage = () => {
  resetQuotes();
  idInput.value = "";
  const deleteQuote = document.createElement("div");
  deleteQuote.innerHTML = `
  <h3 class='congratulations> Congrats, selected quote is deleted successfully!</h3>
  <p class="centered-text">Click the 'Fetch all Quotes' button above to see the updated list of quotes.</p>
  `;
  quoteContainer.appendChild(deleteQuote);
};

fetchAllButton.addEventListener("click", () => {
  fetch("/api/quotes")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      renderQuotes(response.quotes);
    });
});

fetchRandomButton.addEventListener("click", () => {
  fetch("/api/quotes/random")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      renderQuotes([response.quote]);
    });
});

fetchByAuthorButton.addEventListener("click", () => {
  const author = document.getElementById("author").value.trim();
  fetch(`/api/quotes?person=${author}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      authorInput.value = "";
      renderQuotes(response.quotes);
    });
});

deleteByIdButton.addEventListener("click", () => {
  
  const id = idInput.value.trim();
  if (id) {
    fetch(`/api/quotes/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        return renderDeleteMessage();
      } else {
        return renderError(response);
      }
    });
  }
});

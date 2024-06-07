import express from "express";
import quotes from "../data.js";
import { getRandomElement, findIndexByQuote, findQuoteById } from "../utils.js";

const quotesRouter = express.Router();

const generateId = () => {
  let id = quotes.length + 1;
  return id;
};

quotesRouter.get("/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

quotesRouter.get("/", (req, res, next) => {
  const person = req.query.person;
  const personsQuotes = quotes.filter((quote) => quote.person === person);
  if (!person) {
    res.send({ quotes: quotes });
  } else if (personsQuotes) {
    res.send({ quotes: personsQuotes });
  } else {
    res.send({ quotes: [] });
  }
});

const validQuote = (req, res, next) => {
  const { person, quote, year } = req.body;
  if (!person || !quote || !year) {
    res.sendStatus(400);
  }
  next();
};

quotesRouter.post("/", validQuote, (req, res) => {
  const { quote, person, year } = req.body;
  const newQuote = {
    id: generateId(),
    quote: quote,
    person: person,
    year: year,
  };
  quotes.push(newQuote);
  console.log(newQuote);
  res.status(201).send({ quote: newQuote });
});

quotesRouter.put("/:id", validQuote, (req, res) => {
  const searchId = parseInt(req.params.id);
  const searchQuote = findQuoteById(searchId, quotes);
  const { person, quote, year } = req.body;

  if (searchQuote && person && quote && year) {
    const updatedQuote = {
      id: searchId,
      person: person,
      quote: quote,
      year: year,
    };
    const index = findIndexByQuote(searchId, quotes);
    quotes.splice(index, 1, updatedQuote);

    res.status(201).send({ quote: updatedQuote });
  }
});

quotesRouter.delete("/:id", (req, res) => {
  const searchId = parseInt(req.params.id);
  const searchQuote = findQuoteById(searchId, quotes);
  if (searchQuote) {
    const index = findQuoteById(searchId, quotes);
    quotes.splice(index, 1);
    for(let i = 0, j = 1; i < quotes.length; i++, j++) { 
        quotes[i].id = j;
    }
    res.sendStatus(204);
  } else {
    res.sendStatus(400)
  }
  
});

export default quotesRouter;

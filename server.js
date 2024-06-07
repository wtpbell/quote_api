import express from 'express';
import morgan from 'morgan';
import apiRouter from './api/api.js';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

export default app;
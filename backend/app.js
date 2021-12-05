/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); //логгер
app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});
app.post('/signin',
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8),
        }),
    }),
    login);
app.post('/signup',
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8),
            name: Joi.string().min(2).max(30),
            about: Joi.string().min(2).max(30),
            avatar: Joi.string().pattern(
                /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1,}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1,}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/,
            ),
        }),
    }),
    createUser);

app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res, next) => {
    next(new NotFound('Упс… Мы не можем найти то, что Вы ищете'));
});

app.use(errorLogger); //логгер

app.use(errors());
app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;

    res.status(statusCode).send({

        message: statusCode === 500 ? 'Произошла ошибка по умолчанию' : message,
    });
    next();
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    // console.log(BASE_PATH)
});
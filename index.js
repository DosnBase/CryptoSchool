const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const app = express();
const token = '; // Токен твоего бота
const bot = new TelegramBot(token, { polling: true });

app.use(express.static('public')); // Папка для HTML/CSS/JS

// Команда /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to Crypto School! Learn crypto and trade with YAR!', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Open Crypto School', web_app: { url: 'https://fc44d981-cc50-4d53-80ed-85b1c422f77b-00-1nm8ujthldfmq.kirk.replit.dev/public/index.html' } }
      ]]
    }
  });
});

// API для уроков
app.get('/lessons', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data.lessons);
});

// API для пользователей
app.get('/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data.users);
});

app.listen(3000, () => console.log('Server running on port 3000'));

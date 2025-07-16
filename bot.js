const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const portHttp = process.env.HTTP_PORT || 3000;
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(portHttp, () => console.log(`HTTP server on port ${portHttp}`));

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: parseInt(process.env.PORT) || 25565,
    username: process.env.USERNAME,
    version: false,
  });

  bot.on('spawn', () => console.log('✅ Bot 登入成功！'));
  bot.on('end', () => {
    console.log('🔁 Bot 斷線，5秒重連...');
    setTimeout(createBot, 5000);
  });
  bot.on('error', err => console.log('⚠️ 錯誤：', err.message));
}

createBot();

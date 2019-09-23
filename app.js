"use strict";

const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const RichMediaMessage = require("viber-bot").Message.RichMedia;

const express = require("express");
const app = express();
const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const setupDB = require("./config");
setupDB();

const User = require("./user");

const API_URL = "https://chatapi.viber.com/";

const API_ENDPOINTS = {
  setWebhook: "/set_webhook",
  getAccountInfo: "/get_account_info",
  getUserDetails: "/get_user_details",
  getOnlineStatus: "/get_online",
  sendMessage: "/send_message",
  post: "/post"
};

try {
  const bot = new ViberBot({
    authToken: process.env.VIBER_TOKEN,
    name: "LFT",
    avatar:
      "https://images.pexels.com/photos/2570495/pexels-photo-2570495.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" // It is recommended to be 720x720, and no more than 100kb.
  });

  bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(
      new TextMessage(
        `Привет, ${response.userProfile.name}! Я чат бот ${bot.name}! Напиши мне что-нибудь.`
      )
    );
  });

  bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    response.send(new TextMessage("Сообщение получено!"));
  });

  app.use("/viber/webhook", bot.middleware());

  const port = process.env.DB_PORT || 3000;

  app.listen(port, () => {
    console.log(`Приложение запущено на порту: ${port}`);

    bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
      console.log("Проверь подключен ли Ngrok?");
      console.error(error);
      process.exit(1);
    });
  });
} catch (e) {
  console.error("ошибка", e);
}

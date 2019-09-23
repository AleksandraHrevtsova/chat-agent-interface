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

const SAMPLE_KEYBOARD = {
  Type: "keyboard",
  Buttons: [
    {
      Columns: 2,
      Rows: 2,
      Text: '<br><font color="#494E67"><b>Banking</b></font>',
      TextSize: "large",
      TextHAlign: "center",
      TextVAlign: "middle",
      ActionType: "reply",
      ActionBody: "Banking",
      BgColor: "#f7bb3f",
      Image: "http://www.chakri.com/images/viber/banking.png"
      //"Image": "https://s18.postimg.org/9tncn0r85/sushi.png"
    },
    {
      Columns: 2,
      Rows: 2,
      Text: '<br><font color="#494E67"><b>Education</b></font>',
      TextSize: "large",
      TextHAlign: "center",
      TextVAlign: "middle",
      ActionType: "reply",
      ActionBody: "Agro",
      BgColor: "#7eceea",
      Image: "http://www.chakri.com/images/viber/education_chakri.png"
      //"Image": "https://s18.postimg.org/ntpef5syd/french.png"
    },
    {
      Columns: 2,
      Rows: 2,
      Text: '<br><font color="#494E67"><b>Bank</b></font>',
      TextSize: "large",
      TextHAlign: "center",
      TextVAlign: "middle",
      ActionType: "reply",
      ActionBody: "Bank",
      BgColor: "#f6f7f9",
      Image: "http://www.chakri.com/images/viber/engineer_chakri.png"
      //"Image": "https://s18.postimg.org/t8y4g4kid/mexican.png"
    },
    {
      Columns: 2,
      Rows: 2,
      Text: '<br><font color="#494E67"><b>Beauty Care</b></font>',
      TextSize: "large",
      TextHAlign: "center",
      TextVAlign: "middle",
      ActionType: "reply",
      ActionBody: "Beauty Care",
      BgColor: "#dd8157",
      Image: "http://www.chakri.com/images/viber/finance_chakri.png"
      //"Image": "https://s18.postimg.org/x41iip3o5/itallian.png"
    }
  ]
};

function say(response, message) {
  console.log("keyboard setup ");

  response.send(new TextMessage(message, SAMPLE_KEYBOARD));
}

function jobRichMessage(response, message) {
  console.log("rich message" + message);
  //response.send(new RichMediaMessage (message));
  message = [
    {
      Columns: 6,
      Rows: 3,
      ActionType: "open-url",
      ActionBody: "https://www.google.com",
      Image: "http://html-test:8080/myweb/guy/assets/imageRMsmall2.png"
    },
    {
      Columns: 6,
      Rows: 2,
      Text:
        "<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br>Sound Intone </font><font color=#6fc133>$17.99</font>",
      ActionType: "open-url",
      ActionBody: "https://www.google.com",
      TextSize: "medium",
      TextVAlign: "middle",
      TextHAlign: "left"
    },
    {
      Columns: 6,
      Rows: 1,
      ActionType: "reply",
      ActionBody: "https://www.google.com",
      Text: "<font color=#ffffff>Buy</font>",
      TextSize: "large",
      TextVAlign: "middle",
      TextHAlign: "middle",
      Image: "https://s14.postimg.org/4mmt4rw1t/Button.png"
    },
    {
      Columns: 6,
      Rows: 1,
      ActionType: "reply",
      ActionBody: "https://www.google.com",
      Text: "<font color=#8367db>MORE DETAILS</font>",
      TextSize: "small",
      TextVAlign: "middle",
      TextHAlign: "middle"
    },
    {
      Columns: 6,
      Rows: 3,
      ActionType: "open-url",
      ActionBody: "https://www.google.com",
      Image: "https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png"
    },
    {
      Columns: 6,
      Rows: 2,
      Text:
        "<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br>Hanes</font><font color=#6fc133>$10.99</font>",
      ActionType: "open-url",
      ActionBody: "https://www.google.com",
      TextSize: "medium",
      TextVAlign: "middle",
      TextHAlign: "left"
    },
    {
      Columns: 6,
      Rows: 1,
      ActionType: "reply",
      ActionBody: "https://www.google.com",
      Text: "<font color=#ffffff>Buy</font>",
      TextSize: "large",
      TextVAlign: "middle",
      TextHAlign: "middle",
      Image: "https://s14.postimg.org/4mmt4rw1t/Button.png"
    },
    {
      Columns: 6,
      Rows: 1,
      ActionType: "reply",
      ActionBody: "https://www.google.com",
      Text: "<font color=#8367db>MORE DETAILS</font>",
      TextSize: "small",
      TextVAlign: "middle",
      TextHAlign: "middle"
    }
  ];

  const SAMPLE_RICH_MEDIA = {
    ButtonsGroupColumns: 6,
    ButtonsGroupRows: 2,
    BgColor: "#FFFFFF",
    Buttons: message
  };

  const message_new = new RichMediaMessage(SAMPLE_RICH_MEDIA, SAMPLE_KEYBOARD);
  response.send(message_new);
}

try {
  const bot = new ViberBot({
    authToken: process.env.VIBER_TOKEN,
    name: "LFT",
    avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
  });
  //   bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => ... );
  //   bot.on(BotEvents.MESSAGE_SENT, (message, userProfile) => ... );
  //   bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => ... );
  //   bot.on(BotEvents.ERROR, err => ... );
  //   bot.on(BotEvents.UNSUBSCRIBED, response => ... );
  //   bot.on(BotEvents.SUBSCRIBED, response =>
  //       response.send(`Thanks for subscribing, ${response.userProfile.name}`));

  bot.on(BotEvents.SUBSCRIBED, async response => {
    console.log("profile", response.userProfile);

    const user = new User({
      profile: response.userProfile
    });

    await user.save();

    response.send(
      new TextMessage(
        `Hi ${response.userProfile.name}, please click Start to proceed`,
        new RichMediaMessage({
          Type: "keyboard",
          Revision: 1,
          Buttons: [
            {
              Columns: 3,
              Rows: 2,
              BgColor: "#e6f5ff",
              BgMedia:
                "http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg",
              BgMediaType: "picture",
              BgLoop: true,
              ActionType: "reply",
              ActionBody: "Yes"
            }
          ]
        })
      )
    );
  });

  // Perfect! Now here's the key part:
  //   bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
  // Echo's back the message to the client. Your bot logic should sit here.
  // try {
  //   response.send(
  //     new TextMessage("asd", {
  //       // "Type": "keyboard",
  //       // "ButtonsGroupColumns": 1,
  //       // "ButtonsGroupRows": 1,
  //       Revision: 1,
  //       Type: "keyboard",
  //       Buttons: [
  //         {
  //           Columns: 6,
  //           Rows: 1,
  //           Silent: false,
  //           BgColor: "#000",
  //           ActionType: "reply",
  //           ActionBody: "test",
  //           Text: (
  //             <font color="#000">
  //               <b>fhfghfgdh</b>
  //             </font>
  //           ),
  //           TextVAlign: "middle",
  //           TextHAlign: "center",
  //           TextSize: "large"
  //         }
  //       ]
  //     })
  //   );

  //   const resp = await axios.post(
  //     "https://chatapi.viber.com/pa/send_message",
  //     {
  //       receiver: response.userProfile.id,
  //       auth_token: process.env.VIBER_TOKEN,
  //       type: "text",
  //       text: "adsadsad",
  //       keyboard: {
  //         Type: "keyboard",
  //         // "ButtonsGroupColumns": 1,
  //         // "ButtonsGroupRows": 1,
  //         // 'Revision': 1,
  //         Buttons: [
  //           {
  //             Columns: 6,
  //             Rows: 1,
  //             Silent: false,
  //             BgColor: "#000",
  //             ActionType: "reply",
  //             ActionBody: "test",
  //             // Text: (
  //             //   <font color="#000">
  //             //     <b>fhfghfgdh</b>
  //             //   </font>
  //             // ),
  //             TextVAlign: "middle",
  //             TextHAlign: "center",
  //             TextSize: "large"
  //           }
  //         ]
  //       }
  //     }
  //   );

  //   console.log("resr", resp);
  // } catch (e) {
  //   console.log(e);
  // }
  // const users = await User.find({});
  // console.log(users)
  //   });

  app.use("/viber/webhook", bot.middleware());

  const port = process.env.DB_PORT || 3000;

  app.listen(port, () => {
    console.log(`Приложение запущено на порту: ${port}`);

    bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
      console.log("Can not set webhook on following server. Is it running?");
      console.error(error);
      process.exit(1);
    });
  });
} catch (e) {
  console.error("sfsdf", e);
}

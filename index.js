const line = require('@line/bot-sdk');
const express = require('express');
const app = express();

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET'
};

const client = new line.Client(config);

// ユーザーからのメッセージを受け取るエンドポイント
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    // ユーザーからのテキストメッセージを処理する
    const message = event.message.text;

    // ユーザーからのメッセージに応じて処理を行う（誕生日の登録、通知設定の変更など）

    // ユーザーに対して返信メッセージを送信する
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'メッセージを受け取りました。'
    });
  }
  return Promise.resolve(null);
}

app.listen(3000, () => {
  console.log('server listening on port 3000');
});

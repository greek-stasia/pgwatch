const Discord = require("discord.js");
const logger = require("winston");
const crypto = require("crypto");

function hash(x) {
  return crypto
    .createHash("sha1")
    .update(x)
    .digest("hex");
}

/*
 *	Our blacklist of words to use in the chat
 *
 *	To generate a hash for a specific word run node in you terminal
 *	and create the following function.
 *
 *	function hash(x) {
 *	    return crypto.createHash('sha1').update(x).digest('hex');
 *	}
 *
 * 	Pass whatever string in you want and copy the result below.
 */
const prohibited = [
  "bff272e9d673fa941d0a1920551d01a695516140",
  "38d0f91a99c57d189416439ce377ccdcd92639d0",
  "2336f5729424d0c84d319e991b3648cafa2c3c5b",
  "f8a17e958f70b7990df493f4a53a36a67ba9163c",
  "48770dfd3d23f09e02c2c70a37039de833009894",
  "5f8bdcc367be8da26a270c09d29412021ca29a6e",
  "3b19ecd69b492a40e3061f17786b33c28f504239",
  "c0049442a7ca6d3b3eae5bfc4439eb4fd9e52464",
  "8c4947e96c7c9f770aa386582e32ce7ce1b96e69",
  "c177922cb7715a94aa4758eb140e08bfce4c5a04",
  "266f83d202fa3da4a075cea751b4b8d6a30da1a8",
  "39f6f95327b31d796f8d305a29df43b1d585e3cf",
  "35ed5406781ebfdf7161bbbb18e16cb9ad1f3be4",
  "b1aa14315bdbc2bdb4db442c176b0819f2eae550",
  "08bc5beda7a9157ef65f8d90a511c77c8bedefa4",
  "d7eb2aa54ec8d25420a7e45089969f7bdd0f4a9e"
];

// Configure logger settings
logger.level = "debug";
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true
});

let userTabs = {};
// Initialize Discord Bot
const bot = new Discord.Client();

bot.on("ready", function(evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
});

bot.on("message", message => {
  console.log(message.content);
  let words = message.content.split(" ");
  console.log(words);
  for (word of words) {
    if (prohibited.indexOf(hash(word.toLowerCase())) > -1) {
      message.reply("Watch your mouth!");
      let author = message.author;
      if (author.id in userTabs) {
        userTabs[author.id] = userTabs[author] + 1;
      } else {
        userTabs[author.id] = 1;
      }
      message.reply(" you're up to " + userTabs[author] + " no-no point(s)");
    }
  }
});

// Log our bot in using the token from https://discord.com/developers/applications
bot.login(process.env.BOT_TOKEN);

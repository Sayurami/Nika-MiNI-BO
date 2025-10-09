const { cmd } = require('../lib/command');
const config = require('../settings');

cmd({
  pattern: "button",
  react: "🟢",
  desc: "Enable or disable button replies using true or false.",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { reply, args, isOwner }) => {
  if (!isOwner) return reply("*🚫 Only the owner can use this command!*");

  const input = args[0]?.toLowerCase();
  if (input !== 'true' && input !== 'false') {
    return reply("❌ Usage: `.button true` or `.button false` only.");
  }

  // Update config at runtime
  config.BUTTON = input === 'true' ? "true" : "false";

  return reply(`✅ Button setting updated to *${config.BUTTON}*`);
});
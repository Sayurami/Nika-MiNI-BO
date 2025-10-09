const { cmd, commands } = require('../lib/command');
const config = require('../settings');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({
    pattern: "setprefix",
    alias: ["prefix"],
    react: "🔧",
    desc: "Change the bot's command prefix.",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    const newPrefix = args[0]; // Get the new prefix from the command arguments
    if (!newPrefix) return reply("❌ Please provide a new prefix. Example: `.setprefix !`");

    // Update the prefix in memory
    config.PREFIX = newPrefix;

    return reply(`✅ Prefix successfully changed to *${newPrefix}*`);
    
        await bot.sendMessage(extra.from, { text: "*Prefix Change Done ✔*" }, { quoted: message });
        
        await bot.sendMessage(extra.from, { text: `✅ Prefix successfully changed to *${newPrefix}*` }, { quoted: message });
        
});

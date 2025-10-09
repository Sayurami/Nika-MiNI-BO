const os = require("os");
const { cmd, commands } = require("../lib/command");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson } = require("../lib/functions");
const axios = require("axios");
const config = require("../settings");

cmd({
  pattern: "menu",
  react: "📜",
  category: "main",
  use: ".menu",
  desc: "Get bot's command list.",
  dontAddCommandList: true,
  filename: __filename,
}, async (client, message, args, { from, prefix, pushname, reply }) => {
  try {
    const data = (await axios.get("https://raw.githubusercontent.com/sulamd48/database/refs/heads/main/ditels.json")).data;
    const imageUrl = data.imageurl;
    const footerText = data.footer;
    
    const gptq = {
      key: {
        remoteJid: "status@broadcast",
        fromMe: false,
        id: 'FAKE_META_ID_001',
        participant: '18002428478@s.whatsapp.net'
      },
      message: {
        contactMessage: {
          displayName: '© 𝚂𝚄𝙻𝙰 𝙼𝙳',
          vcard: `BEGIN:VCARD
VERSION:3.0
N:Alip;;;;
FN:Alip
TEL;waid=18002428478:+1 (800) 242-8478
END:VCARD`
        }
      }
    };

    const des = `
👋 𝐇ɪ... *${pushname}*

⚙️ 𝐒𝐔𝐋𝐀 𝐌𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 ⚙️

⏱️ Uptime: ${runtime(process.uptime())}

📦 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB

📎 Prefix: ${prefix}
    `.trim();

    if (config.BUTTON?.toLowerCase() === "true") {
      const menuList = {
        title: 'Click here 📂',
        sections: [
          {
            title: '𝐒𝐔𝐋𝐀-𝐌𝐃',
            rows: [
              { title: 'Download Menu 📥', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category download` },
              { title: 'Owner Menu ⭕', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category owner` },
              { title: 'Group Menu 👥', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category group` },
              { title: 'Other Menu 🔻', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category other` },
              { title: 'Search Menu 🔎', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category search` },
              { title: 'Convert Menu 🔄', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category convert` },
              { title: 'Main Menu 🫆', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category main` },
              { title: 'Bug Menu 🔴', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category bug` },
              { title: 'Movie Menu 🎥', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category movie` },
              { title: 'AI Menu 🤖', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category ai` },
              { title: 'Wallpapers Menu 🌁', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category wallpapers` },
              { title: 'Education Menu 🖊️', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category education` },
              { title: 'News Menu 🌐', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category news` },
              { title: 'NFSW Menu 🤤', description: '𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳', id: `${prefix}category nfsw` }
            ]
          }
        ]
      };

      await client.sendMessage(from, {
        image: { url: imageUrl },
        caption: des,
        footer: footerText,
        buttons: [
          {
            buttonId: `${prefix}alive`,
            buttonText: { displayText: 'ALIVE 🟢' },
            type: 1
          },
          {
            buttonId: `${prefix}ping`,
            buttonText: { displayText: 'PING 🔴' },
            type: 1
          },
          {
            buttonId: 'menu_options',
            buttonText: { displayText: '📂 Menu Options' },
            type: 4,
            nativeFlowInfo: {
              name: 'single_select',
              paramsJson: JSON.stringify(menuList)
            }
          }
        ],
        headerType: 1,
        viewOnce: true
      }, { quoted: gptq });

    } else {
      // Generate dynamic category list for non-button fallback
      const categories = [];
      const categoryMap = new Map();
      for (let command of commands) {
        if (!command.dontAddCommandList && command.pattern && command.category.toLowerCase() !== "misc") {
          const category = command.category.toUpperCase();
          if (!categoryMap.has(category)) {
            categories.push(category);
            categoryMap.set(category, []);
          }
          categoryMap.get(category).push(command.pattern);
        }
      }

      const menuItems = categories.map((cat, i) => ({
        title: `${i + 1}`,
        description: `${cat} MENU`,
        rowId: `${prefix}category ${cat}`,
      }));

      const menuMessage = {
        caption: des,
        image: { url: imageUrl },
        footer: footerText,
        title: '',
        buttonText: "*🔢 𝐑ᴇᴘʟʏ 𝐓ʜᴇ 𝐍ᴜᴍʙᴇʀ 𝐘ᴏᴜ 𝐖ᴀɴᴛ 𝐓ᴏ 𝐒ᴇʟᴇᴄᴛ.......👁️❗*",
        sections: [{ title: '', rows: menuItems }],
      };

      await client.replyList(from, menuMessage, { quoted: message });
    }
  } catch (error) {
    console.error(error);
    reply("*Error !!*");
  }
});

cmd({
  pattern: "category",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, m, msg, { from, q: query, pushname, reply }) => {
  try {
    const { data } = await axios.get("https://raw.githubusercontent.com/sulamd48/database/refs/heads/main/ditels.json");
    const footerText = data.footer;

    const category = query.trim().toUpperCase();
    if (!category) return reply("⚠️ Please specify a category name.");
    if (category === "MISC") return reply("⚠️ MISC category is hidden.");

    const cmds = commands.filter(c => c.category?.toUpperCase() === category && !c.dontAddCommandList);
    if (cmds.length === 0) return reply(`❌ No commands found under category: ${category}`);

    let text = `
     𝐇ɪ...👋 ${pushname} 

┃ 🗂️ 𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐘: ${category}

┃ 📊 Total Commands: ${cmds.length}

┃ 💾 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB

┃ ⏱️ Uptime: ${runtime(process.uptime())}

`;

    for (const cmd of cmds) {
      text += `╭───────●●►\n│ 📌 *${cmd.pattern}*\n│ 📘 Use: ${cmd.use || "Not Provided"}\n╰───────●●►\n`;
    }

    await conn.sendMessage(from, {
      image: { url: "https://i.ibb.co/sdk8Wt1h/SulaMd.jpg" },
      caption: text + `\n\n${footerText}`
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    reply("❌ Error occurred while fetching category.");
  }
});

const updateCommand = {
  pattern: "update",
  alias: ["restart"],
  desc: "Restart the bot",
  category: "owner",
  use: ".update",
  react: "🚀",
  filename: __filename
};
cmd(updateCommand, async (bot, message, args, extra) => {
  try {
    const { isOwner, reply } = extra;
    if (!isOwner) {
      return reply("Only the owner can use this command.");
    }
    const { exec } = require("child_process");
    await bot.sendMessage(extra.from, { text: "*Updating...*" }, { quoted: message });
    await bot.sendMessage(extra.from, { text: "*Update Done ✔*" }, { quoted: message });
    await sleep(1500);
    exec("pm2 restart all");
  } catch (error) {
    console.log(error);
    reply("" + error);
  }
});
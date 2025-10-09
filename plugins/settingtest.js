const { cmd } = require('../lib/command');
const config = require('../settings');
const prefix = config.PREFIX;

cmd({
  pattern: 'setting',
  react: "🛡️",
  alias: ["st"],
  use: ".setting",
  category: "owner",
  filename: __filename,
}, async (conn, m, chat, { from, isOwner, reply }) => {
  try {
    if (!isOwner) return await reply("❌ Owner Only Command!");

    const des = "> 𝐒𝐔𝐋𝐀-𝐌𝐃 𝐒𝐄𝐓𝐓𝐈𝐍𝐆 𝐌𝐄𝐍𝐔";

    const options = [
      { title: "𝐌𝐎𝐃𝐄", values: ["Public 🗃️", "Private 🔐", "Groups 🎛️", "Inbox 🌈"], command: "mode" },
      { title: "𝐀𝐔𝐓𝐎 𝐕𝐎𝐈𝐂𝐄", values: ["True 🔑", "False 🔐"], command: "autovoice" },
      { title: "𝐀𝐔𝐓𝐎 𝐒𝐓𝐈𝐂𝐊𝐄𝐑", values: ["True 🔑", "False 🔐"], command: "autosticker" },
      { title: "𝐀𝐔𝐓𝐎 𝐑𝐄𝐏𝐋𝐘", values: ["True 🔑", "False 🔐"], command: "autoreply" },
      { title: "𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐃 𝐒𝐓𝐀𝐓𝐔𝐒", values: ["True 🔑", "False 🔐"], command: "autoreadsratus" },
      { title: "𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐂𝐓 𝐒𝐓𝐀𝐓𝐔𝐒", values: ["True 🔑", "False 🔐"], command: "autoreactstatus" },
      { title: "𝐀𝐋𝐖𝐀𝐘𝐒 𝐎𝐅𝐅𝐋𝐈𝐍𝐄", values: ["True 🔑", "False 🔐"], command: "alwaysoffline" },
      { title: "𝐀𝐔𝐓𝐎 𝐓𝐘𝐏𝐈𝐍𝐆", values: ["True 🔑", "False 🔐"], command: "autotyping" },
      { title: "𝐑𝐄𝐀𝐃 𝐌𝐄𝐒𝐒𝐀𝐆𝐄", values: ["True 🔑", "False 🔐"], command: "readmessage" },
      { title: "𝐑𝐄𝐂𝐎𝐑𝐃𝐈𝐍𝐆", values: ["True 🔑", "False 🔐"], command: "recording" },
      { title: "𝐑𝐄𝐀𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃", values: ["True 🔑", "False 🔐"], command: "readcommand" },
      { title: "𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐂𝐓", values: ["True 🔑", "False 🔐"], command: "autoreact" },
      { title: "𝐀𝐍𝐓𝐈 𝐋𝐈𝐍𝐊", values: ["True 🔑", "False 🔐"], command: "antilink" },
      { title: "𝐀𝐍𝐓𝐈 𝐃𝐄𝐋𝐄𝐓𝐄", values: ["True 🔑", "False 🔐"], command: "antibelete" },
      { title: "𝐀𝐍𝐓𝐈 𝐂𝐀𝐋𝐋", values: ["True 🔑", "False 🔐"], command: "anticall" },
      { title: "𝐀𝐍𝐓𝐈 𝐁𝐀𝐃", values: ["True 🔑", "False 🔐"], command: "antibad" },
      { title: "𝐀𝐍𝐓𝐈 𝐁𝐎𝐓", values: ["True 🔑", "False 🔐"], command: "antibot" },
      { title: "𝐀𝐔𝐓𝐎 𝐁𝐋𝐎𝐂𝐊", values: ["True 🔑", "False 🔐"], command: "autoblock" },
      { title: "𝐁𝐀𝐃 𝐍𝐎 𝐁𝐋𝐎𝐂𝐊", values: ["True 🔑", "False 🔐"], command: "badno" },
      { title: "𝐀𝐈 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓", values: ["True 🔑", "False 🔐"], command: "aichat" },
      { title: "𝐀𝐔𝐓𝐎 𝐍𝐄𝐖𝐒 𝐒𝐄𝐍𝐃𝐄𝐑", values: ["True 🔑", "False 🔐"], command: "autonewssender" },
      { title: "𝐀𝐔𝐓𝐎 𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐍𝐃𝐄𝐑", values: ["True 🔑", "False 🔐"], command: "autotlktoksender" },
      { title: "𝐀𝐈 𝐑𝐄𝐏𝐋𝐀𝐘", values: ["True 🔑", "False 🔐"], command: "aireplay" },
      { title: "𝐖𝐄𝐋𝐂𝐎𝐌𝐄 / 𝐆𝐎𝐎𝐃𝐁𝐘𝐄", values: ["True 🔑", "False 🔐"], command: "welcome" }
    ];

    if (config.BUTTON === "true") {
      const menuList = {
        title: 'Settings Menu 📂',
        sections: options.map((opt, i) => ({
          title: `[${String(i + 1).padStart(2, '0')}] ${opt.title}`,
          rows: opt.values.map((val, j) => ({
            title: `${i + 1}.${j + 1}`,
            description: val,
            id: `${prefix}${opt.command} ${val.toLowerCase().split(" ")[0]}`
          }))
        }))
      };

      await conn.sendMessage(from, {
        image: { url: "https://i.ibb.co/Q3WzpGrD/SulaMd.jpg" },
        caption: des,
        footer: "\n\n𝐏𝙾𝚆𝙴𝚁𝙴𝐃 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳",
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
            buttonId: 'setting_flow',
            buttonText: { displayText: '⚙️ SETTINGS' },
            type: 4,
            nativeFlowInfo: {
              name: 'single_select',
              paramsJson: JSON.stringify(menuList)
            }
          }
        ],
        headerType: 1,
        viewOnce: true
      }, { quoted: m });
    } else {
      const sections = options.map((opt, index) => ({
        title: `[${String(index + 1).padStart(2, '0')}] ${opt.title}`,
        rows: opt.values.map((val, idx) => ({
          title: `${index + 1}.${idx + 1}`,
          description: val,
          rowId: `${prefix}${opt.command} ${val.toLowerCase().split(" ")[0]}`
        }))
      }));

      await conn.replyList(from, {
        image: { url: 'https://i.ibb.co/Q3WzpGrD/SulaMd.jpg' },
        caption: des,
        footer: "\n\n𝐏𝙾𝚆𝙴𝚁𝙴𝐃 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳",
        buttonText: "> 𝐑ᴇᴘʟʏ 𝐓ʜᴇ 𝐍ᴜᴍ𝐛ᴇʀ 𝐘ᴏᴜ 𝐖ᴀɴᴛ 𝐓ᴏ 𝐒ᴇʟᴇᴄᴛ...",
        sections
      }, { quoted: m });
    }

  } catch (e) {
    console.error(e);
    return reply("❌ Error executing setting command!");
  }
});
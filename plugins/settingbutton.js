
const config = require("../settings");
const prefix = config.PREFIX;

const { cmd } = require('../lib/command');
const { getBuffer } = require('../lib/functions');

cmd({
    pattern: "st2",
    desc: "SULA MD setting list.",
    alias: ["st2"],
    category: "main",
    use: ".st2",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, reply, isOwner, pushname }) => {
    try {
    
    const fpay = {
  key: {
    remoteJid: '0@s.whatsapp.net',
    fromMe: false,
    id: 'B826873620DD5947E518F6F15EAA57D4',
    participant: '0@s.whatsapp.net'
  },
  message: {
    requestPaymentMessage: {
      currencyCodeIso4217: 'LKR',
      amount1000: 500000,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
        extendedTextMessage: {
          text: 'SULA-MD PAYMENT'
        }
      },
      expiryTimestamp: 999999999,
      paymentAttachment: {}
    }
  }
};


        if (!isOwner) return await reply("📛 Owner Only Command..");

        let caption = `
    《 SULA–MD • SETTING 》



> 𝐏𝙾𝚆𝙴𝚁𝙴𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳
`;

        await conn.sendMessage(from, {
            buttons: [
                {
                    buttonId: 'action',
                    buttonText: { displayText: '📂 Menu Options' },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'Click Here ❏',
                            sections: [
                                {
                                    title: `𝐖𝐎𝐑𝐊 𝐓𝐘𝐏𝐄 🍬`,
                                    rows: [
                                        {
                                            title: 'PUBLIC 🌐',
                                            description: 'Run bot in public mode',
                                            id: `${prefix}mode PUBLIC`,
                                        },
                                        {
                                            title: 'PRIVATE 🫆',
                                            description: 'Run bot in private mode',
                                            id: `${prefix}mode PRIVATE`,
                                        },
                                        {
                                            title: 'GROUPS 👥',
                                            description: 'Allow bot only in groups',
                                            id: `${prefix}mode GROUPS`,
                                        },
                                        {
                                            title: 'INBOX 👤',
                                            description: 'Allow bot only in inbox',
                                            id: `${prefix}mode INBOX`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐔𝐓𝐎 𝐕𝐎𝐈𝐂𝐄`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Auto Voice',
                                            id: `${prefix}autovoice true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Auto Voice',
                                            id: `${prefix}autovoice false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐔𝐓𝐎 𝐒𝐓𝐈𝐂𝐊𝐄𝐑`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Auto Sticker',
                                            id: `${prefix}autosticker true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Auto Sticker',
                                            id: `${prefix}autosticker false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐔𝐓𝐎 𝐑𝐄𝐏𝐋𝐘`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Auto Reply',
                                            id: `${prefix}autoreply true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Auto Reply',
                                            id: `${prefix}autoreply false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐑𝐄𝐀𝐃 𝐒𝐓𝐀𝐓𝐔𝐒`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Read Status',
                                            id: `${prefix}autoreadsratus true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Read Status',
                                            id: `${prefix}autoreadsratus false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐑𝐄𝐀𝐂𝐓 𝐒𝐓𝐀𝐓𝐔𝐒`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable React Status',
                                            id: `${prefix}autoreactstatus true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable React Status',
                                            id: `${prefix}autoreactstatus false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐋𝐋𝐖𝐀𝐘𝐒 𝐎𝐅𝐅𝐋𝐈𝐍𝐄`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Allways Offline',
                                            id: `${prefix}alwaysoffline true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Allways Offline',
                                            id: `${prefix}alwaysoffline false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐅𝐀𝐊𝐄 𝐓𝐘𝐏𝐈𝐍𝐆`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Fake Typing',
                                            id: `${prefix}autotyping true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Fake Typing',
                                            id: `${prefix}autotyping false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐑𝐄𝐀𝐃 𝐌𝐀𝐒𝐒𝐀𝐆𝐄`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Read Massage',
                                            id: `${prefix}readmessage true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Read Massage',
                                            id: `${prefix}readmessage false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐅𝐀𝐊𝐄 𝐑𝐄𝐂𝐎𝐃𝐈𝐍𝐆`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Fake Recoding',
                                            id: `${prefix}recording true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Fake Recoding',
                                            id: `${prefix}recording false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐂𝐓`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Auto React',
                                            id: `${prefix}autoreact true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Auto React',
                                            id: `${prefix}autoreact false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐍𝐓𝐈 𝐋𝐈𝐍𝐊`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Anti Link',
                                            id: `${prefix}antilink true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Anti Link',
                                            id: `${prefix}antilink false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐍𝐓𝐈 𝐃𝐄𝐋𝐄𝐓𝐄`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Anti Delete',
                                            id: `${prefix}antibelete true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Anti Delete',
                                            id: `${prefix}antibelete false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐍𝐓𝐈 𝐂𝐀𝐋𝐋`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Anti Call',
                                            id: `${prefix}anticall true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Anti Call',
                                            id: `${prefix}anticall false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐍𝐓𝐈 𝐁𝐀𝐃`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Anti Bad',
                                            id: `${prefix}antibad true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Anti Bad',
                                            id: `${prefix}antibad false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐍𝐓𝐈 𝐁𝐎𝐓`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Anti Bot',
                                            id: `${prefix}antibot true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Anti Bot',
                                            id: `${prefix}antibot false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐔𝐓𝐎 𝐁𝐋𝐎𝐂𝐊`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Auto Block',
                                            id: `${prefix}autoblock true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Auto Block',
                                            id: `${prefix}autoblock false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐁𝐀𝐃 𝐍𝐔𝐌𝐁𝐄𝐑 𝐁𝐋𝐎𝐂𝐊`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Bad Number Block',
                                            id: `${prefix}badno true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Bad Number Block',
                                            id: `${prefix}badno false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐀𝐈 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Ai Chat Bot',
                                            id: `${prefix}aichat true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Ai Chat Bot',
                                            id: `${prefix}aichat false`,
                                        },
                                    ]
                                },
                                {
                                    title: `𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐀𝐍𝐃 𝐆𝐎𝐎𝐃𝐁𝐘𝐄`,
                                    rows: [
                                        {
                                            title: '𝐓𝐑𝐔𝐄 🔑',
                                            description: 'Enable Welcome And Good Bye',
                                            id: `${prefix}welcome true`,
                                        },
                                        {
                                            title: '𝐅𝐀𝐋𝐒𝐄 🔒',
                                            description: 'Disable Welcome And Good Bye',
                                            id: `${prefix}welcome false`,
                                        },
                                    ]
                                },
                            ],
                        }),
                    },
                },
            ],
            headerType: 1,
            viewOnce: true,
            image: { url: "https://i.ibb.co/Q3WzpGrD/SulaMd.jpg" },
            caption: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 00,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363385281017920@newsletter',
                    newsletterName: '𝐒𝐔𝐋𝐀-𝐌𝐃',
                    serverMessageId: 00
                }
             }
        }, { quoted: fpay });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply('❌ An error occurred while processing your request.');
    }
});
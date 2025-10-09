const {cmd , commands} = require('../lib/command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "xvideodl",
    alias: ["xdl"],
    category: "nfsw",
    react: "🔞",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
if (!q) return reply('*Please give me a link*');

const info =  await fetchJson(`https://apis-keith.vercel.app/download/porn?url=${q}`);
const xDowninfo = info.result.videoInfo;
let cap =`
*SULA-MD XVIDEO DL*
 *Tɪᴛʟᴇ :* ${xDowninfo.title}
 *Dᴜʀᴀᴛɪᴏɴ :* ${xDowninfo.duration}
 *Dᴇꜱᴄʀɪᴘᴛɪᴏɴ :* ${xDowninfo.description}

🔢 *Rᴇᴘʟʏ Bᴇʟᴏᴡ Tʜᴇ Nᴜᴍʙᴇʀ Tᴏ*
*Dᴏᴡɴʟᴏᴀᴅ Vᴇᴅɪᴏ Qᴜᴀʟɪᴛʏ*

*1* | _Dᴏᴡɴʟᴏᴀᴅ Lᴏᴡ_
*2* | _Dᴏᴡɴʟᴏᴀᴅ Hɪɢʜ_
*3* | _Dᴏᴡɴʟᴏᴀᴅ Uʟᴛʀᴀ_

> 𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳
`;
let suhas = `*𝐏𝙾𝚆𝙴𝚁𝙳 𝐁𝚈 𝐒𝚄𝙻𝙰 𝐌𝙳*`;
const sentMsg = await conn.sendMessage(from, {
            image: { url: xDowninfo.thumbnail},
            caption: cap,
  contextInfo: {
                mentionedJid: ['94763165605@s.whatsapp.net'], 
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363385281017920@newsletter',
                    newsletterName: "𝐒𝐔𝐋𝐀-𝐌𝐃",
                    serverMessageId: 999
                }
            }
     }, {quoted: mek});
     
     const messageID = sentMsg.key.id; 
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;


            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {

                

                if (messageType === '1') {
                const xDown = info.result.downloads;
                  await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    await conn.sendMessage(from, {
                        document: { url: xDown.lowQuality},
                        mimetype: "video/mp4",
                        fileName: `${xDowninfo.title}.mp4`,
                        caption: suhas
                                            
                      }, { quoted: mek });
                      await conn.sendMessage(from, { delete: sentMsg.key });
                
                } else if (messageType === '2') {
                const xDown = info.result.downloads;
                   await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    await conn.sendMessage(from, {
                        document: { url: xDown.highQuality},
                        mimetype: "video/mp4",
                        fileName: `${xDowninfo.title}.mp4`, 
                        caption: suhas
                                            
                      }, { quoted: mek });
                     } else if (messageType === '3') {
                     const xDown = info.result.downloads;
                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                    await conn.sendMessage(from, {
                        document: { url: xDown.hlsStream},
                        mimetype: "video/mp4",
                        fileName: `${xDowninfo.title}.mp4`, 
                        caption: suhas
                                            
                      }, { quoted: mek }); 
                }
            }
        });

} catch (e) {
        console.log(e);
        reply(`${e}`);
        }
    });
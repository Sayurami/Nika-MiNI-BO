const { cmd } = require("../lib/command");
const axios = require("axios");
const NodeCache = require("node-cache");

// === Meta AI contact message ===
const fkontak = {
    key: {
        remoteJid: "13135550002@s.whatsapp.net",
        participant: "0@s.whatsapp.net",
        fromMe: false,
        id: "Naze",
    },
    message: {
        contactMessage: {
            displayName: "© 𝚂𝚄𝙻𝙰 𝙼𝙳",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;Meta AI;;;\nFN:Meta AI\nitem1.TEL;waid=13135550002:13135550002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            sendEphemeral: false,
        },
    },
};

// === Cache for search results ===
const searchCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

cmd(
  {
    pattern: "xvideo",
    react: "📥",
    desc: "Video Downloader from Search",
    category: "nfsw",
    filename: __filename,
  },
  async (conn, mek, m, { from, q, pushname }) => {
    if (!q) {
      await conn.sendMessage(
        from,
        { text: "Usage: .xvideo <search query>\nExample: .xvideo miya kalifa" },
        { quoted: fkontak }
      );
      return;
    }

    try {
      const cacheKey = `x_search_${q}`;
      let searchData = searchCache.get(cacheKey);

      if (!searchData) {
        const searchApiUrl = `https://dtzhamster.netlify.app/search?q=${encodeURIComponent(q)}`;
        let retries = 3;
        while (retries > 0) {
          try {
            const response = await axios.get(searchApiUrl, { timeout: 10000 });
            searchData = response.data;
            break;
          } catch {
            retries--;
            await new Promise((r) => setTimeout(r, 1000));
          }
        }

        if (!searchData?.status || !searchData?.results?.length)
          throw new Error("No results found");

        searchCache.set(cacheKey, searchData);
      }

      const results = searchData.results;
      let searchInfo = `🔍 *𝚂𝚄𝙻𝙰 𝙼𝙳 𝚇𝚅𝙸𝙳𝙴𝙾 𝚁𝙴𝚂𝚄𝙻𝚃𝚂 "${q}"*:\n\n`;
      results.forEach((r, i) => {
        searchInfo += `${i + 1}.➤ 🤤 ${r.title}\n`;
      });
      searchInfo += `\n📝 Reply with the number to select a video`;

      const searchMsg = await conn.sendMessage(from, { text: searchInfo }, { quoted: fkontak });
      const searchOptionsMap = new Map();
      searchOptionsMap.set(searchMsg.key.id, { results });

      conn.ev.on("messages.upsert", async (update) => {
        const message = update.messages[0];
        if (!message.message?.extendedTextMessage) return;
        const replyText = message.message.extendedTextMessage.text.trim();
        const repliedToId = message.message.extendedTextMessage.contextInfo?.stanzaId;

        if (searchOptionsMap.has(repliedToId)) {
          const { results } = searchOptionsMap.get(repliedToId);
          const index = parseInt(replyText) - 1;
          const selected = results[index];
          if (!selected) {
            return await conn.sendMessage(
              from,
              { text: `❌ Invalid number. Choose 1-${results.length}` },
              { quoted: message }
            );
          }

          const downloadApiUrl = `https://dtzxhamsterdl.netlify.app/?url=${encodeURIComponent(selected.link)}`;
          const downloadData = await axios.get(downloadApiUrl, { timeout: 10000 }).then((r) => r.data);
          if (!downloadData?.status || !downloadData?.final_urls?.[0]?.links?.length) {
            throw new Error("No download links available");
          }

          const downloadOptions = downloadData.final_urls[0].links;
          let downloadInfo = `🍓 *Download Options for "${selected.title}"*:\n\n`;
          downloadOptions.forEach((opt, i) => {
            downloadInfo += `${i + 1}➤ ❏ ${opt.file_quality} (${opt.file_ext})\n`;
          });
          downloadInfo += `\n📝 Reply with the number to download`;

          const downloadMsg = await conn.sendMessage(from, { text: downloadInfo }, { quoted: message });
          const downloadOptionsMap = new Map();
          downloadOptionsMap.set(downloadMsg.key.id, { downloadOptions, selected });

          conn.ev.on("messages.upsert", async (update2) => {
            const message2 = update2.messages[0];
            if (!message2.message?.extendedTextMessage) return;
            const replyText2 = message2.message.extendedTextMessage.text.trim();
            const repliedToId2 = message2.message.extendedTextMessage.contextInfo?.stanzaId;

            if (downloadOptionsMap.has(repliedToId2)) {
              const { downloadOptions, selected } = downloadOptionsMap.get(repliedToId2);
              const quality = downloadOptions[parseInt(replyText2) - 1];
              if (!quality) {
                return await conn.sendMessage(
                  from,
                  { text: `❌ Invalid number. Choose 1-${downloadOptions.length}` },
                  { quoted: message2 }
                );
              }

              try {
                await conn.sendMessage(
                  from,
                  {
                    video: { url: quality.link_url },
                    mimetype: "video/mp4",
                    fileName: `${selected.title.replace(/[^a-zA-Z0-9]/g, "_")}_${quality.file_quality}.mp4`,
                    caption: `🎬 *${selected.title}*\n📥 Quality: ${quality.file_quality}\n📦 Size: ${quality.file_size || "Unknown"}`,
                  },
                  { quoted: message2 }
                );
                await conn.sendMessage(from, { react: { text: "✅", key: message2.key } });
              } catch (e) {
                await conn.sendMessage(
                  from,
                  { text: `⚠️ Download failed.\nLink: ${quality.link_url}` },
                  { quoted: message2 }
                );
              }
            }
          });
        }
      });
    } catch (e) {
      console.error("Error:", e);
      await conn.sendMessage(from, { text: `❌ Error: ${e.message}` }, { quoted: fkontak });
      await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    }
  }
);
const { cmd } = require('../lib/command');
const fetch = require("node-fetch");

// GitHub Repo Details
const REPO_OWNER = "sulamd48";
const REPO_NAME = "database";
const FILE_PATH = "Banduser.json";
const GITHUB_TOKEN = "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";

// ✅ Get Premium Users (Using Your URL)
async function getPremiumUsersRaw() {
    const url = `https://raw.githubusercontent.com/sulamd48/database/refs/heads/main/premium.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GitHub raw fetch error: ${res.statusText}`);
    const text = await res.text();
    const matches = text.match(/"(\d+)"/g) || [];
    return matches.map(s => s.replace(/"/g, ''));
}

// ✅ Get Banned Users
async function getBannedUsersRaw() {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json"
        }
    });

    if (!res.ok) throw new Error(`GitHub fetch error: ${res.statusText}`);
    const data = await res.json();
    const rawText = Buffer.from(data.content, 'base64').toString('utf-8');
    const matches = rawText.match(/"(\d+)"/g) || [];
    return matches.map(s => s.replace(/"/g, ''));
}

// 🔄 Update Banned Users
async function updateBannedUsersRaw(bannedList) {
    const fetchURL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const fetchRes = await fetch(fetchURL, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json"
        }
    });

    if (!fetchRes.ok) throw new Error(`GitHub fetch error: ${fetchRes.statusText}`);
    const fetchData = await fetchRes.json();
    const latestSha = fetchData.sha;

    const formatted = `{ ${bannedList.map(num => `"${num}"`).join(', ')} }`;
    const encodedContent = Buffer.from(formatted).toString('base64');

    const res = await fetch(fetchURL, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json"
        },
        body: JSON.stringify({
            message: "Update banned users (raw format)",
            content: encodedContent,
            sha: latestSha
        })
    });

    if (!res.ok) throw new Error(`GitHub update error: ${res.statusText}`);
    return true;
}

// 🚫 .ban
cmd({
    pattern: "ban",
    alias: ["blockuser", "addban"],
    desc: "Ban a user from using the bot",
    category: "owner",
    react: "⛔",
    filename: __filename
}, async (conn, mek, m, { args, from, reply }) => {
    const user = m.sender.split("@")[0];
    const premium = await getPremiumUsersRaw();
    if (!premium.includes(user)) return reply("❌ Only bot owner can use this command.");

    const input = args[0]?.replace(/[^0-9]/g, "");
    if (!input) return reply("❌ Provide a number or reply/tag a user.");
    const target = input;

    try {
        const banned = await getBannedUsersRaw();
        if (banned.includes(target)) return reply("❌ This user is already banned.");

        banned.push(target);
        const unique = [...new Set(banned)];
        await updateBannedUsersRaw(unique);

        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/TMtCcL0z/SulaMd.jpg" },
            caption: `⛔ User ${target} has been banned from using the bot.`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// ✅ .unban
cmd({
    pattern: "unban",
    alias: ["removeban"],
    desc: "Unban a user",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { args, from, reply }) => {
    const user = m.sender.split("@")[0];
    const premium = await getPremiumUsersRaw();
    if (!premium.includes(user)) return reply("❌ Only bot owner can use this command.");

    const input = args[0]?.replace(/[^0-9]/g, "");
    if (!input) return reply("❌ Provide a number or reply/tag a user.");
    const target = input;

    try {
        const banned = await getBannedUsersRaw();
        if (!banned.includes(target)) return reply("❌ This user is not banned.");

        const updated = banned.filter(n => n !== target);
        await updateBannedUsersRaw(updated);

        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/TMtCcL0z/SulaMd.jpg" },
            caption: `✅ User ${target} has been unbanned.`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// 📋 .listban
cmd({
    pattern: "listban",
    alias: ["banlist", "bannedusers"],
    desc: "List all banned users",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const user = m.sender.split("@")[0];
    const premium = await getPremiumUsersRaw();
    if (!premium.includes(user)) return reply("❌ Only premium users can use this command.");

    try {
        const banned = await getBannedUsersRaw();
        if (banned.length === 0) return reply("✅ No banned users found.");

        let msg = "⛔ *Banned Users:*\n\n";
        banned.forEach((num, i) => {
            msg += `${i + 1}. ${num}\n`;
        });

        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/TMtCcL0z/SulaMd.jpg" },
            caption: msg
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});
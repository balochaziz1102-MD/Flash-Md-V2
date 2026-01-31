const { smsg } = require('../lib') // Flash-MD helper

module.exports = {
    name: "birdhit",
    alias: ["bh", "report"],
    desc: "Karachi Airport Bird Hit Report Generator",
    category: "aviation",
    async run(client, m, { text }) {
        if (!text) return m.reply("Please provide bird hit data.");

        // AI Instruction for Karachi Airport format
        const prompt = `You are a professional Aviation Safety Officer at Karachi Airport. 
        Transform this data into a professional report:
        ${text}
        Use bold headings and aviation emojis.`;

        try {
            // Aapke bot mein Gemini built-in hai
            const response = await client.gemini(prompt); 
            
            // Professional Report WhatsApp par bhejna
            await m.reply(`📢 *OFFICIAL BIRD HIT REPORT* 📢\n\n${response}`);

            // Telegram Channel par Auto-Post
            const telegramChannelId = "-1003868392581"; 
            await client.sendMessage(telegramChannelId, { text: response });

        } catch (err) {
            m.reply("AI Error. Please check your Gemini API Key in .env file.");
        }
    }
}


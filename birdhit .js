const config = require('../config');

module.exports = {
    name: "birdreport",
    alias: ["bh", "report"],
    category: "aviation",
    async run(client, message, { text }) {
        if (!text) return message.reply("Format: .birdreport At time... Information received...");

        // Bot ke andar maujood Gemini ka use karna
        const prompt = `You are a professional Aviation Safety Officer at Karachi Airport. 
        Please convert the following raw data into a clean, professional Bird Hit Report. 
        Raw Data: ${text}
        Use bold headings, professional language, and aviation emojis (✈️, ⚠️, 🛠️). 
        Make it look like an official alert.`;

        try {
            // Flash-MD ka default Gemini function call karein
            const response = await client.gemini(prompt); 
            
            // Ye result aapke number par reply ho jayega
            await message.reply(`📢 *OFFICIAL BIRD HIT REPORT* 📢\n\n${response}`);
            
            // Agar aap ise Telegram channel par bhi bhejna chahte hain
            // toh yahan wahi Telegram wali logic bhi add ho sakti hai.
        } catch (error) {
            message.reply("Gemini AI busy hai ya key ka masla hai. Dobara koshish karein.");
        }
    }
};


const { cmd } = require('../lib')

cmd({
    pattern: "birdhit",
    alias: ["bh", "report"],
    category: "aviation",
    filename: __filename
},
async(conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Sir, please provide the bird hit data.");
        
        const prompt = `You are a professional Aviation Safety Officer at Karachi Airport. 
        Transform this raw data into a professional report: ${q}`;
        
        // Flash-MD v2 ka default Gemini call
        const response = await conn.gemini(prompt); 
        await reply(`📢 *OFFICIAL BIRD HIT REPORT* 📢\n\n${response}`);

    } catch (e) {
        console.log(e);
        reply("AI Error: Check if GEMINI_API_KEY is added in .env file.");
    }
})


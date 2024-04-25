const axios = require("axios");

const discordIDs = [
    
];

async function main() {
    while (true) {
        for (let i = 0; i < discordIDs.length; i++) {
            const data = { "discord_token": discordIDs[i] };
            await sleep(Math.floor((Math.random() * (1000 * 3) + 2 * 1000)));
            axios.post("https://api.sorcery.games/sorceror/discord/dice/roll", data)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log("Error: " + error.response.data.message);
                });

        }
        await sleep(70 * 60 * Math.floor((Math.random() * (1000 * 50 - 1000 + 1) + 2 * 1000)));
    }
}

main();

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
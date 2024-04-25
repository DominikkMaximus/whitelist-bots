const fs = require('fs');
const CoinKey = require('coinkey');
const axios = require("axios");
const BATCH_SIZE = 10;

var wallet = new CoinKey.createRandom();

console.log("SAVE BUT DO NOT SHARE THIS:", wallet.privateKey.toString('hex'));
console.log("Address:", wallet.publicAddress);


const folderName = 'folder' + Date.now();
if (!fs.existsSync('./' + folderName)) {
    fs.mkdirSync('./' + folderName);
}

async function main() {
    let keys = []; let i = 0;
    while (true) {
        const wallet = new CoinKey.createRandom();
        const address = wallet.publicAddress;
        const privateKey = wallet.privateKey.toString('hex');

        const response = await axios("https://generative.xyz/generative/api/project/0x0000000000000000000000000000000000000000/999998/" + address + "/allow-list-gm", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,sl;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "Referer": "https://newbitcoincity.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "{}",
            "method": "POST"
        });
        console.log(response.status);

        console.log('Bitcoin Address:', address);
        console.log('Private Key:', privateKey);
        keys.push(`${address}:${privateKey}`);
        if (i % BATCH_SIZE == 0 && i != 0) {
            const keysString = keys.join('\n') + '\n';
            keys = [];
            fs.appendFileSync('./' + folderName + '/keys' + Date.now() + '.txt', keysString);
            console.log("Generated " + i + " keys in this session.");
        }
        i++;
    }
}
main();
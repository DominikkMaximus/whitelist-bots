const puppeteer = require('puppeteer-extra');
const conseiljssoftsigner = require('conseiljs-softsigner');
const { KeyStoreUtils } = require('conseiljs-softsigner');
const fs = require('fs');

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
let TEZwallets = [];

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    const browser = await puppeteer.launch({
        executablePath: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        headless: false,
        slowMo: 10
    });
    const page = await browser.newPage();
    await page.setDefaultTimeout(10000000);
    for (let i = 0; i < 101; i++) {
        const keystore = await conseiljssoftsigner.KeyStoreUtils.generateIdentity();
        TEZwallets.push({ "publicKey": keystore.publicKeyHash, "privateKey": keystore.secretKey });
        await page.goto("https://docs.google.com/forms/d/e/1FAIpQLSf3sDFPu5SRfjEAgmPs8p9-Wdy917clU2549cF3VBK3nmb7uA/viewform%22");
        await page.waitForXPath("/html/body/div/div[2]/form/div[2]/div/div[2]/div/div/div/div[2]/div/div[1]/div/div[1]/input");
        await page.type("input[type='text']", keystore.publicKeyHash);
        await page.click("div[role='button']");
        await sleep(500);
        fs.writeFileSync(`TEZwalletsForWhitelist${102}.json`, JSON.stringify(TEZwallets));
    }
    await browser.close();
}

main();
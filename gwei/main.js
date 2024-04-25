const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const crypto = require('crypto');
const ethers = require('ethers');

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
let ETHwallets = [];

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        headless: false,
        slowMo: 10
    });
    const page = await browser.newPage();
    await page.setDefaultTimeout(10000000);
    for (let i = 0; i < 500; i++) {
        const privateKey = "0x" + crypto.randomBytes(32).toString('hex')
        const address = new ethers.Wallet(privateKey);
        ETHwallets.push({ "publicKey": address.address, "privateKey": privateKey });

        await page.goto("https://docs.google.com/forms/d/e/1FAIpQLSfY8-0ZIG2yTJuf1RRECy9JC9kljC8FBVBCkzq2JSEO5c4MFg/viewform");

        await page.waitForXPath("/html/body/div/div[2]/form/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div[1]/input");
        const input = await page.$x("/html/body/div/div[2]/form/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div[1]/input");
        await input[0].type(address.address);

        await page.waitForXPath("/html/body/div/div[2]/form/div[2]/div/div[2]/div[1]/div/div/div[2]/div[1]/div/span/div/div/label/div/div[1]/div/div[3]/div");
        const button = await page.$x("/html/body/div/div[2]/form/div[2]/div/div[2]/div[1]/div/div/div[2]/div[1]/div/span/div/div/label/div/div[1]/div/div[3]/div");
        await button[0].click();

        await page.waitForXPath("/html/body/div/div[2]/form/div[2]/div/div[2]/div[3]/div/div/div[2]/div[1]/div/span/div/div[1]/label/div/div[1]/div/div[3]/div");
        const button1 = await page.$x("/html/body/div/div[2]/form/div[2]/div/div[2]/div[3]/div/div/div[2]/div[1]/div/span/div/div[1]/label/div/div[1]/div/div[3]/div");
        await button1[0].click();

        await page.waitForXPath("/html/body/div/div[2]/form/div[2]/div/div[2]/div[4]/div/div/div[2]/div[1]/div/span/div/div/label/div/div[1]/div/div[3]/div");
        const button2 = await page.$x("/html/body/div/div[2]/form/div[2]/div/div[2]/div[4]/div/div/div[2]/div[1]/div/span/div/div/label/div/div[1]/div/div[3]/div");
        await button2[0].click();
        await sleep(500);
        await page.waitForXPath("/html/body/div/div[2]/form/div[2]/div/div[3]/div[1]/div[1]/div/span");
        const button3 = await page.$x("/html/body/div/div[2]/form/div[2]/div/div[3]/div[1]/div[1]/div/span");
        await button3[0].click();
        await sleep(1500);


        fs.writeFileSync(`ETHWalletsForWhitelist1.json`, JSON.stringify(ETHwallets, 2, null));
    }
    await browser.close();
}

main();
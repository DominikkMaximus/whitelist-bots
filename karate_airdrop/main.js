const puppeteer = require('puppeteer');
const fs = require('fs');
const { faker } = require('@faker-js/faker');

async function main() {

    const outputFileName = 'output.txt';
    const outputFileStream = fs.createWriteStream(outputFileName);

    while (true) {
        try {
            const browser = await puppeteer.launch({
                executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", headless: false
            });
            const page = await browser.newPage();
            const mail = `${faker.name.firstName().toLowerCase()}.${faker.name.lastName().toLowerCase()}@my_domain.com`;
            await page.goto("https://www.karate.com/airdrop");
            await page.waitForXPath("/html/body/div[1]/div/div[3]/section/div/div[5]/div/form/div/input");
            const input = await page.$x("/html/body/div[1]/div/div[3]/section/div/div[5]/div/form/div/input");
            await input[0].type(mail);

            await page.waitForXPath("/html/body/div[1]/div/div[3]/section/div/div[5]/div/form/h5/button");
            const button = await page.$x("/html/body/div[1]/div/div[3]/section/div/div[5]/div/form/h5/button");
            await button[0].click();

            const outputLine = `${mail}\n`;
            outputFileStream.write(outputLine);
            await sleep(25000);
        } catch (e) { continue; }
    }
}
main();

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const puppeteer = require('puppeteer');
const Web3 = require("web3")

const projectid = "f5a1f877a94e4b828b23c91f167a34c3";
const web3 = new Web3('https://mainnet.infura.io/v3/' + projectid);

const accounts = [
    
]

async function main() {

    console.log("creating account");

    const seedphrase = [];

    for (let i = 0; i < accounts.length; i++) {
        const browser = await puppeteer.launch({
            executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", args: ['--no-sandbox', '--disable-extensions-except=C:\\Users\\domin\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Extensions\\nkbihfbeogaeaoehlefnkodbefgpgknn\\10.23.3_0',
                '--load-extension=C:\\Users\\domin\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Extensions\\nkbihfbeogaeaoehlefnkodbefgpgknn\\10.23.3_0', '--enable-remote-extensions'
            ], headless: false
        });
        const privateKey = accounts[i].wallet.privateKey;
        console.log("setuping metamask");
        const page = await browser.newPage();
        await page.setDefaultTimeout(10000000);
        await page.goto("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/select-action");
        await page.waitForXPath("/html/body/div[1]/div/div[2]/div/div/div[2]/div/div[2]/div[1]/button");
        await page.click("button[class='button btn--rounded btn-primary first-time-flow__button']");
        console.log("got to seedphrase");
        await page.waitForXPath("/html/body/div[1]/div/div[2]/div/div/div[2]/form/div[1]/div[3]/div[1]/div[1]/div/input");
        console.log("writing seedphrase");
        await page.type("input[id='import-srp__srp-word-0']", seedphrase[0]);
        await page.type("input[id='import-srp__srp-word-1']", seedphrase[1]);
        await page.type("input[id='import-srp__srp-word-2']", seedphrase[2]);
        await page.type("input[id='import-srp__srp-word-3']", seedphrase[3]);
        await page.type("input[id='import-srp__srp-word-4']", seedphrase[4]);
        await page.type("input[id='import-srp__srp-word-5']", seedphrase[5]);
        await page.type("input[id='import-srp__srp-word-6']", seedphrase[6]);
        await page.type("input[id='import-srp__srp-word-7']", seedphrase[7]);
        await page.type("input[id='import-srp__srp-word-8']", seedphrase[8]);
        await page.type("input[id='import-srp__srp-word-9']", seedphrase[9]);
        await page.type("input[id='import-srp__srp-word-10']", seedphrase[10]);
        await page.type("input[id='import-srp__srp-word-11']", seedphrase[11]);
        console.log("seedphrase written");
        await page.type("input[id='password']", "asdfghjk");
        await page.type("input[id='confirm-password']", "asdfghjk");
        await page.click("input[id='create-new-vault__terms-checkbox']");
        await page.click("button[type='submit']");
        console.log("got to main window");

        await page.waitForXPath("/html/body/div[1]/div/div[2]/div/div/button");
        await page.click("button[role='button']");
        console.log("got to main window");
        await page.goto("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#new-account/import");
        await page.waitForXPath("/html/body/div[1]/div/div[3]/div/div/div[2]/div[2]/div[1]/input");
        await page.type("input[id='private-key-box']", privateKey);
        await page.click("button[class='button btn--rounded btn-primary btn--large new-account-create-form__button']");
        console.log("metamask setted up");

        //await page.setDefaultTimeout(10000000);
        await page.goto("https://madz.wtf");

        console.log("clicking connect button");
        await page.waitForXPath('/html/body/div/div/div/header/div/div/button');
        const buttonConnect1 = await page.$x('/html/body/div/div/div/header/div/div/button');
        await buttonConnect1[0].click();
        await page.waitForTimeout(500);

        console.log("clicking MM button");
        await page.waitForXPath(' /html/body/div[3]/div/div/div[2]/div[2]/button[1]');
        const buttonMM1 = await page.$x('/html/body/div[3]/div/div/div[2]/div[2]/button[1]');
        await buttonMM1[0].click();
        await page.waitForTimeout(5000);

        await page.waitForXPath(' /html/body/div[3]/div/div/div[1]/button');
        const buttonX = await page.$x('/html/body/div[3]/div/div/div[1]/button');
        await buttonX[0].click();
        await page.waitForTimeout(500);

        console.log("clicking 3rd button");
        await page.waitForXPath("/html/body/div/div/div/div[4]/div/div/div/div[3]/button");
        const buttons = await page.$x('/html/body/div/div/div/div[4]/div/div/div/div[3]/button');
        const thirdButton = buttons[0];
        await thirdButton.click();
        await page.waitForTimeout(500);

        console.log("filling answer");
        await page.waitForXPath('/html/body/div[3]/div/div/div[2]/div[3]/div/input');
        const input = await page.$x('/html/body/div[3]/div/div/div[2]/div[3]/div/input');
        await input[0].type('CREATORZ')
        await page.waitForTimeout(1000);

        console.log("clicking connect button 1_");
        await page.waitForXPath('/html/body/div[3]/div/div/div[2]/div[3]/button');
        const button = await page.$x('/html/body/div[3]/div/div/div[2]/div[3]/button');
        await button[0].click();
        await page.waitForTimeout(500);

        console.log("clicking connect button2_");
        await page.waitForXPath('/html/body/div[3]/div/div/div[2]/div[3]/button');
        const buttonConnect = await page.$x('/html/body/div[3]/div/div/div[2]/div[3]/button');
        await buttonConnect[0].click();
        await page.waitForTimeout(500);

        console.log("clicking MM button1_");
        await page.waitForTimeout(5000);
        browser.close();
    }


}
main();


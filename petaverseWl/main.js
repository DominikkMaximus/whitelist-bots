const puppeteer = require('puppeteer');
const Web3 = require("web3")

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const SCOPES = ["https://mail.google.com/"];

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
let numRunning = 0;
let checkEmail = 0;
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFileSync(TOKEN_PATH);
        credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = fs.readFileSync(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    fs.writeFileSync(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function handleEmail(auth, mail) {
    try {
        console.log("checkEmali: " + checkEmail)
        if (checkEmail > 15) { checkEmail = 0; return "123456"; }
        const gmail = google.gmail({ version: "v1", auth });
        const result = await gmail.users.messages.list({ userId: "me" });
        const messages = result.data.messages;

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const msg = await gmail.users.messages.get({ userId: "me", id: message.id });
            if (JSON.stringify(msg.data.payload).includes("petaverse.com")) {
                if (JSON.stringify(msg.data.payload.headers).includes(`${mail.split('@')[0]}=my_domain@forwardemail.net`)) {//email.split('@')[0]
                    console.log("Found email");
                    //await fs.writeFile("testbody0.json", JSON.stringify(atob(msg.data.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/'))));
                    const str = JSON.stringify(atob(msg.data.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/')))
                    let re = /\*(\d{6})\*/g;
                    let result = str.match(re);
                    if (result !== null && result.length === 1) {
                        console.log("Found code");
                        console.log(result[0].replace("*", "").replace("*", ""));
                        checkEmail = 0;
                        return result[0].replace("*", "").replace("*", "");
                    }

                }
                else if (i == messages.length - 1) {//if function not exited, call again
                    console.log("Found email but not for this user");
                    await sleep(5 * 1000);
                    checkEmail++;
                    handleEmail(auth, mail);
                }
            }
        }
    } catch (e) { console.log(e); }
}

const auth = authorize();

const projectid = "";
const web3 = new Web3('https://mainnet.infura.io/v3/' + projectid);

const accounts = [
   
]
let entries = [];
let k = 0;
async function main(formLink) {

    console.log("creating account");

    const seedphrase = [];
    try {
        for (let i = k; i < accounts.length; i++) {
            k = i;
            const mail = `${faker.name.firstName().toLowerCase()}.${faker.name.lastName().toLowerCase()}@fnsrs.eu.org`;
            const browser = await puppeteer.launch({
                executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", args: ['--no-sandbox', '--disable-extensions-except=C:\\Users\\domin\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Extensions\\nkbihfbeogaeaoehlefnkodbefgpgknn\\10.25.0_0',
                    '--load-extension=C:\\Users\\domin\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Extensions\\nkbihfbeogaeaoehlefnkodbefgpgknn\\10.25.0_0', '--enable-remote-extensions'
                ], headless: false
                /*executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", args: ['--no-sandbox', '--disable-extensions-except=C:\\Users\\benis\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 4\\Extensions\\nkbihfbeogaeaoehlefnkodbefgpgknn\\10.22.2_0',
                    '--load-extension=C:\\Users\\benis\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 4\\Extensions\\nkbihfbeogaeaoehlefnkodbefgpgknn\\10.22.2_0', '--enable-remote-extensions'
                ], headless: false*/
            });//C:\\Users\\benis\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 4\\Extensions\\nkbihfbeogaeaoehlefnkodbefgpgknn\\10.22.2_0
            try {

                const privateKey = accounts[i].privateKey;
                console.log("setuping metamask");
                const page = await browser.newPage();
                //await page.setDefaultTimeout(10000000);
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

                await page.goto(formLink);

                console.log("clicking lfg button");
                await page.waitForXPath("/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/div/button");
                const buttons = await page.$x('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/div/button');
                const lfgbutton = buttons[0];
                await lfgbutton.click();
                await page.waitForTimeout(500);

                console.log("clicking agree with terms button");
                await page.waitForXPath('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/div[2]/input');
                const acceptTerms = await page.$x('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/div[2]/input');
                await acceptTerms[0].click();
                await page.waitForTimeout(1000);

                console.log("clicking connect button");
                await page.waitForXPath('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/button');
                const buttonConnect1 = await page.$x('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/button');
                await buttonConnect1[0].click();
                await page.waitForTimeout(1000);

                //metamask popup
                console.log("setuping metamask connect");
                const page2 = await browser.newPage();
                //await page.setDefaultTimeout(10000000);
                await page2.goto("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#");

                await page2.waitForXPath("/html/body/div[1]/div/div[2]/div/div[3]/div[2]/button[2]");
                const buttonNext = await page2.$x("/html/body/div[1]/div/div[2]/div/div[3]/div[2]/button[2]");
                await buttonNext[0].click();
                await page2.waitForTimeout(1000);


                await page2.reload();
                console.log("clicking connect button in MM")
                await page2.waitForXPath("/html/body/div[1]/div/div[2]/div/div[2]/div[2]/div[2]/footer/button[2]");
                const buttonConnect2 = await page2.$x("/html/body/div[1]/div/div[2]/div/div[2]/div[2]/div[2]/footer/button[2]");
                await buttonConnect2[0].click();
                await page2.waitForTimeout(1000);
/*
                console.log("signing message, going back to main page");
                await page2.waitForXPath("/html/body/div[1]/div/div[2]/div/div[3]/button[2]");
                const buttonSign = await page2.$x("/html/body/div[1]/div/div[2]/div/div[3]/button[2]");
                await buttonSign[0].click();
                await page2.waitForTimeout(1000);
*/
                await page2.close();
                console.log("filling email");
                await page.waitForXPath('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/form/div/input');
                const emailinput = await page.$x('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/form/div/input');
                await emailinput[0].type(mail)
                await page.waitForTimeout(1000);

                console.log("waiting for code");
                const code = await handleEmail(auth, mail)

                console.log("received email");
                console.log("filling code");
                await page.waitForXPath('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/form/div/input');
                const input = await page.$x('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/form/div/input');
                await input[0].type(code)
                await page.waitForTimeout(1000);

                console.log("submitting form");
                await page.waitForXPath('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/form/div/button');
                const button = await page.$x('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/form/div/button');
                await button[0].click();
                await page.waitForTimeout(1000);

                console.log("waiting for confirmation");
                await page.waitForXPath('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/h2');
                const title = await page.$x('/html/body/app-root/app-master/app-whitelist/div/div/div/div[2]/div/h2');
                await page.waitForTimeout(500);
                if (title.innerHTML === "You're in!") {
                    console.log("confirmed");
                    entries.push({
                        mail: mail,
                        privateKey: privateKey,
                        address: accounts[i].address
                    });
                    fs.writeFileSync("entries001" + Date.now() + ".json", JSON.stringify(entries));
                    browser.close();
                }
                else {
                    k--;
                    console.log("not confirmed");
                    numRunning = 0;
                    console.log(numRunning);
                    browser.close();
                    return;
                }
            } catch (e) {
                console.log(e);
                k--;
                numRunning = 0;
                console.log(numRunning);

                browser.close();
                return;
            }

        }
    } catch (e) {
        console.log(e);
        k--;
        numRunning = 0;
        console.log(numRunning);
        return;
    }

}


const channelID = "1052920499426037822"
const getmessagesurl = "https://discord.com/api/v9/channels/" + channelID + "/messages?limit=50";
const headers = {
    authorization: ''//discord Auth token for monitoring account
}

let links = [];


async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function getMessage() {
    while (true) {
        let newLink = true; let response;
        try {
            response = await axios.get(getmessagesurl, { headers: headers })
        } catch (e) {
            console.log(e);
            continue;
        }
        //console.log(JSON.stringify(response.data));
        console.log("got message");
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].content.includes("petaverse.com")) {
                for (let j = 0; j < links.length; j++) {
                    if (response.data[i].content.includes(links[j])) {
                        newLink = false;
                    }
                }
                if (!newLink) break;
                const textArr = response.data[i].content.split(" ");
                for (let j = 0; j < textArr.length; j++) {
                    if (textArr[j].includes("petaverse.com")) {
                        links.push(textArr[j]);
                        numRunning++;
                        console.log(numRunning);
                        if (numRunning < 2) {
                            console.log(numRunning);
                            try {
                                main(textArr[j]);
                            } catch (e) {
                                console.log(e);
                                numRunning = 0;
                                console.log(numRunning);
                            }
                            console.log(numRunning);
                        }
                        else { console.log("too many running"); console.log(numRunning); }
                    }
                }
            }
        }
        await sleep(6600);
    }
}

getMessage();


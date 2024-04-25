const puppeteer = require("puppeteer-core");

(async () => {
  console.log("Launching browser...");

  let args = ["--no-sandbox", "--disable-blink-features=AutomationControlled"];
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Specify the path to Chrome
    args: args,
    headless: false,
    defaultViewport: null,
    userDataDir: "C:\\Users\\domin\\AppData\\Local\\Google\\Chrome\\User Data",

    ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    ignoreHTTPSErrors: true,
  });

  console.log("Browser launched successfully");
  const page = await browser.newPage();
  console.log("Page created successfully");
  let nextNum = getScore();
  console.log("nextScore", nextNum);
  // Intercept network requests
  await page.setRequestInterception(true);
  page.on("request", async (interceptedRequest) => {
    if (
      interceptedRequest.method() === "POST" &&
      interceptedRequest.url() ===
        "https://api.mybitcoinkingdom.com/api/score/set"
    ) {
      console.log("Intercepted request");
      try {
        // Modify the request data
        console.log("Modifying request data");
        const modifiedData = { username: "my_username", score: nextNum }; // Modify the data as needed
        // Overwrite request POST data with the modified data
        await interceptedRequest.continue({
          postData: JSON.stringify(modifiedData),
        });
        console.log(
          "Request data modified successfully",
          new Date().toISOString()
        );
        nextNum = getScore();
        console.log("nextScore " + nextNum);
      } catch (error) {
        console.error("Error modifying request data:", error);
        interceptedRequest.abort();
      }
    } else {
      interceptedRequest.continue(); // Continue other requests
    }
  });
  console.log("Request interception enabled");
  // Navigate to a website triggering the requests (replace with your actual scenario)
  await page.goto("https://play.mybitcoinkingdom.com/");
  console.log("Navigated to website successfully");
  // Close the browser when done
  // await browser.close();
})();

function getScore() {
  let a = min;
  let b = max;
  if (a > b) {
    [a, b] = [b, a]; // Swap values if a is greater than b
  }

  // Generate random integer within the range [a, b]
  const mini = Math.ceil(a);

  const maxi = Math.floor(b);
  const num = Math.floor(Math.random() * (maxi - mini + 1)) + mini;
  return num;
}
let min = 4328;
let max = 5217;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  const [newMin, newMax] = input.split(" ");
  console.log("input", input);

  console.log("newMin", newMin);
  console.log("newMax", newMax);
  if (!isNaN(parseInt(newMin)) && !isNaN(parseInt(newMax))) {
    min = parseInt(newMin);
    max = parseInt(newMax);
  }
  rl.prompt("change interval"); // Show the prompt for new input
});

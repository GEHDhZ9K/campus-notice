const puppeteer = require("puppeteer");
const fs = require("fs");

function fileread(){
  let data = fs.readFileSync("config.json")
  var data_load = JSON.parse(data)
  return [data_load["username"], data_load["password"]]
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://campus.softwarica.edu.np/sign-in");
  await page.screenshot({"path": "campus.jpg"})

  await page.type("#main-wrapper > section > div > div > div > div > div > div > div.col-lg-6.my-auto > div > form > div:nth-child(1) > input", fileread()[0]);
  await page.type("#main-wrapper > section > div > div > div > div > div > div > div.col-lg-6.my-auto > div > form > div:nth-child(2) > input", fileread()[1]);

  await page.keyboard.press("Enter");
  await page.waitForNavigation();

  await browser.close();
})();
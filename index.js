const puppeteer = require("puppeteer");
const fs = require("fs");

function fileread(){
  let data = fs.readFileSync("config.json")
  var data_load = JSON.parse(data)
  return [data_load["username"], data_load["password"]]
};

(async () => {
 const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto("https://schoolworkspro.com/sign-in");
  
  await page.type("#main-wrapper > section > div > div > div > div > div > div > div.col-lg-6.my-auto > div > form > div:nth-child(1) > input", fileread()[0]);
  await page.type("#main-wrapper > section > div > div > div > div > div > div > div.col-lg-6.my-auto > div > form > div:nth-child(2) > input", fileread()[1]);

  await page.keyboard.press("Enter");
  await page.waitForNavigation();

  await page.goto("https://schoolworkspro.com/news-and-announcements", {waitUntil: "networkidle2"});

  for (var button = 1; button < 10; button++){
    await page.click(`#main-wrapper > section.pt-0 > div > div.row.justify-content-center > div:nth-child(${button}) > div > div > div.card-footer > div > div:nth-child(2) > button > span`);
  };

  var list_title = [], list_time = [], list_poster = [], list_text= [];

  for(var count = 1; count < 10; count++){
    list_title.push(await page.$eval(`#main-wrapper > section.pt-0 > div > div.row.justify-content-center > div:nth-child(${count}) > div > div > div.card-body > div:nth-child(1) > div.col-lg-10.col-md-10.col-sm-10 > h5`, element => element.textContent));
    list_time.push(await page.$eval(`#main-wrapper > section.pt-0 > div > div.row.justify-content-center > div:nth-child(${count}) > div > div > div.card-body > div:nth-child(2) > div > div > div:nth-child(2) > span.font-italic.text-secondary.ml-3`, element => element.textContent));
    list_poster.push(await page.$eval(`#main-wrapper > section.pt-0 > div > div.row.justify-content-center > div:nth-child(${count}) > div > div > div.card-body > div:nth-child(2) > div > div > div:nth-child(2) > span:nth-child(1)`, element => element.textContent));
    list_text.push(await page.$eval(`#main-wrapper > section.pt-0 > div > div.row.justify-content-center > div:nth-child(${count}) > div > div > div.card-body > div.row.mt-3 > div > p`, element => element.textContent));
  };

  for(var count_i = 0, size_l = list_title.length; count_i < size_l; count_i++){
    console.log(list_title[count_i]);
    console.log(list_time[count_i]);
    console.log(list_poster[count_i]);
    console.log(list_text[count_i]);
    console.log("-------------------------");
  }

  await browser.close();
})();

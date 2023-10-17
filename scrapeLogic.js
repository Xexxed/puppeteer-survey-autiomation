const puppeteer = require("puppeteer");
//const fs = require("fs");

const { randomInt } = require("crypto");
require("dotenv").config();
async function clickOnFirstCellInRows(page, tableClassName) {
  // Find the table based on the provided class name
  const tableSelector = `.${tableClassName}`;
  const rows = await page.$$(`${tableSelector} tbody tr`);

  for (const row of rows) {
    const firstCell = await row.$("td");
    await firstCell.click();
    // You can perform actions on the 'firstCell' here
  }
}
async function NextButton(page) {
  //await new Promise((resolve) => setTimeout(resolve, 500));
  await page.waitForSelector("#NextButton");
  await page.click("#NextButton");
}
async function clickOnSelector(page, selector) {
  //await new Promise((resolve) => setTimeout(resolve, 500));
  await page.waitForSelector(selector);
  await page.click(selector);
  //await new Promise((resolve) => setTimeout(resolve, 500));
}
const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  try {
    await page.goto("https://rbixm.qualtrics.com/jfe/form/SV_555CTB7cbZ434fs");
    console.log("Page loaded");
    await page.viewport({ width: 1920, height: 1080 });
    await page.waitForSelector(
      "#QID115 > div.Inner.BorderColor.TB > div > div.QuestionText.BorderColor > img"
    );
    console.log("Survey loaded");

    // Wait for the iframe to load
    await page.waitForSelector("#QR\\~QID114");
    await page.type("#QR\\~QID114", "29293");
    await new Promise((resolve) => setTimeout(resolve, 2500));
    await page.click("#NextButton");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.waitForSelector("#QR\\~QID6");
    await page.select("#QR\\~QID6", "38");
    console.log("State selected");
    // Switch to the iframe
    await clickOnSelector(page, "#QR\\~QID118\\~2");

    const todayCells = await page.$$('td[class*="ui-datepicker-today"]');

    // Click the first matching element
    await todayCells[0].click();
    await page.waitForSelector("#QR\\~QID8\\#1\\~1");
    await page.select("#QR\\~QID8\\#1\\~1", randomInt(1, 12).toString());
    await page.waitForSelector("#QR\\~QID8\\#2\\~1");
    await page.select("#QR\\~QID8\\#2\\~1", randomInt(1, 59).toString());
    await page.waitForSelector("#QR\\~QID8\\#3\\~1");
    await page.select("#QR\\~QID8\\#3\\~1", randomInt(1, 2).toString());
    console.log("Time selected");
    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.click("#NextButton");
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    await page.waitForSelector("#QR\\~QID18\\~22");
    await page.click("#QID18-22-label");
    await page.click("#QID18-22-label");
    await page.click("#QID18-22-label");

    //await clickOnSelector(page, "#QID18-22-label");

    //await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("#QID18-22-label clicked");
    // await page.screenshot({
    //   path: "screenshot.jpg",
    // });
    await NextButton(page);
    console.log("Next Button clicked");
    //await new Promise((resolve) => setTimeout(resolve, 10000));
    // await page.screenshot({
    //   path: "screenshot2.jpg",
    // });

    await clickOnSelector(page, "#QID13-3-label");
    await clickOnSelector(page, "#QID13-3-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID12-2-label");
    await clickOnSelector(page, "#QID12-2-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID83-1-label");
    await clickOnSelector(page, "#QID83-1-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID84-1-label");
    await clickOnSelector(page, "#QID84-1-label");

    await NextButton(page);
    console.log("Survey Halfway done");
    await clickOnSelector(page, "#QID123-3-label");
    await clickOnSelector(page, "#QID123-3-label");

    await clickOnSelector(page, "#QID124-2-label");
    await clickOnSelector(page, "#QID124-2-label");

    await NextButton(page);
    await page.waitForSelector(".ChoiceStructure tbody tr td");
    await clickOnFirstCellInRows(page, "ChoiceStructure");
    await clickOnFirstCellInRows(page, "ChoiceStructure");
    // await page.screenshot({
    //   path: "screenshot4.jpg",
    // });
    await NextButton(page);
    //
    await page.waitForSelector(
      "#QID41 > div.Inner.BorderColor.Likert > div > fieldset > div > table"
    );
    await clickOnFirstCellInRows(page, "ChoiceStructure");
    await clickOnFirstCellInRows(page, "ChoiceStructure");
    // await page.screenshot({
    //   path: "screenshot3.jpg",
    // });
    await NextButton(page);
    await page.waitForSelector("#QR\\~QID120");

    await NextButton(page);
    await clickOnSelector(page, "#QID38-2-label");
    await clickOnSelector(page, "#QID38-2-label");
    await clickOnSelector(page, "#QID38-2-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID103-1-label");
    await clickOnSelector(page, "#QID103-1-label");
    await clickOnSelector(page, "#QID103-1-label");

    await NextButton(page);
    await page.waitForSelector(
      "#QID46 > div.Inner.BorderColor.MACOL > div > fieldset > div > table"
    );
    const numbers = [3, 8, 27, 37, 38, 34, 9, 4, 28, 11, 35, 39];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNum = numbers[randomIndex].toString();
    await page.click(`#QID46-${randomNum}-label`);
    await page.click(`#QID46-${randomNum}-label`);
    await page.click(`#QID46-${randomNum}-label`);
    await page.click(`#QID46-${randomNum}-label`);
    await page.click(`#QID46-${randomNum}-label`);
    //await page.click(`#QID46-${randomNum}-label`);

    // await page.screenshot({
    //   path: "screenshot5.jpg",
    // });
    await NextButton(page);
    console.log("Menu Selected");
    console.log("Survey Almost done");
    await clickOnSelector(page, "#QID48-12-label");

    await NextButton(page);
    await page.waitForSelector(
      "#QID49 > div.Inner.BorderColor.Likert > div > fieldset > div > table"
    );
    await clickOnFirstCellInRows(page, "ChoiceStructure");
    await clickOnFirstCellInRows(page, "ChoiceStructure");
    await NextButton(page);
    await clickOnSelector(page, "#QID50-1-label");
    await clickOnSelector(page, "#QID50-1-label");
    await clickOnSelector(page, "#QID50-1-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID60-3-label");
    await clickOnSelector(page, "#QID60-3-label");
    await clickOnSelector(page, "#QID60-3-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID62-4-label");
    await clickOnSelector(page, "#QID62-4-label");
    await clickOnSelector(page, "#QID62-4-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID57-2-label");
    await clickOnSelector(page, "#QID57-2-label");
    await clickOnSelector(page, "#QID57-2-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID94-2-label");
    await clickOnSelector(page, "#QID94-2-label");
    await clickOnSelector(page, "#QID94-2-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID96-1-label");
    await clickOnSelector(page, "#QID96-1-label");
    await clickOnSelector(page, "#QID96-1-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID55-3-label");
    await clickOnSelector(page, "#QID55-3-label");
    await clickOnSelector(page, "#QID55-3-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID97-1-label");
    await clickOnSelector(page, "#QID97-1-label");
    await clickOnSelector(page, "#QID97-1-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID78-2-label");
    await clickOnSelector(page, "#QID78-2-label");
    await clickOnSelector(page, "#QID78-2-label");

    await NextButton(page);
    await clickOnSelector(page, "#QID100-2-label");
    await clickOnSelector(page, "#QID100-2-label");
    await clickOnSelector(page, "#QID100-2-label");

    await NextButton(page);
    await page.waitForSelector("#EndOfSurvey > strong:nth-child(7)");
    console.log("Survey Done");

    const selectorContent = await page.evaluate(() => {
      // const selector = document.querySelector(
      //   "#EndOfSurvey > strong:nth-child(7)"
      // );
      const selector = document.body;
      return selector.outerHTML;
    });
    //Save the content to a text file
    //fs.writeFileSync("iframe_content.txt", selectorContent, "utf-8");

    console.log("Iframe content has been saved to iframe_content.txt");
    //console.log(selectorContent);

    res.send(selectorContent);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };

import puppeteer from "puppeteer";

describe("filter events by city", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".city");
    await page.waitForSelector(".event")
  });

  afterAll(() => {
    browser.close();
  });

  test("When user hasn't searched for a city, show upcoming events from all cities", async ()=>{
    const allListedEvents = await page.$$(".event")

    expect(allListedEvents.length).toBe(32)
  })

  test("User should see a list of suggestions when they search for a city", async()=>{
    await page.type(".city", "Berlin")
    const suggestions = await page.$eval(".suggestions", el => el.innerHTML)

    expect(suggestions).toContain("Berlin, Germany")
  })

  test("User can select a city from the suggested list", async()=>{
    await page.click(".suggestedCity")
    const listedEvents = await page.$$(".event");
    
for (let eventItem of listedEvents) {
    let innerTextProperty = await eventItem.getProperty("innerText")
    let innerText = await innerTextProperty.jsonValue()
    expect(innerText).toContain("Berlin, Germany")
}
    
  })
});

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer
      .launch
      //     {
      // headless: false,
      // slowMo: 250,
      // timeout: 0}
      ();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).not.toBeNull();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });
});

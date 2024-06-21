import puppeteer from 'puppeteer';

async function scrap() {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.goto("https://chat.openai.com/", { waitUntil: 'networkidle0' });
    
    // Wait for the textarea to be available
    await page.waitForSelector('textarea');

    await page.type('textarea', 'what is the capital of France , and what is the story behind it ?');

    // Click on the send button
    await page.waitForSelector('button[data-testid="send-button"]');
    await page.click('button[data-testid="send-button"]');


    await page.waitForSelector('.markdown p');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const texts = await page.evaluate(() => {
        const elements = document.querySelectorAll('.markdown p');
        return Array.from(elements, element => element.textContent);
    });

    console.log(texts);

    // await browser.close();
}

scrap().catch(error => console.error('Error:', error));

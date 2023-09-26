const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.lacourt.org/tentativeRulingNet/ui/main.aspx?casetype=civil');

    // Enter the case number into the search box
    await page.type('input[name="CaseNumber"]', '21STCV26571');

    // Click the search button
    await Promise.all([
        page.waitForNavigation(),
        page.click('input[id="submit2"]'),
    ]);

    // Check if the case was found
    const caseFound = await page.evaluate(() => {
        const noResultsElement = document.querySelector('#speechSynthesis');
        return !noResultsElement || !noResultsElement.innerText.includes('No rulings found');
    });

    console.log(caseFound ? 'Case was found.' : 'Case was not found.');

    await browser.close();
})();
const puppeteer = require('puppeteer');

async function checkCase(caseNumber) {
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    await page.goto('https://www.lacourt.org/tentativeRulingNet/ui/main.aspx?casetype=civil');

    // Enter the case number into the search box
    await page.type('input[name="CaseNumber"]', caseNumber);

    // Click the search button
    await Promise.all([
        page.waitForNavigation(),
        page.click('input[id="submit2"]')
    ]);

    // Check if the case was found
    const caseFound = await page.evaluate(() => {
        const noResultsElement = document.querySelector('#speechSynthesis');
        return (
            !noResultsElement ||
            !noResultsElement.innerText.includes('No rulings found')
        );
    });

    await browser.close();

    return caseFound;
}

module.exports = checkCase;
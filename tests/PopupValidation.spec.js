const {test, expect} = require('@playwright/test')

test(`@Web Prompt Validation`, async ({page}) => {
    await page.goto(`https://rahulshettyacademy.com/AutomationPractice/`)
    // await page.goto(`https://google.com`)
    // await page.goBack()
    // await page.goForward()
    await expect( page.locator(`[id="displayed-text"]`)).toBeVisible()
    await page.locator(`[id="hide-textbox"]`).click()
    await expect( page.locator(`[id="displayed-text"]`)).toBeHidden()
    page.on("dialog", async (dialog) =>   await dialog.accept() )
        // await dialog.dismiss()
    await page.locator(`[id="confirmbtn"]`).click()
    await page.locator(`[id="mousehover"]`).hover()
    await page.locator(`[href="#top"]`).click()
    
})

test("Screenshot Test", async ({page}) => {
    await page.goto(`https://rahulshettyacademy.com/AutomationPractice/`)
    await expect( page.locator(`[id="displayed-text"]`)).toBeVisible()
    await page.locator(`[id="displayed-text"]`).screenshot({path: 'partialScreenshot.png'}) //Partial page
    await page.locator(`[id="hide-textbox"]`).click()
    await expect( page.locator(`[id="displayed-text"]`)).toBeHidden()  
    await page.screenshot({path: 'screenshot.png'}) //Full page
})

test("Visual Test", async ({page}) => {
    await page.goto("https://www.google.com/")
    expect(await page.screenshot({path: "google.png"})).toMatchSnapshot("landingPage.png")

})
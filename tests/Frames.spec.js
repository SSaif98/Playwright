const {test, expect} = require('@playwright/test')

test(`Frames Handling`, async ({page}) => {
    await page.goto(`https://rahulshettyacademy.com/AutomationPractice/`)
    await expect( page.locator(`[id="displayed-text"]`)).toBeVisible()
    const framePage = await page.frameLocator(`[id="courses-iframe"]`)
    let emailAddress = await framePage.locator(`[class="auto-container"] [class="clearfix"] li`).first().textContent()
    console.log(emailAddress)
    await page.locator(`[id="hide-textbox"]`).click()
    await expect( page.locator(`[id="displayed-text"]`)).toBeHidden()
})

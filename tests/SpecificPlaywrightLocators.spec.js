const { test, expect } = require('@playwright/test');

test(`Special locators of Playwright`, async ({page}) => {
     await page.goto(`https://rahulshettyacademy.com/angularpractice`)
     await page.getByLabel('Check me out if you Love IceCreams!').check()
    await page.getByLabel(`Employed`).check()
    await page.getByLabel(`Gender`).selectOption('Male')
    await page.getByPlaceholder('Password').fill("HelloThere")
    await page.getByRole("button", {name : "Submit"}).click()
    let bool = await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    expect(bool).toBeTruthy()
    await page.getByRole("link", {name : "Shop"}).click()
    await page.locator(`[class="col-lg-3 col-md-6 mb-3"]`).filter({hasText : "Nokia Edge"}).getByRole("button", {name : "Add"}).click()
    await page.locator(`[class="col-lg-3 col-md-6 mb-3"]`).filter({hasNotText : "Nokia Edge"}).first().getByRole("button").click()
    
    // page.pause()
})
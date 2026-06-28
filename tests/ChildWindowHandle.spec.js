const {test, expect} = require('@playwright/test')

test(`Child Windows Handle`, async ({browser})=> {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagepractise/')
    let documentLink = page.locator(`[href="https://rahulshettyacademy.com/documents-request"]`)
    
    const [documentPage] = await Promise.all(
    [
    context.waitForEvent('page'),
    await documentLink.click()
    ])
    await documentPage.locator(`[class="im-para red"]`).waitFor()
    let redContentLoc = documentPage.locator(`[class="im-para red"]`)
    let content = await redContentLoc.textContent()
    expect(content).toBe(`Please email us at mentor@rahulshettyacademy.com with below template to receive response `)
    let uName = content.split(`@`)[1].split(`.com`)[0].trim()
    console.log(uName)
    let userName = page.locator(`[id="username"]`)
    await userName.waitFor()
    await userName.fill(uName)
    console.log(await userName.inputValue())

    // await documentPage.pause()
});
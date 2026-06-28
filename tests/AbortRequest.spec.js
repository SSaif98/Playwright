const {test, expect} = require('@playwright/test')

test(`Aborting request`, async ({browser})=> {
    const context = await browser.newContext()
    const page = await context.newPage()

    // await page.route("**/*.css", route => { route.abort() })
    // await page.route("**/*.{jpg,png}", route => { route.abort() })

    page.on('request', request => { console.log(request.url())}) //When ever request occur this line will listen the request.
    page.on('response', response => { console.log(response.url(), response.status() )}) 


    await page.goto('https://rahulshettyacademy.com/loginpagepractise/')
    let userName = page.locator(`[id="username"]`)
    let productTitles = page.locator(`[class="card-title"] a`)
   await  expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
   await userName.fill('rahulshettyacademy')
   await page.locator(`#password`).fill('Learning@830$3mK2')

    await page.locator(`[value="admin"]`).check()
    await page.locator(`[type="submit"]`).click()
    let productName = await productTitles.nth(0).textContent()
    expect(productName).toBe('iphone X')
    await expect(page).toHaveTitle('ProtoCommerce')
    console.log(await productTitles.allTextContents())
});

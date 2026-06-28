const {test, expect} = require('@playwright/test')

test(`Browser Context Playwright Test => Login`, async ({browser})=> {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagepractise/')
    let userName = page.locator(`[id="username"]`)
    let productTitles = page.locator(`[class="card-title"] a`)
   await  expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
   await userName.fill('rahulshettyacademy')
   await page.locator(`#password`).fill('Learning@830$3mK2')
   await page.locator(`[id="usertype"][value="user"]`).check()
    await page.locator(`[value="admin"]`).check()
    await page.locator(`[type="submit"]`).click()
    let productName = await productTitles.nth(0).textContent()
    expect(productName).toBe('iphone X')
    await expect(page).toHaveTitle('ProtoCommerce')
    console.log(await productTitles.allTextContents())
});


test(`Verify error msg on login page`, async ({page})=> {
    await page.goto('https://rahulshettyacademy.com/loginpagepractise/')
    let userName = page.locator(`[id="username"]`)
    await userName.fill('saif')
    await page.locator(`#password`).fill('1')
    await page.locator(`[type="submit"]`).click()
    await page.locator(`[class="alert alert-danger col-md-12"][style="display: block;"]`).isVisible()
    const errorMsg = await page.locator(`[class="alert alert-danger col-md-12"][style="display: block;"]`).textContent()
    await expect(page.locator(`[class="alert alert-danger col-md-12"][style="display: block;"]`)).toContainText('Incorrect')
    await expect(errorMsg).toBe('Incorrect username/password.')
    await expect(errorMsg).toContain('username/password.')
    console.log(errorMsg)
    await page.locator(`[class="alert alert-danger col-md-12"][style="display: none;"]`).isVisible()   
    await userName.clear()
    await userName.fill('haider')
   // await userName.fill("")
    await userName.fill('rahulshettyacademy')
});

test(`Page Playwright Test`, async ({page})=> {
    await page.goto('https://google.com')
    console.log(await page.title())
   await expect(page).toHaveTitle('Google')
});


test(`UI Controls`, async ({page})=> {
    await page.goto('https://rahulshettyacademy.com/loginpagepractise/')
    let userName = page.locator(`[id="username"]`)
    let password = page.locator(`#password`)
    let submit = page.locator(`[type="submit"]`)
    let userCheck = page.locator(`[id="usertype"][value="user"]`)
    let adminCheck = page.locator(`[value="admin"]`)
    let dropdown = page.locator(`[data-style="btn-info"]`)
    let userAlert =  page.locator(`[class="btn btn-success"][autofocus]`)
    let terms = page.locator(`[name="terms"]`)
    let documentLink = page.locator(`[href="https://rahulshettyacademy.com/documents-request"]`)
    let techsmarthireLink = page.locator(`[href="https://techsmarthire.com/"]`)
   
    await userName.fill('rahulshettyacademy')
    await password.fill('Learning@830$3mK2')
    await userCheck.check()
    await userAlert.waitFor()
    await userAlert.click()
    await adminCheck.check()
    await expect(adminCheck).toBeChecked()
    // console.log(adminCheck.isChecked())
    expect(await adminCheck.isChecked()).toBeTruthy()
    expect(await terms.isChecked()).toBeFalsy()

    await expect(documentLink).toHaveAttribute('class', `blinkingText`)
    await expect(techsmarthireLink).toHaveAttribute('class', `blinkingText`)

    await dropdown.selectOption(`stud`)
    await dropdown.selectOption(`Consultant`)
    await submit.click()
});


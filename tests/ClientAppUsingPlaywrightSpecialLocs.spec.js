const {test, expect} = require('@playwright/test')



test("End To End Case", async ({page}) => {
    page.goto(`https://rahulshettyacademy.com/client/#/auth/login`)

    let emailAddress = `sandy869@gmail.com`
    let pwd = `Osama186934.`
    await page.getByPlaceholder('email@example.com').fill(emailAddress)
    await page.getByPlaceholder('enter your passsword').fill(pwd)
    await page.getByRole("button", {name : "Login"}).click()
    
    await  page.locator(`[class="card-body"] b`).first().waitFor()
    await page.waitForLoadState(`networkidle`)
    let products = page.locator(`[class="card-body"]`)
    let productName = 'ZARA COAT 3'
    let productPrice;
    let count = await products.count()

    await products.filter({hasText : `${productName}`}).getByRole("button", {name : "Add To Cart"}).click()
    await page.getByRole("listitem").getByRole('button', {name: 'Cart'}).click()
    
    // await page.locator(`[routerlink="/dashboard/cart"]`).click()
    await page.locator(`button[routerlink="/dashboard"]`).waitFor()
    await expect(page.getByText(productName)).toBeVisible()

    await page.getByText(`Buy Now`).click()

    await page.locator(`[class="payment__type payment__type--cc active"]`).waitFor()
    await page.locator(`select[class="input ddl"]`).last().selectOption('31')

    await page.locator(`[class="input txt"]`).first().fill('123')
    await page.locator(`[class="input txt"]`).last().fill('Syed Saif Ali')
    await page.getByPlaceholder(`Select Country`).pressSequentially('pak')
    await page.locator(`span[class="ng-star-inserted"]`).waitFor()
    await page.getByText("Pakistan").click()
  
    let bool = await page.locator(`label:has-text('${emailAddress}')`).isVisible()
    await expect(bool).toBeTruthy()
    console.log(bool)
    await page.locator(`[class="actions"] a`).click()
    await page.locator(`label[class="ng-star-inserted"]`).waitFor()
    
    let orderId = await page.locator(`label[class="ng-star-inserted"]`).textContent()
    orderId = orderId.replace(/\|/g, '').trim()
    await page.getByText("Orders History Page").click()
    await page.locator(`tbody [class="ng-star-inserted"] th`).first().waitFor()
    let list = await page.locator(`tr[class="ng-star-inserted"]`)
    for(let i = 0; i< await list.count() ; i++){
        let listId = await list.nth(i).locator(`[scope]`).textContent()
        if(listId.includes(orderId)){
            await list.getByText('View').nth(i).click()
            break;
    }
    }
    await expect(page.getByText(orderId)).toBeVisible()
    expect(await page.locator(`[class="address"]`).nth(0).locator(`[class="text"]`).nth(0).textContent()).toContain(emailAddress);
    expect(await page.locator(`[class="address"]`).nth(1).locator(`[class="text"]`).nth(0).textContent()).toContain(emailAddress);
   await expect(page.getByText(productName)).toBeVisible();

})
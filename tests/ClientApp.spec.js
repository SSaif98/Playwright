const {test, expect} = require('@playwright/test')

test(`Client App Register And Login`, async ({page}) => {
    await page.goto(`https://rahulshettyacademy.com/client/#/auth/login`)
    await page.locator(`[class="text-reset"]`).click()

    let randomNumber = Math.floor(Math.random() * 100)
    let emailAddress = `saif${randomNumber}@gmail.com`
    let pwd = `Osama12${randomNumber}34.`
    console.log(pwd, emailAddress)
    await page.locator(`[type="firstName"]`).fill(`Saif`+ randomNumber)
    await page.locator(`[type="lastName"]`).fill(`Ali`+ randomNumber)
    await page.locator(`[type="email"]`).fill(emailAddress)
    await page.locator(`[placeholder="enter your number"]`).fill(`1234567890`)
    await page.locator(`[formcontrolname="occupation"]`).selectOption(`Student`)
    await page.locator(`[placeholder="Passsword"]`).fill(pwd)
    await page.locator(`[placeholder="Confirm Passsword"]`).fill(pwd)    
    await page.locator(`[value="Male"]`).check()
    await page.locator(`[formcontrolname="required"]`).check()
    await page.locator(`[value="Register"]`).click()
    expect(await page.locator(`[class="headcolor"]`).textContent()).toBe(`Account Created Successfully`)
    await page.locator(`[class="btn btn-primary"]`).click()

    await page.locator(`[formcontrolname="userEmail"]`).fill(emailAddress)
    await page.locator(`[formcontrolname="userPassword"]`).fill(pwd)    
    await page.locator(`[value="Login"]`).click()

    await  page.locator(`[class="card-body"] b`).first().waitFor()
    await page.waitForLoadState(`networkidle`)

    // let firstProduct = await page.locator(`[class="card-body"] b`).first().textContent()
    // expect(firstProduct).toBe(`ADIDAS ORIGINAL`)
    console.log(await page.locator(`[class="card-body"] b`).allTextContents())
})

test.only("End To End Case", async ({page}) => {
    page.goto(`https://rahulshettyacademy.com/client/#/auth/login`)
    let emailAddress = `sandy869@gmail.com`
    let pwd = `Osama186934.`
    await page.locator(`[formcontrolname="userEmail"]`).fill(emailAddress)
    await page.locator(`[formcontrolname="userPassword"]`).fill(pwd)    
    await page.locator(`[value="Login"]`).click()   

    await  page.locator(`[class="card-body"] b`).first().waitFor()
    await page.waitForLoadState(`networkidle`)
    let products = page.locator(`[class="card-body"]`)
    let productName = 'ZARA COAT 3'
    let productPrice;
    let count = await products.count()
    for(let i = 0 ; i<count ; i++){
        if(await products.nth(i).locator(`b`).textContent() === productName){
            await products.locator(`[class="btn w-10 rounded"]`).nth(i).click()
            productPrice = await products.locator(`[class="text-muted"]`).nth(i).textContent()
            break;
        }
    }   
    await page.locator(`[routerlink="/dashboard/cart"]`).click()
    await page.locator(`button[routerlink="/dashboard"]`).waitFor()
    expect(await page.locator(`[class="cartSection"] h3`).textContent()).toBe(productName)
    let itemNumber = await page.locator(`[class="itemNumber"]`).textContent()
    expect(await page.locator(`[class="prodTotal cartSection"] p`).textContent()).toContain(productPrice)
    await page.locator(`text='Buy Now'`).click()
    await page.locator(`[class="payment__type payment__type--cc active"]`).waitFor()
    await page.locator(`select[class="input ddl"]`).last().selectOption('31')
    await page.locator(`[class="input txt"]`).first().fill('123')
    await page.locator(`[class="input txt"]`).last().fill('Syed Saif Ali')
    await page.locator(`[placeholder="Select Country"]`).pressSequentially('pak')
    await page.locator(`span[class="ng-star-inserted"]`).waitFor()
    let countryCount = await page.locator(`span[class="ng-star-inserted"]`).count()
    for(let i = 0 ; i < countryCount ; i++){
        if(await page.locator(`span[class="ng-star-inserted"]`).nth(i).textContent() === ' Pakistan'){
            await page.locator(`span[class="ng-star-inserted"]`).nth(i).click()
            break;
        }
    }
    expect(await page.locator(`[class="item__title"]`).textContent()).toContain(productName)
    expect(await page.locator(`[class="item__price"]`).textContent()).toContain(productPrice)
    let bool = await page.locator(`label:has-text('${emailAddress}')`).isVisible()
    await expect(bool).toBeTruthy()
    console.log(bool)
    await page.locator(`[class="actions"] a`).click()
    await page.locator(`label[class="ng-star-inserted"]`).waitFor()
    let orderId = await page.locator(`label[class="ng-star-inserted"]`).textContent()
    orderId = orderId.replace(/\|/g, '').trim()
    expect(await page.locator(`[class="line-item product-info-column m-3"] div[class="title"]`).textContent()).toBe(productName)
       expect(await page.locator(`[class="line-item product-info-column"] div[class="title"]`).textContent()).toContain(productPrice)
    await page.locator(`label[routerlink*="myorders"]`).click()
    await page.locator(`tbody [class="ng-star-inserted"] th`).first().waitFor()
    let list = await page.locator(`tr[class="ng-star-inserted"]`)
    for(let i = 0; i< await list.count() ; i++){
        let listId = await list.nth(i).locator(`[scope]`).textContent()
        if(listId.includes(orderId)){
            await list.locator(`[class="btn btn-primary"]`).nth(i).click()
            break;
    }
    }
    expect(await page.locator(`[class="col-text -main"]`).textContent()).toBe(orderId)
    expect(await page.locator(`[class="address"]`).nth(0).locator(`[class="text"]`).nth(0).textContent()).toContain(emailAddress)
        expect(await page.locator(`[class="address"]`).nth(1).locator(`[class="text"]`).nth(0).textContent()).toContain(emailAddress)
    expect(await page.locator(`[class="title"]`)).toHaveText(productName)
    // await page.pause()

})
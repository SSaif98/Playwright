const { test, expect } = require('@playwright/test');

class OrderDetailFormPage{
    constructor(page){
        this.page = page
        this.ccSection =  page.locator(`[class="payment__type payment__type--cc active"]`)
        this.ccYear = page.locator(`select[class="input ddl"]`)
        this.csv = page.locator(`[class="input txt"]`)
        this.nameOnCard = page.locator(`[class="input txt"]`)
        this.countryTextField = page.locator(`[placeholder="Select Country"]`)
        this.countryRecord = page.locator(`span[class="ng-star-inserted"]`)
        this.title = page.locator(`[class="item__title"]`)
        this.price = page.locator(`[class="item__price"]`)
        this.placeOrderBtn = page.locator(`[class="actions"] a`)
    }

    async fillCCForm(year, csvNum, name){
        await this.ccSection.waitFor()
        await this.ccYear.last().selectOption(year)
        await this.csv.first().fill(csvNum)
        await this.nameOnCard.last().fill(name)
    }
    async selectCountry(countryName){
    await this.countryTextField.pressSequentially('pak')
    await this.countryRecord.waitFor()
    let countryCount = await this.countryRecord.count()
    for (let i = 0; i < countryCount; i++) {
        if (await this.countryRecord.nth(i).textContent() === countryName) {
            await this.countryRecord.nth(i).click()
            break;
        }
    }
    }
    async verifyShippingDetails(productName, productPrice, emailAddress){
            expect(await this.title.textContent()).toContain(productName)
            expect(await this.price.textContent()).toContain(productPrice)
            let bool = await this.page.locator(`label:has-text('${emailAddress}')`).isVisible()
            await expect(bool).toBeTruthy()
    }

    async clickPlaceOrderBtn(){
        await this.placeOrderBtn.click()
    }
}

module.exports = {OrderDetailFormPage}
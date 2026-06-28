const { test, expect } = require('@playwright/test');

class OrderHistoryPage{
    constructor(page){
        this.page = page
        this.historyPage = page.locator(`tbody [class="ng-star-inserted"] th`)
        this.list = page.locator(`tr[class="ng-star-inserted"]`)
        this.orderId = page.locator(`[class="col-text -main"]`)
        this.emailAddress = page.locator(`[class="address"]`)
        this.productName =  page.locator(`[class="title"]`)
    }

    async verifyOrderHitory(orderId, emailAddress, productName){
    await this.historyPage.first().waitFor()
    let list = await this.list
    for (let i = 0; i < await list.count(); i++) {
        let listId = await list.nth(i).locator(`[scope]`).textContent()
        if (listId.includes(orderId)) {
            await list.locator(`[class="btn btn-primary"]`).nth(i).click()
            break;
        }
    }
    expect(await this.orderId .textContent()).toBe(orderId)
    expect(await this.emailAddress.nth(0).locator(`[class="text"]`).nth(0).textContent()).toContain(emailAddress)
    expect(await this.emailAddress.nth(1).locator(`[class="text"]`).nth(0).textContent()).toContain(emailAddress)
    expect(await this.productName).toHaveText(productName)
    }

}

module.exports = {OrderHistoryPage}
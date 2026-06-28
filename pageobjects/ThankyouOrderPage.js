const { test, expect } = require('@playwright/test');

class ThankyouOrderPage{
    constructor(page){
        this.page = page
        this.orderPage =  page.locator(`label[class="ng-star-inserted"]`)
        this.productName = page.locator(`[class="line-item product-info-column m-3"] div[class="title"]`)
        this.productPrice = page.locator(`[class="line-item product-info-column"] div[class="title"]`)
        this.myOrderIcon =  page.locator(`label[routerlink*="myorders"]`)
    }

    async verifyOrderDetails(productName, productPrice){
        await this.orderPage.waitFor()
        let orderId = await this.orderPage.textContent()
        orderId = orderId.replace(/\|/g, '').trim()
        expect(await this.productName.textContent()).toBe(productName)
        expect(await this.productPrice.textContent()).toContain(productPrice)
        return orderId;
    }

    async clickMyOrderIcon(){
        await this.myOrderIcon.click()
    }


}

module.exports = {ThankyouOrderPage}
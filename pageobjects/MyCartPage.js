const { test, expect } = require('@playwright/test');

class MyCartPage{
    constructor(page){
        this.page = page;
        this.dashboardBtn = page.locator(`button[routerlink="/dashboard"]`)
        this.itemName = page.locator(`[class="cartSection"] h3`)
        this.cartPrice = page.locator(`[class="prodTotal cartSection"] p`)
        this.buyNowBtn = page.locator(`text='Buy Now'`)
        this.productPrice = page.locator(`[class="prodTotal cartSection"] p`)
    }

    async byNowBtn(){
        await this.buyNowBtn.click()
}
    async verifyAddedItemInCart(productName, productPrice){
        await this.dashboardBtn.waitFor()
        expect(await this.itemName.textContent()).toBe(productName)
        expect(await this.productPrice.textContent()).toContain(productPrice)
    }
}



module.exports = {MyCartPage}
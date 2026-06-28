class DashBoardPage {

    constructor(page) {
        this.page = page;
        this.productsText = page.locator(`[class="card-body"] b`)
        this.products = page.locator(`[class="card-body"]`)
        this.cartBtn = page.locator(`[routerlink="/dashboard/cart"]`)
    }

    async searchProducts(productName) {
        let productPrice;
        let count = await this.products.count()
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator(`b`).textContent() === productName) {
                await this.products.locator(`[class="btn w-10 rounded"]`).nth(i).click()
                productPrice = await this.products.locator(`[class="text-muted"]`).nth(i).textContent()
                break;
            }
        }
        return productPrice;
    }

    async clickCartBtn(){
    await this.cartBtn.click()
    }
}

module.exports = { DashBoardPage }
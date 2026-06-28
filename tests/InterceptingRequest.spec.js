const { test, expect, request } = require('@playwright/test');

test("Security Test", async ({ page }) => {

    page.goto(`https://rahulshettyacademy.com/client/#/auth/login`)
    let emailAddress = `sandy869@gmail.com`
    let pwd = `Osama186934.`
    await page.locator(`[formcontrolname="userEmail"]`).fill(emailAddress)
    await page.locator(`[formcontrolname="userPassword"]`).fill(pwd)
    await page.locator(`[value="Login"]`).click()

    await page.locator(`[class="card-body"] b`).first().waitFor()
    await page.waitForLoadState(`networkidle`)
    await page.locator(`[routerlink="/dashboard/myorders"]`).click()

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => {
            route.continue({
                url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=640f1e3b1c5d2e0015f8a7b8"
            })
        }
    )
    await page.locator(`[class="btn btn-primary"]`).first().click()
    await page.locator(`[class="blink_me"]`).waitFor()
    await expect(page.locator(`[class="blink_me"]`)).toContainText('You are not authorize to view this order')
})
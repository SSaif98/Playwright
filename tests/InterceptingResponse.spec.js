const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
const loginPayload = { userEmail: "sandy869@gmail.com", userPassword: "Osama186934." }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayload = { "data": [], "message": "No Orders" };

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

})


//create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*`,
        async route => {
            //intercepting the response - Api Response => {Playwright Fake Response} => Browser => Render Data
            const responseActual = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayload);
            route.fulfill(
                {
                    responseActual,
                    body
                }
            ) //giving response to browser
        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*`)
    await page.locator(`[class="mt-4 ng-star-inserted"]`).waitFor();
    expect(await page.locator(`[class="mt-4 ng-star-inserted"]`)).toContainText('You have No Orders to show at this time.')


});

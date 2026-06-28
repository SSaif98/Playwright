// const {test, expect, request} = require('@playwright/test')
// const loginPayload = {userEmail: "sandy869@gmail.com", userPassword: "Osama186934."}
// const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
// const {APIUtils} = require('./utils/APIUtils')
// let response;

// test.beforeAll(async () => {
//     const apiContext = await request.newContext()
//     const apiUtils = new APIUtils(apiContext, loginPayload)
//     response = await apiUtils.createOrder(orderPayload)
// })

// test("End To End Case when login thorugh API", async ({page}) => {
//     let emailAddress = `sandy869@gmail.com`
//     // const apiUtils = new APIUtils(apiContext, loginPayload)
//     // const orderId = await apiUtils.createOrder(orderPayload)

//     await page.addInitScript(value => {
//     window.localStorage.setItem('token', value)
//     }, response.token)

//     page.goto(`https://rahulshettyacademy.com/client/#/auth/login`)

//     await page.locator(`label[routerlink*="myorders"]`).click()
//     await page.locator(`tbody [class="ng-star-inserted"] th`).first().waitFor()
//     let list = await page.locator(`tr[class="ng-star-inserted"]`)
//     for(let i = 0; i< await list.count() ; i++){
//         let listId = await list.nth(i).locator(`[scope]`).textContent()
//         if(listId.includes(response.orderId)){
//             await list.locator(`[class="btn btn-primary"]`).nth(i).click()
//             break;
//     }
//     }
//     expect(await page.locator(`[class="col-text -main"]`).textContent()).toBe(response.orderId)
//     await page.pause()
//     expect(await page.locator(`[class="address"]`).nth(0).locator(`[class="text"]`).nth(0).textContent()).toContain(emailAddress)
//         expect(await page.locator(`[class="address"]`).nth(1).locator(`[class="text"]`).nth(0).textContent()).toContain(emailAddress)
//     expect(await page.locator(`[class="title"]`)).toHaveText(productName)
//     // await page.pause()

// })


const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {userEmail: "sandy869@gmail.com", userPassword: "Osama186934."}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayload);
   response =  await apiUtils.createOrder(orderPayload);
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order -
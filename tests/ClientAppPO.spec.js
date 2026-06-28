const { test, expect } = require('@playwright/test');
const { customTest } = require("../tests/utils/test-base.js")
const { POManager } = require("../pageobjects/POManager.js")
const dataSet = JSON.parse(JSON.stringify(require("../tests/utils/placeOrderData.json")));

test.describe.configure({mode: "parallel"})

for (let i = 0; i < dataSet.length; i++) {

    test(`End To End Case ${dataSet[i].emailAddress}`, async ({ page }) => {
        let productPrice;

        const poManager = new POManager(page)
        const loginPage = poManager.getLoginPage()
        await loginPage.goTo()
        await loginPage.validLogin(dataSet[i].emailAddress, dataSet[i].pwd)
        const dashboard = poManager.getDashboardPage()
        productPrice = await dashboard.searchProducts(dataSet[i].productName)
        await dashboard.clickCartBtn()
        const myCart = poManager.getMyCartPage()
        await myCart.verifyAddedItemInCart(dataSet[i].productName, productPrice)
        await myCart.byNowBtn()
        const orderDetailForm = poManager.getOrderDetailFormPage(page)
        await orderDetailForm.fillCCForm('31', '123', 'Syed Saif Ali')
        await orderDetailForm.selectCountry(' Pakistan')
        await orderDetailForm.verifyShippingDetails(dataSet[i].productName, productPrice, dataSet[i].emailAddress)
        await orderDetailForm.clickPlaceOrderBtn()
        const orderPage = poManager.getThankyouOrderPage(page)
        let orderId = await orderPage.verifyOrderDetails(dataSet[i].productName, productPrice);
        await orderPage.clickMyOrderIcon()
        const historyPage = poManager.getOrderHistoryPage(page)
        await historyPage.verifyOrderHitory(orderId, dataSet[i].emailAddress, dataSet[i].productName)
    })

}

    customTest(`@Web New Test`, async ({ page, testDataForOrder }) => {
        let productPrice;
        const poManager = new POManager(page)
        const loginPage = poManager.getLoginPage()
        await loginPage.goTo()
        await loginPage.validLogin(testDataForOrder.emailAddress, testDataForOrder.pwd)
        const dashboard = poManager.getDashboardPage()
        productPrice = await dashboard.searchProducts(testDataForOrder.productName)
        await dashboard.clickCartBtn()
        const myCart = poManager.getMyCartPage()
        await myCart.verifyAddedItemInCart(testDataForOrder.productName, productPrice)
        await myCart.byNowBtn()
    })

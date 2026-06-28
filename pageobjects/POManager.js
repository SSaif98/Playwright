const { LoginPage } = require("./LoginPage.js")
const { DashBoardPage } = require("./DashBoardPage.js")
const {MyCartPage} = require("./MyCartPage.js")
const {OrderDetailFormPage} = require("./OrderDetailFormPage.js")
const {ThankyouOrderPage} = require("./ThankyouOrderPage.js")
const {OrderHistoryPage} = require("./OrderHistoryPage.js")

class POManager{
    constructor(page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboard = new DashBoardPage(this.page)
        this.myCart = new MyCartPage(this.page)
        this.OrderDetailForm = new OrderDetailFormPage(this.page)
        this.ThankyouOrderPage =  new ThankyouOrderPage(this.page)
        this.OrderHistoryPage =  new OrderHistoryPage(this.page)
    }

     getLoginPage(){
        return this.loginPage
    }
     getDashboardPage(){
        return this.dashboard
    }
    getMyCartPage(){
        return this.myCart
    }
    getOrderDetailFormPage(){
        return this.OrderDetailForm
    }
    getThankyouOrderPage(){
        return this.ThankyouOrderPage
    }
    getOrderHistoryPage(){
        return this.OrderHistoryPage
    }
}

module.exports = {POManager}
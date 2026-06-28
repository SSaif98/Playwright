class LoginPage{
    constructor(page){
        this.page = page;
        this.signinBtn = page.locator(`[value="Login"]`)
        this.userEmail = page.locator(`[formcontrolname="userEmail"]`)
        this.pwd =  page.locator(`[formcontrolname="userPassword"]`)
    }

    async goTo(){
       await this.page.goto(`https://rahulshettyacademy.com/client/#/auth/login`)
    }

    async validLogin(userEmail, pwd){
            await this.userEmail.fill(userEmail)
            await this.pwd.fill(pwd)    
            await this.signinBtn.click()   
            await this.page.waitForLoadState(`networkidle`)

    }
}

module.exports = {LoginPage}
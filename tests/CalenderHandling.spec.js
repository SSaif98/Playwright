const { test, expect } = require('@playwright/test');

test('Calender Handling', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    let month = "6"
    let day = "15"
    let year = "2028"
    let expectedList = [month, day, year]
    
    await page.goto(`https://rahulshettyacademy.com/seleniumPractise/#/offers`)
    let calenderIcon = page.locator(`[class*="react-date-picker__calendar-button"] svg`)
    await calenderIcon.waitFor()
    await calenderIcon.click()
    await page.locator(`[class="react-calendar__navigation__label"]`).click()
   await page.locator(`[class*="react-calendar__navigation__label__labelText"]`).click()
    await page.getByText(year).click()
    await page.locator(`[class*='react-calendar__year-view__months__month']`).nth(Number(month) - 1).click()
    await page.locator(`[class="react-calendar__tile react-calendar__month-view__days__day"],[class="react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--weekend"]`).filter({hasText : day}).click()
    let inputValues = page.locator(`[class="react-date-picker__inputGroup"] [type="number"]`)
    for(let i = 0 ; i<expectedList.length ; i++){
    let value = await inputValues.nth(i).inputValue()
    expect(value).toEqual(expectedList[i])
}

})


const base = require('@playwright/test');

exports.customTest =  base.test.extend(
{
    testDataForOrder : {
    emailAddress : "sandy869@gmail.com",
    pwd : "Osama186934.",
    productName : "ZARA COAT 3"
}
}
)
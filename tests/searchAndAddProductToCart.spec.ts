/* eslint-disable playwright/expect-expect */
import { test, expect } from "@playwright/test";
import { acceptCookies, loadFixtureData, searchProduct } from "../commands/generalCommands"
import { TestEnvironment } from "../interfaces/generalInterfaces";
import { } from "../commands/signUpAssertionsCommands"
import { baseUrls } from "../commands/globalUrlsConfiguration";
import { pathToFileURL } from "url";

// env can be set manuall for that particular test with values: prod, stg, local, dev
const env = process.env.TEST_ENV as TestEnvironment;
const testsConfiguration: Array<searchAndAddConfiguration> = [
    {
        translationFixture: "productsFixtures.json",
        productName: "Jacket"
    },
    {
        translationFixture: "productsFixtures.json",
        productName: "blanket"
    },

]

test.describe.parallel("Search the product and add to the cart", () => {
    for (const testObject of testsConfiguration) {
        test(`Search the ${testObject.productName} and add to the cart`, async ({
            page
        }) => {
            const assertData = await loadFixtureData(
                `fixtures/${testObject.translationFixture}`
            );
            await page.goto(baseUrls[env]);
            await acceptCookies(page);
            await searchProduct(page, assertData, testObject.productName);
            const numberOfSearchedProductsLocator = page.locator("[class='toolbar-number']").last()
            await expect(numberOfSearchedProductsLocator).toBeVisible();
            const numberOfSearchedProductsText = await numberOfSearchedProductsLocator.innerText();
            const numberOfSearchedProduct: number = (parseInt(numberOfSearchedProductsText));
            const nextPageClicks = (Math.ceil(numberOfSearchedProduct / 12) - 1);
            console.log(nextPageClicks);
            for (let a = 0; a <= nextPageClicks; a++) {

                const productsLeft = numberOfSearchedProduct - nextPageClicks * 12
                for (let i = 0; i < productsLeft; i++) {

                    const productLocator = page.locator("[class='product-item-link']").nth(i);
                    await productLocator.click();

                    const productNameLocator = page.locator("span[itemprop='name']");
                    const productName = await productNameLocator.innerText();
                    await page.goBack();
                    console.log(productName);




                }
                if (a <= nextPageClicks - 1) {
                    await page.getByRole('link', { name: ' Page Next' }).click();
                }
            }
        });
    }
});

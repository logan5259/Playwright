/* eslint-disable playwright/expect-expect */
import { test, expect } from "@playwright/test";
import { loadFixtureData, selectProductsFromMainMenu } from "../commands/generalCommands"
import { TestEnvironment, FilterAndAddToCartProductTestConfiguration } from "../interfaces/generalInterfaces";
import { assertSelectedProductsFromMainMenu, selectAndAssertFirstFilterProducts, selectAndAssertSecondtFilterProducts, addAndAssertProductToCart } from "../commands/productsAssertionCommands"
import { baseUrls } from "../commands/globalUrlsConfiguration";


// env can be set manuall for that particular test with values: prod, stg, local, dev
const env = process.env.TEST_ENV as TestEnvironment;
const testsConfiguration: Array<FilterAndAddToCartProductTestConfiguration> = [
    {
        translationFixture: "productsFixtures.json",
        mainProductCategory: "Women",
        productSubtype: "Tops",
        productType: "Tees",
        firstProductFilter: "Size",
        firstProductFilterValue: "S",
        secondProductFilter: "PRICE",
        secondProductFilterValue: "$30.00 - $39.99",
        selectedProductName: "Diva Gym Tee",
        productSize: "S",
        productColor: "Orange",
        searchResults: true,
    },

]

test.describe.parallel("Select product category, apply filters and add to cart", () => {
    for (const testObject of testsConfiguration) {
        test(`Select product category, apply filters and add ${testObject.selectedProductName} to cart`, async ({
            page
        }) => {
            const assertData = await loadFixtureData(
                `fixtures/${testObject.translationFixture}`
            );
            await page.goto(baseUrls[env]);
            await selectProductsFromMainMenu(page, testObject);
            await assertSelectedProductsFromMainMenu(page, testObject);
            await selectAndAssertFirstFilterProducts(page, testObject);
            await selectAndAssertSecondtFilterProducts(page, testObject);
            await addAndAssertProductToCart(page, testObject);
            await page.close();
        });
    }
});

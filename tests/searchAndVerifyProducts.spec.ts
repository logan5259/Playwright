/* eslint-disable playwright/expect-expect */
import { test } from "@playwright/test";
import { loadFixtureData, searchProduct } from "../commands/generalCommands"
import { TestEnvironment, SearchTestConfiguration } from "../interfaces/generalInterfaces";
import { assertSearchedProducts } from "../commands/productsAssertionCommands"
import { baseUrls } from "../commands/globalUrlsConfiguration";


// env can be set manuall for that particular test with values: prod, stg, local, dev
const env = process.env.TEST_ENV as TestEnvironment;
const testsConfiguration: Array<SearchTestConfiguration> = [
    {
        translationFixture: "productsFixtures.json",
        searchedProduct: "Jacket",
        searchResults: true,
    },
    {
        translationFixture: "productsFixtures.json",
        searchedProduct: "blanket",
        searchResults: false,
    },
    {
        translationFixture: "productsFixtures.json",
        searchedProduct: "!@#$%^&*()_",
        searchResults: false,
    },
    {
        translationFixture: "productsFixtures.json",
        searchedProduct: "12312312312",
        searchResults: false,
    },
]

test.describe.parallel("Search the product and verify if the keyword is in ptoduct title or description", () => {
    for (const testObject of testsConfiguration) {
        test(`Search the ${testObject.searchedProduct} and verify if the keyword is in products title or description`, async ({
            page
        }) => {
            const assertData = await loadFixtureData(
                `fixtures/${testObject.translationFixture}`
            );
            await page.goto(baseUrls[env]);
            await searchProduct(page, assertData, testObject.searchedProduct);
            await assertSearchedProducts(page, testObject, assertData, testObject.searchedProduct);
            await page.close();
        });
    }
});

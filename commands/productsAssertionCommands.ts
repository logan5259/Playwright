import { Page, expect } from "@playwright/test";
import { searchTestConfiguration, ProductsFixtures } from "../interfaces/generalInterfaces";

export async function assertSearchedProducts(
    page: Page,
    testObject: searchTestConfiguration,
    assertData: ProductsFixtures,

) {
    const { searchedProduct, searchResults } = testObject;
    const { noSearchResultsWarning } = assertData;

    const searchResultsHeaderLocator = page.getByRole('heading', { name: `Search results for: '${searchedProduct}'` }).locator('span');
    const productNameLocator = page.locator("span[itemprop='name']");
    const detailsTabLocator = page.getByRole('link', { name: 'Details ' });
    const productDescriptionLocator = page.getByLabel('Details');
    const nextPageButtonLocator = page.getByRole('link', { name: ' Page Next' });

    if (searchResults === true) {
        const numberOfSearchedProductsLocator = page.locator("div[class='toolbar toolbar-products'] [class='toolbar-number']").nth(2);
        await expect(numberOfSearchedProductsLocator).toBeVisible();
        const numberOfSearchedProductsText = await numberOfSearchedProductsLocator.innerText();
        const numberOfSearchedProduct: number = (parseInt(numberOfSearchedProductsText));
        const nextPageClicks = (Math.ceil(numberOfSearchedProduct / 12) - 1);


        for (let a = 0; a <= nextPageClicks; a++) {

            const productsLeft = numberOfSearchedProduct - nextPageClicks * 12

            for (let i = 0; i < productsLeft; i++) {
                const productLocator = page.locator("[class='product-item-link']").nth(i);

                await productLocator.click({ timeout: 30000 });
                const productName = await productNameLocator.innerText();
                await detailsTabLocator.click();

                expect(productDescriptionLocator).toBeVisible();
                const productDescription = await productDescriptionLocator.innerText();

                let productInformation = (productName.toLowerCase() + ' ' + productDescription.toLowerCase())

                expect(productInformation).toContain(searchedProduct.toLowerCase());

                productInformation = ''
                await page.goBack({ waitUntil: 'load', timeout: 30000 });
                await page.goBack({ waitUntil: 'load', timeout: 30000 });
                await searchResultsHeaderLocator.scrollIntoViewIfNeeded({timeout: 30000});
                await expect(searchResultsHeaderLocator).toBeVisible();
            }
            if (a <= nextPageClicks - 1) {
                await nextPageButtonLocator.click();
            }
        }
    } else {

        await expect(page.getByText(noSearchResultsWarning)).toBeVisible();

    }
}


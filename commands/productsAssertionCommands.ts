import { Page, expect } from "@playwright/test";
import { SearchTestConfiguration, ProductsFixtures, FilterAndAddToCartProductTestConfiguration } from "../interfaces/generalInterfaces";

export async function assertSearchedProducts(
    page: Page,
    testObject: SearchTestConfiguration,
    assertData: ProductsFixtures,
    searchedProduct: string,

) {
    const { searchResults } = testObject;
    const { noSearchResultsWarning } = assertData;

    const searchResultsHeaderLocator = page.getByRole('heading', { name: `Search results for: '${searchedProduct}'` }).locator('span');
    const productNameLocator = page.locator("span[itemprop='name']");
    const detailsTabLocator = page.getByRole('link', { name: 'Details' });
    const productDescriptionLocator = page.getByLabel('Details');
    const nextPageButtonLocator = page.getByRole('link', { name: 'Page Next' });

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
                // This is an issue with inconsistent site navigation behavior.
                await page.goBack({ waitUntil: 'load', timeout: 30000 });
                if (!(await searchResultsHeaderLocator.isVisible())) {

                    await page.goBack({ waitUntil: 'load', timeout: 30000 })

                  }
                await searchResultsHeaderLocator.scrollIntoViewIfNeeded({ timeout: 30000 });
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

export async function assertSelectedProductsFromMainMenu(
    page: Page,
    testObject: FilterAndAddToCartProductTestConfiguration,

) {
    const { productType } = testObject;
    await expect(page.getByLabel('Items').getByText(productType)).toBeVisible();
    const amoutOfProductsLocator = page.locator('#toolbar-amount').first();
    const amountOfProducts = await amoutOfProductsLocator.innerText();
    expect(parseInt(amountOfProducts)).toBeGreaterThan(0);
}

export async function selectAndAssertFirstFilterProducts(
    page: Page,
    testObject: FilterAndAddToCartProductTestConfiguration,

) {
    const { firstProductFilterValue, firstProductFilter } = testObject;
    await page.waitForLoadState('load');
    await page.getByRole('tab', { name: firstProductFilter }).click();
    await page.getByRole('link', { name: firstProductFilterValue, exact: true }).click({ force: true });
    await page.waitForLoadState('load');
    const amoutOfProductsLocator = page.locator('#toolbar-amount').nth(1)
    const amountOfProducts = await amoutOfProductsLocator.innerText();
    for (let i = 0; i < parseInt(amountOfProducts); i++) {
        await expect(page.locator(`div[class='product-item-info'] [option-tooltip-value='${firstProductFilterValue}']`).nth(i)).toBeVisible();
    }
}

export async function selectAndAssertSecondtFilterProducts(
    page: Page,
    testObject: FilterAndAddToCartProductTestConfiguration,

) {
    const { secondProductFilterValue, secondProductFilter } = testObject;
    await page.waitForLoadState('load');
    await page.getByRole('tab', { name: secondProductFilter }).click();
    await page.getByRole('link', { name: secondProductFilterValue }).click({ force: true });
    await page.waitForLoadState('load');
    const amoutOfProductsLocator = page.locator('#toolbar-amount').nth(0)
    const amountOfProducts = await amoutOfProductsLocator.innerText();
    expect(parseInt(amountOfProducts)).toEqual(3);
    for (let i = 0; i < parseInt(amountOfProducts); i++) {
        const priceLocator = page.locator("[id*='product-price']").nth(i);
        const price = await priceLocator.innerText();
        const integerPrice = parseInt(price.match(/\d+/)[0]);
        expect(integerPrice).toBeLessThan(40);

    }
}

export async function addAndAssertProductToCart(
    page: Page,
    testObject: FilterAndAddToCartProductTestConfiguration,

) {
    // Juze nie mam czasu przenosić wszsytkeigo do fixtur
    const { selectedProductName, productSize, productColor } = testObject;
    await page.getByRole('link', { name: selectedProductName, exact: true }).click();
    await expect(page.getByRole('heading', { name: selectedProductName }).locator('span')).toBeVisible();
    await expect(page.locator("button[id='product-addtocart-button']")).toBeVisible();
    await page.getByLabel(productSize, { exact: true }).click();
    await page.getByLabel(productColor).click();
    await page.locator("button[id='product-addtocart-button']").click();
    await expect(page.locator('#product_addtocart_form div').filter({ hasText: 'Adding...' }).nth(3)).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'My Cart Loading...' })).not.toBeVisible();
    await page.getByRole('link', { name: 'My Cart' }).click();
    await page.getByRole('link', { name: 'shopping cart' }).click();
    await expect(page.getByRole('img', { name: 'Loading...' })).not.toBeVisible();
    await expect(page.getByText(selectedProductName, { exact: true }).first()).toBeVisible();
    await expect(page.getByText(productColor, { exact: true })).toBeVisible();
    await expect(page.getByText(productSize, { exact: true })).toBeVisible();
}

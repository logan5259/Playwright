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
    const itemLocator = page.getByLabel('Items').getByText(productType);
    const amoutOfProductsLocator = page.locator('#toolbar-amount').first();
    await expect(itemLocator).toBeVisible();
    const amountOfProducts = await amoutOfProductsLocator.innerText();
    expect(parseInt(amountOfProducts)).toBeGreaterThan(0);
}

export async function selectAndAssertFirstFilterProducts(
    page: Page,
    testObject: FilterAndAddToCartProductTestConfiguration,

) {
    const { firstProductFilterValue, firstProductFilter } = testObject;
    const productFilterTabLocator = page.getByRole('tab', { name: firstProductFilter });
    const productLinkLocator = page.getByRole('link', { name: firstProductFilterValue, exact: true });
    const amoutOfProductsLocator = page.locator('#toolbar-amount').nth(1)
    const amountOfProducts = await amoutOfProductsLocator.innerText();

    await page.waitForLoadState('load');
    await productFilterTabLocator.click();
    await productLinkLocator.click({ force: true });
    await page.waitForLoadState('load');

    for (let i = 0; i < parseInt(amountOfProducts); i++) {
        const productItemInfoLocator = page.locator(`div[class='product-item-info'] [option-tooltip-value='${firstProductFilterValue}']`).nth(i)
        await expect(productItemInfoLocator).toBeVisible();
    }
}

export async function selectAndAssertSecondtFilterProducts(
    page: Page,
    testObject: FilterAndAddToCartProductTestConfiguration,

) {
    const { secondProductFilterValue, secondProductFilter } = testObject;
    const productFilterTabLocator = page.getByRole('tab', { name: secondProductFilter });
    const productLinkLocator = page.getByRole('link', { name: secondProductFilterValue });

    await page.waitForLoadState('load');
    await productFilterTabLocator.click();
    await productLinkLocator.click({ force: true });
    await page.waitForLoadState('load');
    const amoutOfProductsLocator = page.locator('#toolbar-amount').nth(0);
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
    assertData: ProductsFixtures

) {
    const { selectedProductName, productSize, productColor } = testObject;
    const { cartLoadingMessage, addToCartMessage, myCartLabel, shoppingCartLabel, loadingMessage } = assertData;
    const selectedProductLocator = page.getByRole('link', { name: selectedProductName, exact: true });
    const selectedProductHeaderLocator = page.getByRole('heading', { name: selectedProductName }).locator('span');
    const addToCartButtonLocator = page.locator("button[id='product-addtocart-button']");
    const productSizeLabelLocator = page.getByLabel(productSize, { exact: true });
    const productColorLabelLocator = page.getByLabel(productColor);
    const addToCardMessageLocator = page.locator('#product_addtocart_form div').filter({ hasText: addToCartMessage }).nth(3);
    const cartLoadingLinkLocator = page.getByRole('link', { name: cartLoadingMessage });
    const cartLabelLocator = page.getByRole('link', { name: myCartLabel });
    const cartShoppingLabelLocator = page.getByRole('link', { name: shoppingCartLabel });
    const loadingLocator = page.getByRole('img', { name: loadingMessage });
    const selectedProductNameLocator = page.getByText(selectedProductName, { exact: true }).first();
    const selectedProductColorLocator = page.getByText(productColor, { exact: true });
    const selectedProductSizeLocator = page.getByText(productSize, { exact: true })

    await selectedProductLocator.click();
    await expect(selectedProductHeaderLocator).toBeVisible();
    await expect(addToCartButtonLocator).toBeVisible();
    await productSizeLabelLocator.click();
    await productColorLabelLocator.click();
    await addToCartButtonLocator.click();
    await expect(addToCardMessageLocator).not.toBeVisible();
    await expect(cartLoadingLinkLocator).not.toBeVisible();
    await cartLabelLocator.click();
    await cartShoppingLabelLocator.click();
    await expect(loadingLocator).not.toBeVisible();
    await expect(selectedProductNameLocator).toBeVisible();
    await expect(selectedProductColorLocator).toBeVisible();
    await expect(selectedProductSizeLocator).toBeVisible();
}

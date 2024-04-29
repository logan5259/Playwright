import { Page, expect } from "@playwright/test";
import * as faker from 'faker';
import { baseUrls, urls } from "../commands/globalUrlsConfiguration";
import { SignUpFormFixtures, ProductsFixtures, FilterAndAddToCartProductTestConfiguration } from "../interfaces/generalInterfaces";
import {
  TestEnvironment,
} from "../interfaces/generalInterfaces";

export async function visitSignUpPage(
  page: Page,
  env: TestEnvironment,

) {
  const url = baseUrls[env];
  await page.goto(`${url}${urls.signUp}`);
}

export async function acceptCookies(
  page: Page,
) {
  await page.getByLabel('Consent', { exact: true }).click();
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promises: fsPromise } = require("fs");

export async function loadFixture(fixturePath: string) {
  return await fsPromise.readFile(fixturePath, "utf8");
}

export async function loadFixtureData(fixturePath: string) {
  const results = await loadFixture(fixturePath);
  const objResults = await JSON.parse(results);

  return objResults;
}

function generateRandomSpecialSymbols() {
  const specialSymbols = "!@#$%^&*()-_=+[{]}|;:,";
  let randomSpecialSymbols = '';
  const specialSymbolsLength = specialSymbols.length;
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * specialSymbolsLength);
    randomSpecialSymbols += specialSymbols[randomIndex];
  }
  return randomSpecialSymbols;
}

export async function createAccount(
  page: Page,
  assertData: SignUpFormFixtures,
  env: TestEnvironment,
) {
  const { createAccountButtonLabel } = assertData;

  const randomeSpecialSymbols = generateRandomSpecialSymbols()
  const name = faker.name.firstName();
  const lastName = faker.name.lastName();

  const email = faker.internet.email().toLowerCase();
  const password = faker.internet.password() + randomeSpecialSymbols;
  const firstNameLocator = page.locator("input[id='firstname']");
  const lastNameLocator = page.locator("input[id='lastname']");
  const emailLocator = page.locator("input[id='email_address']");
  const passwordLocator = page.locator("input[type='password'][id='password']");
  const passwordConfiramtionLocator = page.locator("input[type='password'][id='password-confirmation']");


  await firstNameLocator.fill(name);
  await lastNameLocator.fill(lastName);
  await emailLocator.fill(email);
  await passwordLocator.fill(password);
  await passwordConfiramtionLocator.fill(password);
  await page.getByRole('button', { name: createAccountButtonLabel }).click();

  expect(page).toHaveURL(`${baseUrls[env]}${urls.accountDetails}`);

  return { email, password, name, lastName };
}

export async function visitSignInPage(
  page: Page,
  env: TestEnvironment,

) {
  const url = baseUrls[env];
  await page.goto(`${url}${urls.signIn}`);
}

export async function loginWithCreatedAccount(
  page: Page,
  assertData: SignUpFormFixtures,
  email: string,
  password: string,

) {
  const { signInButtonLabel } = assertData;
  const loginLocator = page.locator("input[name='login[username]']");
  const passwordLocator = page.locator("input[name='login[password]']");
  const signInButtonLocator = page.getByRole('button', { name: signInButtonLabel });

  await loginLocator.fill(email);
  await passwordLocator.fill(password);
  await signInButtonLocator.click();

}

export async function searchProduct(
  page: Page,
  assertData: ProductsFixtures,
  productName: string
) {
  const { searchPlacholderMessage } = assertData
  await page.getByPlaceholder(searchPlacholderMessage).fill(productName);
  await page.keyboard.press('Enter');
}

export async function selectProductsFromMainMenu(
  page: Page,
  testObject: FilterAndAddToCartProductTestConfiguration

) {
  const { mainProductCategory, productSubtype, productType } = testObject
  await page.getByRole('menuitem', { name: mainProductCategory }).hover();
  await page.getByRole('menuitem', { name: productSubtype }).hover();
  await page.getByRole('menuitem', { name: productType }).click();
}

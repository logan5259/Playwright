/* eslint-disable playwright/expect-expect */
import { test, context } from "@playwright/test";
import { visitSignUpPage, loadFixtureData, createAccount, visitSignInPage, loginWithCreatedAccount } from "../commands/generalCommands"
import { TestEnvironment } from "../interfaces/generalInterfaces";
import { assertSignUpPage, assertSignUpPageValidations, assertPasswordsValidations, assertCreatedAccount, assertRegistrationMessage } from "../commands/signUpAssertionsCommands"

// env can be set manuall for that particular test with values: prod, stg, local, dev
const env = process.env.TEST_ENV as TestEnvironment;

test.describe.parallel("Create the account and log in", () => {

  test(`Create the account and log in`, async ({
    page, context
  }) => {
    const assertData = await loadFixtureData(
      `fixtures/signUpFormFixtures.json`,
    );
    await visitSignUpPage(page, env);
    await assertSignUpPage(page, assertData);
    await assertSignUpPageValidations(page, assertData);
    await assertPasswordsValidations(page, assertData);
    const { email, password, name, lastName } = await createAccount(page, assertData, env);
    await assertRegistrationMessage(page, assertData);
    await assertCreatedAccount(page, assertData, email, name, lastName);
    await page.close();
    const newPage = await context.newPage();
    await context.clearCookies();
    await visitSignInPage(newPage, env);
    await loginWithCreatedAccount(newPage, assertData, email, password);
    await assertCreatedAccount(newPage, assertData, email, name, lastName)

  });

});

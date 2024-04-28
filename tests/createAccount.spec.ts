/* eslint-disable playwright/expect-expect */
import { test } from "@playwright/test";
import { visitSignUpPage, acceptCookies, loadFixtureData, createAndAssertAccount} from "../commands/generalCommands"
import { TestEnvironment } from "../interfaces/generalInterfaces";
import { assertSignUpPage, assertSignUpPageValidations, assertPasswordsValidations } from "../commands/signUpAssertionsCommands"

// env can be set manuall for that particular test with values: prod, stg, local, dev
const env = process.env.TEST_ENV as TestEnvironment;

test.describe.parallel("Create the account and log in", () => {

  test(`Create the account and log in`, async ({
    page,
  }) => {
    const assertData = await loadFixtureData(
      `fixtures/signUpFormFixtures.json`,
    );
    await visitSignUpPage(page, env);
    await acceptCookies(page);
    await assertSignUpPage(page, assertData);
    await assertSignUpPageValidations(page, assertData);
    await assertPasswordsValidations(page, assertData);
    await createAndAssertAccount(page, assertData, env);
  });

});

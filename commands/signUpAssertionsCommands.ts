import { Page, expect, Locator } from "@playwright/test";
import { SignUpFormFixtures } from "../interfaces/generalInterfaces";

export async function assertFontFamilyAndSize(
    locator: Locator,
    fontSize: string,
) {
    await expect(locator).toHaveCSS(
        "font-family",
        "\"open sans\", \"helvetica neue\", Helvetica, Arial, sans-serif",
        { timeout: 10000 },
    );
    await expect(locator).toHaveCSS("font-size", fontSize);
    await expect(locator).toBeVisible();
}

export async function assertSignUpPage(
    page: Page,
    assertData: SignUpFormFixtures,
) {
    const { signupFormHeader, signupFormPresonalInfromationHeader, signInHeader, firstNameLabel, lastNameLabel, emailLabel, passwordLabel, confirmPasswordLabel, requiredFieldDesclimer } = assertData;
    const signupHeaderLocator = page.getByRole("heading", {
        name: signupFormHeader,
    });
    const personalInfromationHeaderLocator = page.getByText(signupFormPresonalInfromationHeader, { exact: true });
    const signinHeaderLocator = page.getByText(signInHeader, { exact: true });
    const firstNameLabelLocator = page.getByText(firstNameLabel, { exact: true });
    const lastNameLabelLocator = page.getByText(lastNameLabel, { exact: true });
    const emailLabelLocator = page.getByText(emailLabel, { exact: true });
    const passwordLabelLocator = page.getByText(passwordLabel, { exact: true }).nth(0);
    const confirmPasswordLabelLocator = page.getByText(confirmPasswordLabel, { exact: true }).nth(0);

    await assertFontFamilyAndSize(

        signupHeaderLocator,
        "40px",
    );
    await assertFontFamilyAndSize(

        personalInfromationHeaderLocator,
        "22px",
    );

    await assertFontFamilyAndSize(

        signinHeaderLocator,
        "22px",
    );

    await assertFontFamilyAndSize(

        firstNameLabelLocator,
        "14px",
    );
    await assertFontFamilyAndSize(

        lastNameLabelLocator,
        "14px",
    );

    await assertFontFamilyAndSize(

        emailLabelLocator,
        "14px",
    );
    await assertFontFamilyAndSize(

        passwordLabelLocator,
        "14px",
    );
    await assertFontFamilyAndSize(

        confirmPasswordLabelLocator,
        "14px",
    );

}

export async function assertSignUpPageValidations(
    page: Page,
    assertData: SignUpFormFixtures,
) {
    const { createAccountButtonLabel, requiredFieldValidationMessage, emailAddressValidationMessage, passwordsAreNotTheSameValidationMessage } = assertData;
    const createAccountButtonLocator = page.getByRole("button", { name: createAccountButtonLabel });
    const emailAddressErrorLocator = page.locator("#email_address-error");
    const firstNameErrorLocator = page.locator("#firstname-error");
    const lastNameErrorLocator = page.locator("#lastname-error");
    const emailLocator = page.locator("input[type='email'][name='email']");

    await expect(createAccountButtonLocator).toBeVisible();
    await createAccountButtonLocator.click();

    await expect(firstNameErrorLocator).toHaveText(requiredFieldValidationMessage)
    await assertFontFamilyAndSize(

        firstNameErrorLocator,
        "12px",
    );

    await expect(lastNameErrorLocator).toHaveText(requiredFieldValidationMessage)
    await assertFontFamilyAndSize(

        lastNameErrorLocator,
        "12px",
    );

    await expect(emailAddressErrorLocator).toHaveText(requiredFieldValidationMessage)
    await assertFontFamilyAndSize(

        emailAddressErrorLocator,
        "12px",
    );
    await expect(emailAddressErrorLocator).toHaveText(requiredFieldValidationMessage)
    await assertFontFamilyAndSize(

        emailAddressErrorLocator,
        "12px",
    );

    await expect(emailAddressErrorLocator).toHaveText(requiredFieldValidationMessage)
    await assertFontFamilyAndSize(

        emailAddressErrorLocator,
        "12px",
    );

    await expect(emailAddressErrorLocator).toHaveText(requiredFieldValidationMessage)
    await assertFontFamilyAndSize(

        emailAddressErrorLocator,
        "12px",
    );
    await emailLocator.fill("!@#$%^&*()_")
    await createAccountButtonLocator.click();

    await expect(emailAddressErrorLocator).toHaveText(emailAddressValidationMessage);
    await assertFontFamilyAndSize(

        emailAddressErrorLocator,
        "12px",
    );
}

export async function assertPasswordsValidations(
    page: Page,
    assertData: SignUpFormFixtures,
) {
    const { createAccountButtonLabel, emailAddressValidationMessage, passwordsAreNotTheSameValidationMessage, passwirdIsTooShortValidationMessage, passwordCharactersValidationMessage } = assertData;

    const createAccountButtonLocator = page.getByRole("button", { name: createAccountButtonLabel });
    const passwordLocator = page.locator("input[type='password'][id='password']");
    const passwordConfiramtionLocator = page.locator("input[type='password'][id='password-confirmation']");
    const emailAddressErrorLocator = page.locator("#email_address-error");
    const passwordErrorConfiramtionLocator = page.locator('#password-confirmation-error');
    const passwordStrengthErrorLocator = page.locator("div[id='password-error']");

    await passwordLocator.fill("test");
    await createAccountButtonLocator.click();
    await expect(passwordStrengthErrorLocator).toHaveText(passwirdIsTooShortValidationMessage);

    await passwordLocator.fill("123456789");
    await createAccountButtonLocator.click();
    await expect(passwordStrengthErrorLocator).toHaveText(passwordCharactersValidationMessage);

    await passwordLocator.fill("test123123123");
    await createAccountButtonLocator.click();
    await expect(passwordStrengthErrorLocator).toHaveText(passwordCharactersValidationMessage);

    await passwordLocator.fill("1!@#$%^&*!");
    await createAccountButtonLocator.click();
    await expect(passwordStrengthErrorLocator).toHaveText(passwordCharactersValidationMessage);

    await passwordLocator.fill("TEsTTHReeCLASSES");
    await createAccountButtonLocator.click();
    await expect(passwordStrengthErrorLocator).toHaveText(passwordCharactersValidationMessage);

    await passwordLocator.fill("!@#$%^&*()_");
    await passwordConfiramtionLocator.fill(")(*&^%#$%^&*");
    await createAccountButtonLocator.click();

    await expect(emailAddressErrorLocator).toHaveText(emailAddressValidationMessage);
    await expect(passwordErrorConfiramtionLocator).toHaveText(passwordsAreNotTheSameValidationMessage);
}

export async function assertCreatedAccount(
    page: Page,
    assertData: SignUpFormFixtures,
    name: string,
    lastName: string,
    email: string,
) {
    const { accountDetailsPageHeader, contactInformationHeader } = assertData;
    const contactInformationLocator = page.locator(`:below(span:has-text("${contactInformationHeader}"))`);
    const accountDetailsHeaderLocator = page.getByRole("heading", {
        name: accountDetailsPageHeader,
    });
    await assertFontFamilyAndSize(

        accountDetailsHeaderLocator,
        "40px",
    );

    await expect(contactInformationLocator.first()).toContainText(`${name}`);
    await expect(contactInformationLocator.first()).toContainText(`${lastName}`);
    await expect(contactInformationLocator.first()).toContainText(`${email}`);
}

export async function assertRegistrationMessage(
    page: Page,
    assertData: SignUpFormFixtures
) {
    const { registrationThankYouMessage } = assertData;
    const thankYouMessageLocator = page.getByText(registrationThankYouMessage, { exact: true });

    await expect(thankYouMessageLocator).toBeVisible();

}

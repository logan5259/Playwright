export enum TestEnvironment {
    dev = "dev",
    stg = "stg",
    prod = "prod",
    local = "local",
  }

export interface SignUpFormFixtures {
    signupFormHeader: string;
    signupFormPresonalInfromationHeader: string;
    signInHeader: string;
    firstNameLabel: string;
    lastNameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    createAccountButtonLabel: string;
    requiredFieldValidationMessage: string;
    emailAddressValidationMessage: string;
    passwordsAreNotTheSameValidationMessage: string;
    passwirdIsTooShortValidationMessage: string;
    passwordCharactersValidationMessage: string;
    accountDetailsPageHeader: string;
    contactInformationHeader: string;
    registrationThankYouMessage: string;
    signInButtonLabel: string;
}

export interface ProductsFixtures {
  searchPlacholderMessage: string;
  noSearchResultsWarning:string;
}

export interface searchTestConfiguration {
  translationFixture: string;
  searchedProduct: string;
  searchResults: boolean;
}

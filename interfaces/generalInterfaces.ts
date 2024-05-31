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
  noSearchResultsWarning: string;
  cartLoadingMessage: string;
  addToCartMessage: string;
  myCartLabel: string;
  shoppingCartLabel: string;
  loadingMessage:string;
}

export interface SearchTestConfiguration {
  translationFixture: string;
  searchedProduct: string;
  searchResults: boolean;
}

export interface FilterAndAddToCartProductTestConfiguration {
  translationFixture: string;
  mainProductCategory: string;
  productSubtype: string;
  productType: string;
  firstProductFilter: string;
  firstProductFilterValue: string;
  secondProductFilter: string;
  secondProductFilterValue: string;
  selectedProductName: string;
  productSize:string;
  productColor: string;
  searchResults: boolean;
}

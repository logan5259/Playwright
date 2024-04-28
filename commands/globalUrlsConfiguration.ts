const trailingSlash = (url = "") => url.endsWith("/") ? url.slice(0, url.length - 1) : url;
const frontendUrl = trailingSlash(process.env.FRONTEND_URL) || "not set, empty, or invalid link";
const backendUrl = trailingSlash(process.env.BACKEND_URL) || "not set, empty, or invalid link";

export const baseUrls = {
    dev: "XXXXXX",
    local: frontendUrl,
    stg: "XXXXXX",
    prod: "https://magento.softwaretestingboard.com",
};

export const urls = {
    signUp: "/customer/account/create/",
    accountDetails: "/customer/account/",
}

export const credentials = {
    localEmail: process.env.LOCAL_EMAIL,
    localPassword: process.env.LOCAL_PASSWORD,
    stgEmail: process.env.STG_EMAIL,
    stgPassword: process.env.STG_PASSWORD,
    devEmail: process.env.DEV_EMAIL,
    devPassword: process.env.DEV_PASSWORD,
  };
  export const testEnvironementVariable = ["XXX", "YYYY"];

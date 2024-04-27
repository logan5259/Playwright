/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig, devices } from "@playwright/test";
import {
  urls,
  baseUrls
} from "./commands/globalUrlsConfiguration";
require("dotenv").config();

export default defineConfig({
  expect: {
    timeout: 30000,
  },
  timeout: 100000,
  testDir: "./tests",
  workers: 4,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  //: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { outputFolder: "playwright-report" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15000,
    video: "off",
    screenshot: "only-on-failure",
    trace: "off",
  },
  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: "setup",
  //     testMatch: /auth.setup\.ts/,
  //   },
  //   {
  //     name: "chromium",
  //     testMatch: "*",
  //     use: {
  //       ...devices["Desktop Chrome"],
  //       viewport: {
  //         width: 100,
  //         height: 100,
  //       },
  //       storageState: "playwright/.auth/user.json",
  //     },
  //   },

  projects: [
    // Setup project auth state across all tests
    // { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        // Use prepared auth state.
        //storageState: "playwright/.auth/user.json",
      },
      // dependencies: ["setup"],
      ...baseUrls,
      ...urls
    },

    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     // Use prepared auth state.
    //     //storageState: "playwright/.auth/user.json",
    //   },
    //   //dependencies: ["setup"],
    // },
  ],
});

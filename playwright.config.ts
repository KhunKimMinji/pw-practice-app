import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  timeout: 40000,
  // globalTimeout: 60000,

  expect: {
    timeout: 2000,
  },

  /* Run tests in files in parallel */

  /* Fail the build on CI if you accidentally left test.only in the source code. */

  /* Retry on CI only */ 
  retries: 1,
  /* Opt out of parallel tests on CI. */

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // ["allure-playwright"],
    ["html"],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    globalsQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4200/"
        : process.env.UAT == "1"
        ? "http://localhost:4202/"
        : "http://localhost:4200/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    // actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode: "off",
      size: { width: 1920, height: 1880 },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "dev",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4200/" },
    },
    {
      name: "chromium",
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        video: {
          mode: "on",
          size: { width: 1920, height: 1880 },
        },
      },
    },
    {
      name: "pageObjectFullScreen",
      testMatch: "usePageObjects.spec.ts",
      use: {
        viewport: { width: 1920, height: 1880 },
      },
    },
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",
      use: {
        ...devices["iPhone 13 Pro"],
        // viewport: { width: 414, height: 800 },
      },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:4200/",
  },
});

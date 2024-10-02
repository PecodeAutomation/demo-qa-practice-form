import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 120000,
  expect: {
    timeout: 15000,
  },
  reporter: [["html"], ["json", { outputFile: "test-results/results.json" }]],
  retries: 1,
  use: {
    baseURL: "https://demoqa.com/",
    browserName: "chromium",
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

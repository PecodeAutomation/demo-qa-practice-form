import { test as baseTest } from '@playwright/test';
import { FormPage } from '../pages/FormPage';

type Pages = {
  formPage: FormPage;
};

export const test = baseTest.extend<Pages>({
  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await formPage.visit("/")
    await use(new FormPage(page));
  },
});

export { expect } from '@playwright/test';
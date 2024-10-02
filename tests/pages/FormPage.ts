import {expect, FrameLocator, Locator, Page} from '@playwright/test';
import {MESSAGES} from '../utils/constants';

export class FormPage {
  // ===========================Locators=====================
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly hobbiesCheckboxes: Locator;
  readonly uploadPictureButton: Locator;
  readonly currentAddressTextarea: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly tableFirstAndLastName: Locator;
  readonly tableEmail: Locator;
  readonly tableGender: Locator;
  readonly tableMobile: Locator;
  readonly tableBirthDate: Locator;
  readonly tableSubjects: Locator;
  readonly tableHobbies: Locator;
  readonly tablePicture: Locator;
  readonly tableAddress: Locator;
  readonly tableStateAndCity: Locator;

  // ===========================Constructor=====================
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileInput = page.locator('#userNumber');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.hobbiesCheckboxes = page.locator('.custom-checkbox');
    this.uploadPictureButton = page.locator('#uploadPicture');
    this.currentAddressTextarea = page.locator('#currentAddress');
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitButton = page.locator('#submit');
    this.tableFirstAndLastName = page.locator(`td:has-text('Student Name') + td`);
    this.tableEmail = page.locator(`td:has-text('Student Email') + td`);
    this.tableGender = page.locator(`td:has-text('Gender') + td`);
    this.tableMobile = page.locator(`td:has-text('Mobile') + td`);
    this.tableBirthDate = page.locator(`td:has-text('Date of Birth') + td`);
    this.tableSubjects = page.locator(`td:has-text('Subjects') + td`);
    this.tableHobbies = page.locator(`td:has-text('Hobbies') + td`);
    this.tablePicture = page.locator(`td:has-text('Picture') + td`);
    this.tableAddress = page.locator(`td:has-text('Address') + td`);
    this.tableStateAndCity = page.locator(`td:has-text('State and City') + td`);
  }

  // ===========================Actions=====================
  async visit(url: string) {
    await this.page.goto(url);
  }

  async waitForDomContentLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillPersonalDetails(firstName: string, lastName: string, email: string) {
    await this.firstNameInput.fill(firstName);
    expect(this.firstNameInput).toHaveValue(firstName);
    await this.lastNameInput.fill(lastName);
    expect(this.lastNameInput).toHaveValue(lastName);
    await this.emailInput.fill(email);
    expect(this.emailInput).toHaveValue(email);
  }

  async selectGender(gender: string) {
    await this.page.getByText(gender, {exact: true}).click();
  }

  async fillMobileNumber(mobile: string) {
    await this.mobileInput.fill(mobile);
    expect(this.mobileInput).toHaveValue(mobile);
  }

  async selectDateOfBirth(date: string) {
    await this.dateOfBirthInput.fill(date);
    await this.page.keyboard.press('Enter');
  }

  async fillSubjects(subject: string) {
    await this.subjectsInput.fill(subject);
    await this.page.keyboard.press('Enter');
  }

  async selectHobbies(hobbies: string[]) {
    for (const hobby of hobbies) {
      await this.page.locator(`text=${hobby}`).click();
    }
  }

  async uploadPicture(filePath: string) {
    await this.uploadPictureButton.setInputFiles(filePath);
  }

  async fillCurrentAddress(address: string) {
    await this.currentAddressTextarea.fill(address);
  }

  async selectState(state: string) {
    await this.stateDropdown.click();
    await this.page.getByText(state, {exact: true}).click();
  }

  async selectCity(city: string) {
    await this.cityDropdown.click();
    await this.page.getByText(city, {exact: true}).click();
  }

  async submitForm() {
    expect(this.submitButton).not.toBeDisabled();
    const [response] = await Promise.all([
      this.page.waitForResponse(response => response.request().method() === 'POST'),
      this.submitButton.click()
    ]);

    return response;
  }

  // ===========================Verifications=====================

  async verifyStudentName(firstName: string, lastName: string) {
    await expect(this.tableFirstAndLastName).toHaveText(`${firstName} ${lastName}`);
  }

  async verifyStudentEmail(email: string) {
    await expect(this.tableEmail).toHaveText(`${email}`);
  }

  async verifyStudentGender(gender: string) {
    await expect(this.tableGender).toHaveText(`${gender}`);
  }

  async verifyStudentMobileNumber(number: string) {
    await expect(this.tableMobile).toHaveText(`${number}`);
  }

  async verifyStudentBirthDate(birthDate: string) {
    await expect(this.tableBirthDate).toHaveText(`${birthDate}`);
  }

  async verifyStudentSubjects(subjects: string) {
    await expect(this.tableSubjects).toHaveText(`${subjects}`);
  }

  async verifyStudentHobbies(hobbies: string) {
    await expect(this.tableHobbies).toHaveText(`${hobbies}`);
  }

  async verifyStudentPicture(picture: string) {
    await expect(this.tablePicture).toHaveText(`${picture}`);
  }

  async verifyStudentAddress(address: string) {
    await expect(this.tableAddress).toHaveText(`${address}`);
  }

  async verifyStudentStateAndCity(state: string, city: string) {
    await expect(this.tableStateAndCity).toHaveText(`${state} ${city}`);
  }

  async verifyInvalidEmailMessage() {
    const validationMessage = await this.emailInput.evaluate(
      input => (input as HTMLInputElement).validationMessage
    );
    expect(validationMessage).toBe(MESSAGES.emailMatchErrorMessage);
  }

  async verifyInvalidMobileNumberMessage() {
    const validationMessage = await this.mobileInput.evaluate(
      input => (input as HTMLInputElement).validationMessage
    );
    expect(validationMessage).toBe(MESSAGES.mobileMatchErrorMessage);
  }
}

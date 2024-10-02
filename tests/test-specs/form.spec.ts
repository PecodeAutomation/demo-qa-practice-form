import { test, expect } from '../fixtures/pageFixture';
import { ENDPOINTS, USER_DETAILS } from '../utils/constants';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';


test.describe('Student Registration Form Tests', () => {
  test.beforeEach(async ({ formPage }) => {
    await formPage.visit(ENDPOINTS.practiceForm);
  });

  test('Successful form submission with valid inputs', async ({ formPage }) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const dateOfBirth = dayjs().subtract(18, 'year').format('DD MMMM, YYYY');

    await formPage.fillPersonalDetails(firstName, lastName, email);
    await formPage.selectGender(USER_DETAILS.gender);
    await formPage.fillMobileNumber(USER_DETAILS.mobileNumber);
    await formPage.selectDateOfBirth(dateOfBirth);
    await formPage.fillSubjects(USER_DETAILS.subjects.join(', '));
    await formPage.selectHobbies(USER_DETAILS.hobbies);
    await formPage.uploadPicture(USER_DETAILS.picturePath);
    await formPage.fillCurrentAddress(USER_DETAILS.currentAddress);
    await formPage.selectState(USER_DETAILS.state);
    await formPage.selectCity(USER_DETAILS.city);
    await formPage.submitForm();

    await formPage.verifyStudentName(firstName, lastName);
    await formPage.verifyStudentEmail(email);
    await formPage.verifyStudentGender(USER_DETAILS.gender);
    await formPage.verifyStudentMobileNumber(USER_DETAILS.mobileNumber);
    await formPage.verifyStudentBirthDate(dayjs(dateOfBirth).format('DD MMMM,YYYY'));
    await formPage.verifyStudentSubjects(USER_DETAILS.subjects.join(', '));
    await formPage.verifyStudentHobbies(USER_DETAILS.hobbies.join(', '));
    await formPage.verifyStudentPicture('Test-Logo.svg.png');
    await formPage.verifyStudentAddress(USER_DETAILS.currentAddress);
    await formPage.verifyStudentStateAndCity(USER_DETAILS.state, USER_DETAILS.city);
  });

  test('Invalid email input shows error', async ({ formPage }) => {
    const dateOfBirth = dayjs().subtract(18, 'year').format('DD MMMM, YYYY');

    await formPage.fillPersonalDetails(USER_DETAILS.firstName, USER_DETAILS.lastName, USER_DETAILS.invalidEmail);
    await formPage.selectGender(USER_DETAILS.gender);
    await formPage.fillMobileNumber(USER_DETAILS.mobileNumber);
    await formPage.selectDateOfBirth(dateOfBirth);
    await formPage.fillSubjects(USER_DETAILS.subjects.join(', '));
    await formPage.selectHobbies(USER_DETAILS.hobbies);
    await formPage.uploadPicture(USER_DETAILS.picturePath);
    await formPage.fillCurrentAddress(USER_DETAILS.currentAddress);
    await formPage.selectState(USER_DETAILS.state);
    await formPage.selectCity(USER_DETAILS.city);
    await formPage.submitForm();

    await formPage.verifyInvalidEmailMessage();
  });

  test('Invalid mobile number shows error', async ({ formPage }) => {
    const dateOfBirth = dayjs().subtract(18, 'year').format('DD MMMM, YYYY');
    
    await formPage.fillPersonalDetails(USER_DETAILS.firstName, USER_DETAILS.lastName, USER_DETAILS.email);
    await formPage.selectGender(USER_DETAILS.gender);
    await formPage.fillMobileNumber(USER_DETAILS.invalidMobileNumber);
    await formPage.selectDateOfBirth(dateOfBirth);
    await formPage.fillSubjects(USER_DETAILS.subjects.join(', '));
    await formPage.selectHobbies(USER_DETAILS.hobbies);
    await formPage.uploadPicture(USER_DETAILS.picturePath);
    await formPage.fillCurrentAddress(USER_DETAILS.currentAddress);
    await formPage.selectState(USER_DETAILS.state);
    await formPage.selectCity(USER_DETAILS.city);
    await formPage.submitForm();

    await formPage.verifyInvalidMobileNumberMessage();
  });

  test('Submit without required fields', async ({ formPage }) => {
    await formPage.waitForDomContentLoad();
    const response = await formPage.submitForm();
    expect(response.status()).toBe(204);
  });
});

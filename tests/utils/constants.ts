import path from 'path';

export const USER_DETAILS = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  mobileNumber: '1234567890',
  currentAddress: '1234 Test Street',
  state: 'NCR',
  city: 'Delhi',
  subjects: ['Maths'],
  hobbies: ['Sports'],
  picturePath: path.join(__dirname, '../assets/Test-Logo.svg.png'),
  invalidEmail: 'johndoe',
  invalidMobileNumber: '123456789'
};

export const ENDPOINTS = {
  practiceForm: 'automation-practice-form/'
};

export const MESSAGES = {
  emailMatchErrorMessage: 'Please match the requested format.',
  mobileMatchErrorMessage: "Please lengthen this text to 10 characters or more (you are currently using 9 characters)."
};
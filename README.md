# Student Registration Form Test Suite

This project contains automated tests for a Student Registration Form using Playwright and TypeScript. The tests verify the functionality of the form, including input validation, successful submissions, and error handling.

## Table of Contents

- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Description](#test-description)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/[this-repo].git
   cd playwright-demo-qa

   Install dependencies: Make sure you have Node.js installed, then run:
   npm install
   npx playwright install
   ```

## Running Tests:

To run the test suite, use the following command:
npx playwright test

## Test Description:
Test Cases
Successful Form Submission with Valid Inputs: Fills out the form with valid details and verifies that the submitted information is displayed correctly in the confirmation modal.

Invalid Email Input Shows Error: Submits the form with an invalid email address and checks for the appropriate error message.

Invalid Mobile Number Shows Error: Submits the form with an invalid mobile number and verifies the corresponding error message.

Submit Without Required Fields: Attempts to submit the form without filling in the required fields and checks that the form was not submitted successfully.

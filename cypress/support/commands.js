Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import loginPage from '../pages/loginPage';
import dashboardPage from '../pages/dashboardPage';

Cypress.Commands.add('loginToNPF', () => {
    cy.fixture('credentials').then((credentials) => {
        cy.session('dev-login', () => {
            loginPage.visit();
            loginPage.assertRedirectToLogin();
            loginPage.enterUsername(credentials.username);
            loginPage.enterPassword(credentials.password);
            loginPage.clickLogin();
            loginPage.assertAfterLoginUrl();
            loginPage.enterOTP(credentials.otp);
            loginPage.submitOTP();
            dashboardPage.navigateToContentMenu();
        });
    });
});

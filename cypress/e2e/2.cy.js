import ContentsPage from '../pages/ContentsPage';

describe('NPF Automation Test Suite', () => {
  // Shared login function with session management
  const login = () => {
    cy.session('a2i-login', () => {
      // cy.visit('https://backoffice.a2i.gov.bd');
      cy.visit('https://frontend-npf-dev.softbd.xyz/');
      // cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-global/protocol/openid-connect/auth');
      cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-dev/protocol/openid-connect/auth');
      // cy.get('input[name="username"]').type('moysports.qa@gmail.com');
      cy.get('input[name="username"]').type('mokbuldev@yopmail.com');
      cy.get('input[name="password"]').type('Npf@12345');
      cy.get('button[type="submit"]').click();
      //   cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-global/login-actions/authenticate');
      cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-dev/login-actions/authenticate');
      cy.get('input[name="code"]').type('123456');
      cy.get('.pf-v5-c-button').click();
      cy.get('span.MuiTypography-body1.nav-item-text').contains('কনটেন্ট').click();
    });
  };

  beforeEach(() => {
    login();
    // cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.visit('https://frontend-npf-dev.softbd.xyz/contents');

  });

  /*  ========= Page module ====================== */

  it('create a new page', () => {
    ContentsPage.clickSection('পাতা');
    ContentsPage.clickCreateButton('নতুন পাতা');
    ContentsPage.clickCreateButton('নতুন পাতা');

    ContentsPage.fillBengaliTitle('নতুন পাতা তৈরি');
    ContentsPage.fillEnglishTitle('Create new page');

    ContentsPage.fillBengaliContent(
      'This is the body of the document.',
      'This is a new paragraph below.'
    );

    ContentsPage.fillEnglishContent(
      'This is the body of the document.',
      'This is a new paragraph below.'
    );

    ContentsPage.uploadImage('cypress/fixtures/image.jpg');
    ContentsPage.uploadBanglaFile('cypress/fixtures/PDF.pdf');
    ContentsPage.uploadEnglishFile('cypress/fixtures/PDF.pdf');

    // Optional assertion to confirm upload
    cy.get('selector-indicating-upload-or-success').should('be.visible');

    ContentsPage.clickSaveButton();
  });
});
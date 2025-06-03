class LoginPage {
    visit() {
        cy.visit('https://frontend-npf-dev.softbd.xyz/');
    }

    assertRedirectToLogin() {
        cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-dev/protocol/openid-connect/auth');
    }

    enterUsername(username) {
        cy.get('input[name="username"]').type(username);
    }

    enterPassword(password) {
        cy.get('input[name="password"]').type(password);
    }

    clickLogin() {
        cy.get('button[type="submit"]').click();
    }

    assertAfterLoginUrl() {
        cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-dev/login-actions/authenticate');
    }

    enterOTP(code) {
        cy.get('input[name="code"]').type(code);
    }

    submitOTP() {
        cy.get('.pf-v5-c-button').click();
    }
}

export default new LoginPage();

class DashboardPage {
    navigateToContentMenu() {
        cy.get('span.MuiTypography-body1.nav-item-text').contains('কনটেন্ট').click();
    }
}

export default new DashboardPage();

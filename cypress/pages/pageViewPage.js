class PageViewPage {
    goToPageSection() {
        cy.contains('h5', 'পাতা').click();
    }

    searchPage(title) {
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type(`${title}{enter}`);
    }

    clickViewOnPage(title) {
        cy.contains('tr', title)
            .find('a[aria-label="প্রদর্শন"]')
            .click();
    }

    assertCancelButtonVisible() {
        cy.contains('button', 'বাতিল').should('be.visible');
    }
}

export default new PageViewPage();

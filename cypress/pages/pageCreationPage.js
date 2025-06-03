class PageCreationPage {
    goToPageSection() {
        cy.contains('h5', 'পাতা').click();
    }

    clickNewPage() {
        cy.contains('button', 'নতুন পাতা').click();
    }

    enterBengaliTitle(title) {
        cy.get('input[name="title_bn"]').type(title);
    }

    enterEnglishTitle(title) {
        cy.get('input[name="title_en"]').type(title);
    }

    fillBengaliContent(content) {
        cy.get('div.ck-content')
            .first()
            .realClick()
            .realType(content);
    }

    fillEnglishContent(content) {
        cy.get('div.ck-content')
            .eq(1)
            .realClick()
            .realType(content);
    }

    uploadImage(imagePath) {
        cy.get('input[type="file"][accept="image/*"]').selectFile(imagePath, { force: true });
    }

    uploadFileBn(filePath) {
        cy.get('input#\\:r26\\:').selectFile(filePath, { force: true });
    }

    uploadFileEn(filePath) {
        cy.get('input#\\:r27\\:').selectFile(filePath, { force: true });
    }

    savePage() {
        cy.contains('button', 'তৈরি করে বন্ধ করুন').click();
    }

    searchPage(title) {
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type(`${title}{enter}`);
    }

    clearSearch() {
        cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
    }

    clickViewOnPage(title) {
        cy.contains('tr', title)
            .find('a[aria-label="প্রদর্শন"]')
            .click();
    }

    assertCancelButtonVisible() {
        cy.contains('button', 'বাতিল').click();
    }

    previewPage(title) {
        cy.contains('tr', title)
            .find('a[aria-label="প্রিভিউ"]')
            .invoke('removeAttr', 'target')
            .click();
    }

    goBack() {
        cy.go('back');
    }

    toggleStatus(index = 1) {
        cy.get('.MuiSwitch-input').eq(index).click({ force: true });
    }

    confirmToggle() {
        cy.contains('button', 'হ্যাঁ').click();
    }

    clickDeleteOnPage(title) {
        cy.contains('tr', title)
            .find('button[aria-label="মুছুন"]')
            .click();
    }

    confirmDelete() {
        cy.contains('button', 'হ্যাঁ').click();
    }
}

export default new PageCreationPage();

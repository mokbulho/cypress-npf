class ContentsPage {
  // Section Clicks
  clickSection(title) {
    cy.contains('h5', title).click();
  }

  // Create Buttons
  clickCreateButton(buttonLabel) {
    cy.contains('button', buttonLabel).click();
  }

  // Fill form
  fillBengaliTitle(text) {
    cy.get('input[name="title_bn"]').type(text);
  }

  fillEnglishTitle(text) {
    cy.get('input[name="title_en"]').type(text);
  }

  fillRichText(index, bodyText, extraText) {
    cy.get('div.ck-content').eq(index)
      .realClick()
      .realType(`${bodyText}{enter}{enter}${extraText}`);
  }

  uploadImage(imagePath) {
    cy.get('input[type="file"][accept="image/*"]')
      .selectFile(imagePath, { force: true });
  }

  uploadBanglaPDF(pdfPath) {
    cy.get('input#\\:r26\\:').selectFile(pdfPath, { force: true });
  }

  uploadEnglishPDF(pdfPath) {
    cy.get('input#\\:r27\\:').selectFile(pdfPath, { force: true });
  }

  verifyUploadSuccess(selector) {
    cy.get(selector).should('be.visible');
  }

  clickSaveButton() {
    cy.contains('button', 'তৈরি করে বন্ধ করুন').click();
  }

  // Search & Table Actions
  searchByTitle(title) {
    cy.get('input[placeholder="Search by শিরোনাম"]').clear().type(`${title}{enter}`);
  }

  clickTableAction(title, ariaLabel) {
    cy.contains('tr', title)
      .find(`[aria-label="${ariaLabel}"]`)
      .invoke('removeAttr', ariaLabel === 'প্রিভিউ' ? 'target' : '')
      .click();
  }
}

export default new ContentsPage();

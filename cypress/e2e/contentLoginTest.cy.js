import loginPage from '../pages/loginPage';
import dashboardPage from '../pages/dashboardPage';
import pageCreationPage from '../pages/PageCreationPage';

describe('NPF Dev Login Test Using Custom Command', () => {
    beforeEach(() => {
        cy.loginToNPF(); // Using the custom command
        cy.visit('https://frontend-npf-dev.softbd.xyz/contents');
    });

    it('should show contents page after login', () => {
        cy.url().should('include', '/contents');
        cy.contains('কনটেন্ট').should('be.visible');
    });

    it('Create a new page', () => {
        cy.fixture('pageContent').then((content) => {
            pageCreationPage.goToPageSection();
            pageCreationPage.clickNewPage();

            pageCreationPage.enterBengaliTitle(content.title_bn);
            pageCreationPage.enterEnglishTitle(content.title_en);

            pageCreationPage.fillBengaliContent(content.content);
            pageCreationPage.fillEnglishContent(content.content);

            pageCreationPage.uploadImage(content.image);
            pageCreationPage.uploadFileBn(content.file);
            pageCreationPage.uploadFileEn(content.file);

            pageCreationPage.savePage();
            cy.wait(30000);
        });
    });

    it('View an existing page', () => {
        cy.fixture('pageContent').then((content) => {
            pageCreationPage.goToPageSection();
            pageCreationPage.searchPage(content.title_bn);
            pageCreationPage.clickViewOnPage(content.title_bn);
            cy.get('label').contains('অবস্থা').scrollIntoView();
            cy.wait(4000);
            // pageCreationPage.assertCancelButtonVisible();
        });
    });

    it('Preview an existing page', () => {
        cy.fixture('pageContent').then((content) => {
            pageCreationPage.goToPageSection();
            pageCreationPage.searchPage(content.title_bn);
            pagePreviewPage.previewPage(content.title_bn);
            cy.wait(4000);
            pagePreviewPage.goBack();
        });
    });

    it('Active/Inactive an existing page', () => {
        cy.fixture('pageContent').then((content) => {
            pageCreationPage.goToPageSection();
            pageCreationPage.searchPage(content.title_bn);
            pageCreationPage.toggleStatus(content.title_bn);
            pageCreationPage.confirmToggle();
        });
    });

    it('Delete an existing page', () => {
        cy.fixture('pageContent').then((content) => {
            pageCreationPage.goToPageSection();
            pageCreationPage.searchPage(content.title_bn);
            pageCreationPage.clickDeleteOnPage(content.title_bn);
            pageCreationPage.confirmDelete();
            // pageCreationPage.clearSearch();
        });
    });
});


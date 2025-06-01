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

    it('Create a new page', () => {
        // Go to পাতা section
        cy.contains('h5', 'পাতা').click();

        // Create new page
        cy.contains('button', 'নতুন পাতা').click();

        // Fill in Bengali title
        cy.get('input[name="title_bn"]').type('নতুন পাতা তৈরি');

        // Fill in English title
        cy.get('input[name="title_en"]').type('Create new page');

        // Fill in content in the rich text editor (Bengali)
        cy.get('div.ck-content')
            .first()
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Fill in content in the rich text editor (English)  
        cy.get('div.ck-content')
            .eq(1)
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Upload image file
        cy.get('input[type="file"][accept="image/*"]')
            .selectFile('cypress/fixtures/mokbul.jpg', { force: true });

        // Upload file for bn
        cy.get('input#\\:r26\\:').selectFile('cypress/fixtures/Postman.pdf', { force: true });

        // Upload file for en
        cy.get('input#\\:r27\\:').selectFile('cypress/fixtures/Postman.pdf', { force: true });

        cy.wait(30000);

        // Save
        cy.contains('button', 'তৈরি করে বন্ধ করুন').click();

        cy.wait(1000);
    });

    it('View an existing page', () => {
        // Go to পাতা section
        cy.contains('h5', 'পাতা').click();

        // Search the page
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('নতুন পাতা তৈরি{enter}');

        // Click view
        cy.contains('tr', 'নতুন পাতা তৈরি')
            .find('a[aria-label="প্রদর্শন"]')
            .click();

        cy.wait(2000);

        // Click cancel button
        cy.contains('button', 'বাতিল').should('be.visible');
    });


    it.skip('Edit an existing page', () => {
        // Go to পাতা section
        cy.contains('h5', 'পাতা').click();

        // Search the page 
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('এটি ডকুমেন্টের মূল অংশ{enter}');

        // Click edit icon
        cy.contains('tr', 'এটি ডকুমেন্টের মূল অংশ')
            .find('a[aria-label="সম্পাদনা"]')
            .click();

        // Enter title bn and en 
        cy.get('input[name="title_bn"]').type('');
        cy.get('input[name="title_en"]').type('একনজরে আজকের বাংলাদেশ');

        // Enter details bn and en 
        // Fill in content in the rich text editor (Bengali)
        cy.get('div.ck-content')
            .first()
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Fill in content in the rich text editor (English)  
        cy.get('div.ck-content')
            .eq(1)
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Upload image file
        cy.get('input[type="file"][accept="image/*"]')
            .selectFile('cypress/fixtures/mokbul.jpg', { force: true });

        // Upload file for bn
        cy.get('input#\\:r26\\:').selectFile('cypress/fixtures/Postman.pdf', { force: true });

        // Upload file for en
        cy.get('input#\\:r27\\:').selectFile('cypress/fixtures/Postman.pdf', { force: true });

        // Save the page
        // cy.contains('button', 'সংরক্ষণ করে বন্ধ করুন').click();
    });

    it.skip('Preview an existing page', () => {
        // Go to পাতা section
        cy.contains('h5', 'পাতা').click();

        // Search the page
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        // Page Preview
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('a[aria-label="প্রিভিউ"]')
            .invoke('removeAttr', 'target')
            .click();

        cy.go('back');
    });

    it.skip('Active/Inactive an existing page', () => {
        // Go to পাতা section
        cy.contains('h5', 'পাতা').click();

        // Search and preview
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        // Switch the Toggle
        cy.get('.MuiSwitch-input')
            .eq(1) // Select second switch
            .click({ force: true });

        // Yes to confirm
        cy.contains('button', 'হ্যাঁ').click();

        // Clear search fields
        cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
    });

    it.skip('Delete an existing page', () => {
        // Go to পাতা section
        cy.contains('h5', 'পাতা').click();

        // Search the page 
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        // Delete the page 
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('button[aria-label="মুছুন"]')
            .click();

        // Confirm delete 
        cy.contains('button', 'হ্যাঁ').click();

        // Clear search fields
        cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
    });

    /*  ========= Banner module ====================== */

    it.skip('Create a new banner', () => {
        // Go to ব্যানার section
        cy.contains('h5', 'ব্যানার').click();

        // Create new banner
        cy.contains('button', 'নতুন টপ ব্যানার').click();

        // Fill in Bengali title
        cy.get('input[name="title_bn"]').type('একনজরে আজকের বাংলাদেশ');

        // Fill in English title
        cy.get('input[name="title_en"]').type('Todays Bangladesh at a Glance');

        // Fill in content in the rich text editor (Bengali)
        cy.get('div.ck-content')
            .first()
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Fill in content in the rich text editor (English)  
        cy.get('div.ck-content')
            .eq(1)
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Upload image file
        cy.get('input[type="file"][accept="image/*"]')
            .selectFile('cypress/fixtures/mokbul.jpg', { force: true });

        cy.wait(2000);

        // Set order
        cy.get('input[name="sort_order"]').clear().type('1');

        // Save
        cy.contains('button', 'তৈরি করে বন্ধ করুন').click();

        cy.wait(1000);
    });

    it.skip('View an existing banner', () => {
        // Go to ব্যানার section
        cy.contains('h5', 'ব্যানার').click();

        // Search the page
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        cy.wait(2000);

        // Click view
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('a[aria-label="প্রদর্শন"]')
            .click();

        cy.wait(2000);
        // Click cancel button
        cy.contains('button', 'বাতিল').should('be.visible');

    });


    it.skip('Edit an existing banner', () => {
        // Go to ব্যানার section
        cy.contains('h5', 'ব্যানার').click();

        // Search the page 
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        cy.wait(2000);

        // Click edit icon
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('a[aria-label="সম্পাদনা"]')
            .click();

        // Enter title bn and en 
        cy.get('input[name="title_bn"]').type('একনজরে আজকের বাংলাদেশ');
        cy.get('input[name="title_en"]').type('একনজরে আজকের বাংলাদেশ');

        // Enter details bn and en 
        // Fill in content in the rich text editor (Bengali)
        cy.get('div.ck-content')
            .first()
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Fill in content in the rich text editor (English)  
        cy.get('div.ck-content')
            .eq(1)
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Upload image file
        cy.get('input[type="file"][accept="image/*"]')
            .selectFile('cypress/fixtures/mokbul.jpg', { force: true });

        // Upload file for bn
        cy.get('input#\\:r26\\:').selectFile('cypress/fixtures/Postman.pdf', { force: true });

        // Upload file for en
        cy.get('input#\\:r27\\:').selectFile('cypress/fixtures/Postman.pdf', { force: true });

        // Save the page
        cy.contains('button', 'সংরক্ষণ করে বন্ধ করুন').click();
        // cy.wait(1000);
    });

    it.skip('Active/Inactive an existing banner', () => {
        // Go to ব্যানার section
        cy.contains('h5', 'ব্যানার').click();

        // Search and preview
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        cy.wait(2000);

        // Switch the Toggle
        cy.get('.MuiSwitch-input')
            .eq(1) // Select second switch
            .click({ force: true });

        // Yes to confirm
        cy.contains('button', 'হ্যাঁ').click();

        // Clear search fields
        cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
        // cy.wait(1000);
    });

    it.skip('Delete an existing banner', () => {
        // Go to ব্যানার section
        cy.contains('h5', 'ব্যানার').click();

        // Search the page 
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        cy.wait(2000);

        // Delete the page 
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('button[aria-label="মুছুন"]')
            .click();

        // Confirm delete 
        cy.contains('button', 'হ্যাঁ').click();

        // Clear search fields
        cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
        // cy.wait(1000);
    });

    /*  ========= News module ====================== */

    it('Create a new news', () => {
        // Go to খবর section
        cy.contains('h5', 'খবর').click();

        // Create new news
        cy.contains('button', 'নতুন খবর').click();

        // Fill in Bengali title
        cy.get('input[name="title_bn"]').type('একনজরে আজকের বাংলাদেশ');

        // Fill in English title
        cy.get('input[name="title_en"]').type('Todays Bangladesh at a Glance');

        // Fill in content in the rich text editor (Bengali)
        // cy.get('div.ck-content')
        //     .first()
        //     .realClick()
        //     .realType('This is the body of the document.{enter}{enter}')
        //     .realType('This is a new paragraph below.');

        // Fill in content in the rich text editor (English)  
        // cy.get('div.ck-content')
        //     .eq(1)
        //     .realClick()
        //     .realType('This is the body of the document.{enter}{enter}')
        //     .realType('This is a new paragraph below.');

        // Upload image file
        cy.get('input[type="file"][accept="image/*"]').first()
            .selectFile('cypress//fixtures//mokbul.jpg', { force: true });

        cy.wait(2000);

        cy.get('input[type="file"][accept="image/*"]').eq(0)
            .selectFile('cypress/fixtures/mokbul.jpg', { force: true });
        
            cy.wait(2000);
        // Upload file for bn
        // cy.get('input[type="file"][accept="application/pdf"]')
        //     .eq(0).selectFile('cypress/fixtures/Postman.pdf', { force: true });

        // cy.get('input[type="file"][accept="application/pdf"]').selectFile([
        //     'cypress/fixtures/Postman.pdf',
        //     'cypress/fixtures/Postman.pdf'
        // ], { force: true });

        //Show sub office checkbox
        // cy.get('input[type="checkbox"][data-indeterminate="false"][value="false"]').check({ force: true });
        // cy.wait(1000);
        //Show sub office un-checkbox
        // cy.get('input[type="checkbox"][data-indeterminate="false"]').uncheck({ force: true });

        //Publication Date
        cy.get('button[aria-label^="Choose date"]').eq(0).click(); // open date picker
        cy.contains('button', '10').click(); // select 10th of the month
        // cy.wait(2000);

        // Archive Date
        // cy.get('button[aria-label^="Choose date"]').eq(1).click(); // open date picker
        // cy.contains('button', '31').click(); // select 30th of the month   
        
        cy.get('input[placeholder="DD/MM/YYYY"]').eq(1).clear().type('31/12/2025');       

        cy.wait(30000);
        // Save
        cy.contains('button', 'তৈরি করে বন্ধ করুন').click();
    });

    it('View an existing news', () => {
        // Go to খবর section
        cy.contains('h5', 'খবর').click();

        // Search the page
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        cy.wait(2000);

        // Click view
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('a[aria-label="প্রদর্শন"]')
            .click();

        cy.wait(2000);
        // Click cancel button
        // cy.contains('button', 'বাতিল').should('be.visible');
        cy.contains('বাতিল').click();


    });


    it.skip('Edit an existing news', () => {
        // Go to খবর section
        cy.contains('h5', 'খবর').click();

        // Search the page 
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        cy.wait(2000);

        // Click edit icon
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('a[aria-label="সম্পাদনা"]')
            .click();

        // Enter title bn and en 
        cy.get('input[name="title_bn"]').type('একনজরে আজকের বাংলাদেশ');
        cy.get('input[name="title_en"]').type('একনজরে আজকের বাংলাদেশ');

        // Enter details bn and en 
        // Fill in content in the rich text editor (Bengali)
        cy.get('div.ck-content')
            .first()
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Fill in content in the rich text editor (English)  
        cy.get('div.ck-content')
            .eq(1)
            .realClick()
            .realType('This is the body of the document.{enter}{enter}')
            .realType('This is a new paragraph below.');

        // Upload image file
        cy.get('input[type="file"][accept="image/*"]')
            .selectFile('cypress/fixtures/mokbul.jpg', { force: true });

        // Upload file for bn
        cy.get('input#\\:r26\\:').selectFile('cypress/fixtures/Postman.pdf', { force: true });

        // Upload file for en
        cy.get('input#\\:r27\\:').selectFile('cypress/fixtures/Postman.pdf', { force: true });

        cy.wait(100000);

        // Save the page
        cy.contains('button', 'সংরক্ষণ করে বন্ধ করুন').click();
        // cy.wait(1000);
    });

    it.skip('Preview an existing page', () => {
        // Go to পাতা section
        cy.contains('h5', 'খবর').click();

        // Search the page
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        // Page Preview
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('a[aria-label="প্রিভিউ"]')
            .invoke('removeAttr', 'target')
            .click();

        cy.go('back');
    });

    it('Active/Inactive an existing news', () => {
        // Go to খবর section
        cy.contains('h5', 'খবর').click();

        // Search and preview
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        cy.wait(2000);

        // Switch the Toggle
        cy.get('.MuiSwitch-input')
            .eq(1) // Select second switch
            .click({ force: true });

        // Yes to confirm
        cy.contains('button', 'হ্যাঁ').click();

        // Clear search fields
        cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
        // cy.wait(1000);
    });

    it('Delete an existing news', () => {
        // Go to খবর section
        cy.contains('h5', 'খবর').click();

        // Search the page 
        cy.get('input[placeholder="Search by শিরোনাম"]')
            .clear()
            .type('একনজরে আজকের বাংলাদেশ{enter}');

        cy.wait(2000);

        // Delete the page 
        cy.contains('tr', 'একনজরে আজকের বাংলাদেশ')
            .find('button[aria-label="মুছুন"]')
            .click();

        // Confirm delete 
        cy.contains('button', 'হ্যাঁ').click();

        // Clear search fields
        cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
        // cy.wait(1000);
    });







});
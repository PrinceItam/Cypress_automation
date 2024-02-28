// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to perform the login by filling in the email and password and submitting them
             *
             * cy.loginThing('email@domain.com', 'password-value');
             */

            login(): Chainable<Element>;
            loginAsAreaManager(): Chainable<Element>;
            loginAsDepoManager(): Chainable<Element>;

            //loginAndCacheSession(): Chainable<Element>;

            preserveCookies(): Chainable<Element>;
            goToDashboard(): Chainable<Element>;
            goToInvoicesPage(): Chainable<Element>;
            goToDevicePage(deviceNumber: string): Chainable<Element>;
            goToDeviceAnnualInspectionPage(deviceNumber: string): Chainable<Element>;
            goToDeviceInspectionHistoryPage(): Chainable<Element>;
            goToAdminPage(): Chainable<Element>;
            goToFrontPage(): Chainable<Element>;
            goToReturnInspectionPage() : Chainable<Element>;
        }
    }
}

/*Cypress.Commands.add('loginAndCacheSession', () => {
    cy.session("testing", () => {
        // cy.clearCookies();
        cy.visit(Cypress.env('login_url'));
        cy.get('#home_login_button')
            .click();
        cy.wait(50);

        cy.intercept('/api/Application/Login').as('login');

        cy.get('#input_username')
            .type('juhani.sihvonen@weare.fi');
        cy.get('#input_password')
            .type('Onet.xml1');
        cy.get('#login_button')
            .click();

        cy.wait('@login')
            .its('response.statusCode')
            .should('equal', 200);
        cy.wait(1000);
        cy.url().should('contain', '/Dashboard')
    })

});*/

Cypress.Commands.add('login', () => {
    cy.session(['admin_role_session'], () => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.clearAllSessionStorage();

        cy.visit(Cypress.env('login_url'));

        cy.wait(50);

        cy.get('#home_login_button')
            .click();

        cy.wait(50);

        cy.intercept('/api/Application/Login').as('login');

        cy.get('#input_username')
            .type('juhani.sihvonen@weare.fi');

        cy.get('#input_password')
            .type('M8CQ@3F4n6jqMC3X97y4oTW2CH18W6J3');

        cy.get('#login_button')
            .click();

        cy.wait('@login')
            .its('response.statusCode')
            .should('equal', 200);

        cy.wait(1000);
    });
});

Cypress.Commands.add('loginAsAreaManager', () => {
   // cy.get('[href="/Logout"]').first().click();
    cy.session(['area_manager_role_session'], () => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.clearAllSessionStorage();

        cy.visit(Cypress.env('login_url'));

        cy.get('#home_login_button')
            .click();

        cy.wait(50);

        cy.intercept('/api/Application/Login').as('login');

        cy.get('#input_username')
            .type('test.areamanager@weare.fi');

        cy.get('#input_password')
            .type('M8CQ@3F4n6jqMC3X97y4oTW2CH18W6J3');

        cy.get('#login_button')
            .click();

        cy.wait('@login')
            .its('response.statusCode')
            .should('equal', 200);

        cy.wait(1000);
    });
});

Cypress.Commands.add('loginAsDepoManager', () => {
   // cy.get('[href="/Logout"]').first().click();
    cy.session(['depo_manager_role_session'], () => {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.clearAllSessionStorage();

        cy.visit(Cypress.env('login_url'));

        cy.get('#home_login_button')
            .click();

        cy.wait(50);

        cy.intercept('/api/Application/Login').as('login');

        cy.get('#input_username')
            .type('test.depomanager@weare.fi');

        cy.get('#input_password')
            .type('M8CQ@3F4n6jqMC3X97y4oTW2CH18W6J3');

        cy.get('#login_button')
            .click();

        cy.wait('@login')
            .its('response.statusCode')
            .should('equal', 200);

        cy.wait(1000);
    });
});

Cypress.Commands.add('goToInvoicesPage', () => {
    cy.intercept('POST', '/api/invoice/listInvoices', {fixture: 'listInvoicesResponse.json'});
    cy.get("#invoice_page_link").click();
    cy.wait(50);
});

Cypress.Commands.add('goToDashboard', () => {
    cy.get(".athenaeum-top-nav-left").find("img").click();
});

Cypress.Commands.add('goToDevicePage', (deviceId: string) => {
    cy.wait(300);
    cy.get(".athenaeum-top-nav-left").find("img").click();
    cy.wait(100);
    cy.intercept('POST', '/api/device/findDevice').as('findDevice');
    cy.get("#deviceId").wait(500).type(deviceId);
    cy.get("#findDeviceButton").click();
    cy.wait('@findDevice').its('response.statusCode')
        .should('equal', 200);
})

Cypress.Commands.add('goToDeviceAnnualInspectionPage', (deviceNumber: string) => {
    cy.wait(100);

    cy.get(".athenaeum-top-nav-left").find("img").click();

    cy.wait(100);

    cy.get('#deviceId')
        .wait(200)
        .type(deviceNumber);

    let waitTime = deviceNumber.length * 20;
    cy.wait(waitTime);

    cy.intercept('POST', '/api/device/findDevice').as('FindDevice');

    cy.get('#findDeviceButton').click();

    cy.wait(100);

    cy.wait('@FindDevice').its('response.statusCode').should('equal', 200);

    cy.get('#annual_inspection_details_button')
        .click();

    cy.wait(100);
});

Cypress.Commands.add('goToDeviceInspectionHistoryPage', () => {
    cy.goToDeviceAnnualInspectionPage("90740");
    cy.get("#previousInspectionsButton").click();
    cy.wait(100);
});

Cypress.Commands.add('goToAdminPage', () => {
    const width = window.innerWidth;
    if (width > 1460) {
        cy.get('.athenaeum-top-nav-middle')
            .find('[href="/Admin"]')
            .click();
    } else {
        cy.get('.athenaeum-top-nav-right_hamburgerIcon')
            .click();
        cy.wait(50);
        cy.get('.athenaeum-hamburger-hamburger_open')
            .find('[href="/Admin"]')
            .click();
    }
});

Cypress.Commands.add('goToFrontPage', () => {
    const width = window.innerWidth;
    if (width > 1460) {
        cy.get('.athenaeum-top-nav-middle')
            .find('[href="/Dashboard"]')
            .click();
    } else {
        cy.get('.athenaeum-top-nav-right_hamburgerIcon')
            .click();
        cy.wait(50);
        cy.get('.athenaeum-hamburger-hamburger_open')
            .find('[href="/Dashboard"]')
            .click();
    }
    cy.wait(100);
});

Cypress.Commands.add('goToReturnInspectionPage', () => {
    const width = window.innerWidth;
    if (width > 1460) {
        cy.get('.athenaeum-top-nav-middle')
            .find('[href="/ReturnedDevices"]')
            .click();
    } else {
        cy.get('.athenaeum-top-nav-right_hamburgerIcon')
            .click();
        cy.wait(50);
        cy.get('.athenaeum-hamburger-hamburger_open')
            .find('[href="/ReturnedDevices"]')
            .click();
    }
    cy.wait(100);
});

export default {};
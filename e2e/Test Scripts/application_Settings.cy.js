import Localizer from "../../../localization/Localizer";

describe('Application settings page tests', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Opens application settings page and checks elements exist on page', () => {
        cy.visit("Dashboard");

        NavigateToSettings();

        cy.get('table').get('#table_settings');
        cy.get('table').get('#table_numberValueSettings');

        cy.get('table').get('span').should('contain.text', Localizer.knownSettingsAnnualInspectionProductGroupIds);
        cy.get('table').get('span').should('contain.text', Localizer.knownSettingsProductGroupIds);
        cy.get('table').get('span').should('contain.text', Localizer.knownSettingsManualInvoiceFuelStep);

        cy.get('#dateFormatDdl').click();
        cy.get('#dateFormatDdl')
            .find('.athenaeum-dropdown-item')
            .should('have.length', 9);
    });

    function NavigateToSettings() {
        cy.goToAdminPage();

        cy.intercept("POST", "api/applicationSettings/listSettings").as("Request");

        cy.get('[href="/ApplicationSettings"]')
            .click();

        cy.wait("@Request").its('response.statusCode').should('equal', 200);
    }
});
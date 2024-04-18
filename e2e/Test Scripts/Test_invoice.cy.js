import Localizer from "../../../localization/Localizer";

describe('Invoice page tests', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/')
        cy.goToDashboard();
        cy.goToInvoicesPage();
    });

    // it('Assert invoices page content', () => {
    //     assertHeader();
    //     assertFilters();
    // });


    function assertFilters() {

        cy.get('[id^=invoices_list_filter_button]')
            .first()
            .click();

        cy.get("h5")
            .should('contain', Localizer.invoicesPageModalTitleFilters)

        // Matching filter (modal) id's with wild card since modals break when same page has several with same ids.
        // Input fields should always match for double the amount, since generated input component duplicates id with prefix of "input_"
        cy.get('[id*="invoices_filter_deviceExternalId_"]')
            .should('have.length', 4);

        cy.get('[id*="invoices_filter_status_"]')
            .should('have.length', 2);

        cy.get('[id*="invoices_filter_depot_"]')
            .should('have.length', 2);

        cy.get('[id*="invoices_filter_contractId_"]')
            .should('have.length', 2);

        cy.get('[id*="invoices_filter_inspectorId_"]')
            .should('have.length', 4);

        cy.get('[id*="invoices_filter_customerId_"]')
            .should('have.length', 2);

        cy.get('[id*="invoices_filter_customerName_"]')
            .should('have.length', 2);

        cy.get('[id*="invoices_filter_constructionSiteExternalId_"]')
            .should('have.length', 2);

        cy.get('[id*="invoices_filter_constructionSiteName_"]')
            .should('have.length', 2);

        cy.get('[id*="invoices_filter_from_"]')
            .should('have.length', 4);

        cy.get('form').first().submit();
    }

    function assertHeader() {
        cy.get("h4")
            .should('contain', Localizer.invoicesPageHeaderTitle);
    }
});

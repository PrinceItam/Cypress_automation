import Localizer from "../../../localization/Localizer";

describe('Admin device management tests', () => {

    beforeEach(() => {
        cy.login();
        cy.visit("Dashboard");

    });

    it('Device management loads devices, fuel and adBlue types', () => {
        loadPage();

        cy.get('.fa-info-square')
            .eq(1)
            .click()
            .get('#tab_fuelTypes')
            .click();

        cy.get('#fuelTypesDD')
            .click();

        cy.get('#fuelTypesDD').find(".athenaeum-dropdown-itemsList")
            .first()
            .should("contain", "Diesel (321)");

        cy.get('#fuelTypesDD')
            .should("contain", Localizer.fuelingAndWashingFuelType);

        cy.get('#adBlueDD')
            .click();

        cy.get('#adBlueDD').find(".athenaeum-dropdown-itemsList")
            .first()
            .should("contain", "AdBlue 10l (123)");

        cy.get('#adBlueDD')
            .should("contain", Localizer.adBluesPageTitle);

    });

    // it('Device management loads annual inspections tab', () => {
    //
    //     loadPage();
    //
    //     cy.get('.fa-info-square')
    //         .eq(1)
    //         .click();
    //
    //     cy.get('.tabContainer')
    //         .find('#tab_annualInspections')
    //         .click();
    //
    //     cy.get("#table_annualInspectionTable")
    //         .should("have.length", 1);
    // });

    // it('Device management has device faults tab and contains row', () => {
    //     loadPage();
    //
    //     cy.get('#input_searchTerm')
    //         .type('92252')
    //         .type('{enter}');
    //
    //     cy.intercept('POST', 'api/device/getDeviceFaults').as("getDeviceFaults");
    //
    //     cy.get('.fa-info-square')
    //         .eq(0)
    //         .click();
    //
    //     cy.wait('@getDeviceFaults').its('response.statusCode').should('equal', 200);
    //
    //     cy.get('.tabContainer')
    //         .find('#tab_deviceFaults')
    //         .click();
    //
    //     cy.wait(200);
    //
    //     cy.get('#table_deviceFaultsTable')
    //         .find('[class*=athenaeum-grid-gridRow]')
    //         .not('[class*=athenaeum-grid-details]') // CL Grid component has these "extra" rows between the actual rows;
    //         .should('have.length', 1)
    //
    //     cy.get('#table_deviceFaultsTable')
    //         .find('[class*=athenaeum-grid-gridRow]')
    //         .not('[class*=athenaeum-grid-details]')
    //         .find('span')
    //         .eq(7)
    //         .should('contain', 'Akusto');
    // });

    function loadPage(){
        cy.intercept('POST', '/api/device/listdevices').as("listDevices");
        cy.intercept('POST', 'api/classifier/GetAdBlues').as("getAdBlueTypes");
        cy.intercept('POST', 'api/classifier/GetFuelTypes').as("getFuelTypes");

        cy.goToAdminPage();

        cy.get('[href="/DevicesManagement"]')
            .click();

        cy.wait("@listDevices").its('response.statusCode').should('equal', 200);
        cy.wait("@getAdBlueTypes").its('response.statusCode').should('equal', 200);
        cy.wait("@getFuelTypes").its('response.statusCode').should('equal', 200);
    }
});
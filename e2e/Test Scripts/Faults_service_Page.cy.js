import Localizer from "../../../localization/Localizer";

describe('Device service page tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('Dashboard');
    })

    // it('In Maintenance - Should be able to insert operating hours.', () => {
    //     cy.goToDevicePage('92255');
    //
    //     cy.wait(200);
    //
    //     cy.get('#device_page_start_service_button')
    //         .wait(300)
    //         .trigger('click');
    //
    //     cy.wait(300);
    //
    //     cy.get('#operating_hours');
    //
    //     cy.wait(1000);
    //
    //     cy.get("#input_operating_hours")
    //         .invoke('val')
    //         .then((value) => {
    //             expect(value).to.include('500');
    //         });
    //
    //     cy.go(-2);
    //     cy.wait(200);
    //     cy.intercept('POST', '/api/report/stopService').as('stopService');
    //     cy.get('#stopServiceBtn').trigger('click');
    //     cy.contains(Localizer.yes).click();
    //     cy.wait('@stopService').its('response.statusCode')
    //         .should('equal', 200);
    //
    //     cy.wait(500);
    // })

    // it('In Maintenance - Selecting service action should enable completion.', () => {
    //     cy.goToDevicePage('92251');
    //
    //     cy.wait(200);
    //
    //     cy.get('#device_page_start_service_button')
    //         .wait(300)
    //         .trigger('click');
    //
    //     cy.wait(300);
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.disabled');
    //
    //     cy.get('#action_checkBox_0')
    //         .find('label')
    //         .click();
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.enabled');
    //
    //     acceptSaveService();
    // })

    // it('Repair Is Needed - Selecting fault should enable completion.', () => {
    //     cy.goToDevicePage('92252');
    //
    //     cy.wait(200);
    //
    //     cy.get('#device_page_start_service_button')
    //         .wait(300)
    //         .trigger('click');
    //
    //     cy.wait(300);
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.disabled');
    //
    //     cy.get('#fault_check_0')
    //         .click();
    //
    //     acceptSaveService();
    // })

    // it('Maintenance + Repair - Selecting fault/service action/both should enable completion.', () => {
    //     cy.goToDevicePage('92253');
    //
    //     cy.wait(200);
    //
    //     cy.get('#device_page_start_service_button')
    //         .wait(300)
    //         .trigger('click');
    //
    //     cy.wait(300);
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.disabled');
    //
    //     cy.get('#action_checkBox_0')
    //         .find('label')
    //         .click();
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.enabled');
    //
    //     cy.get('#action_checkBox_0')
    //         .find('label')
    //         .click();
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.disabled');
    //
    //     cy.get('#fault_check_0')
    //         .click();
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.enabled');
    //
    //     cy.get('#fault_check_0')
    //         .click();
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.disabled');
    //
    //     cy.get('#fault_check_0')
    //         .click();
    //
    //     cy.get('#action_checkBox_0')
    //         .find('label')
    //         .click();
    //
    //     cy.get('#saveServiceBtn')
    //         .should('be.enabled');
    //
    //     acceptSaveService();
    // })

    function acceptSaveService() {
        cy.intercept('POST', '/api/report/saveService').as('SaveService');

        cy.get('#saveServiceBtn')
            .trigger('click');

        cy.get('.athenaeum-confirmation-dialog-confirmDialog', {timeout: 10000}).should('be.visible')
            .find('[data-dismiss]').eq(0).trigger('click');


        cy.wait('@SaveService')
            .its('response.statusCode')
            .should('eq', 200);

        cy.wait(500);
    }
})
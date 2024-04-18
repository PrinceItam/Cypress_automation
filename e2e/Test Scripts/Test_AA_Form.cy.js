import Localizer from "../../../localization/Localizer";
import * as path from "path";

describe('Device new annual inspection form tests', () => {

    before(() => {
    });

    beforeEach(() => {
        cy.login();

        cy.visit('Dashboard');

        cy.goToDeviceAnnualInspectionPage("90011");
    });

    // it('Accept test, second time prompts confirm', () => {
    //     interceptRequests();
    //
    //     cy.get('#acceptButton').click();
    //     cy.wait('@listAnnualInspectionVendors');
    //     cy.wait('@getUserDepos');
    //     cy.wait(200);
    //
    //     cy.get('form').find('button[type=submit]').trigger('click');
    //     cy.wait('@saveDeviceAnnualInspection').its('response.statusCode').should('equal', 200);
    //
    //     cy.get('#acceptButton').click();
    //     cy.wait('@listAnnualInspectionVendors');
    //     cy.wait('@getUserDepos');
    //     cy.wait(200);
    //
    //     cy.get('form').find('button[type=submit]').trigger('click');
    //     cy.get('[id^=confirmationContent-]').first().find('button[id^=confirmation-dialog-confirm-]').trigger('click');
    // });

    // it('Accept with remarks test', () => {
    //     interceptRequests();
    //     cy.get('#acceptWithRemarksButton').click();
    //     assertAndFillForm();
    //     assertAndFillRemarks();
    //     submitForm();
    // });

    // it('Accept with remarks, fixing remarks clears ban of use', () => {
    //     cy.get('#acceptWithRemarksButton').click();
    //     assertAndFillForm();
    //     assertAndFillRemarks();
    //     cy.get("#ban_of_use_checkbox").find('label').click();
    //     submitFormWithConfirm();
    //
    //     cy.get("#ban_of_use_info").contains(`${Localizer.deviceAnnualInspectionPageDeviceUseBan}: ${Localizer.yes}`);
    //
    //     cy.goToAdminPage();
    //     cy.intercept("POST", "api/device/listdevices").as("listDevices")
    //     cy.intercept("POST", "/api/classifier/GetFuelTypes").as("fuelTypes")
    //     cy.get('[href="/DevicesManagement"]')
    //         .click();
    //     cy.wait("@listDevices").its('response.statusCode').should('equal', 200);
    //     cy.wait("@fuelTypes").its('response.statusCode').should('equal', 200);
    //
    //     cy.get("#input_searchTerm").type("90011", {
    //         delay: 50
    //     });
    //
    //     cy.get("#input_searchTerm")
    //         .invoke('val')
    //         .then((value) => {
    //             expect(value).to.include('90011');
    //         });
    //
    //     cy.get('form').submit();
    //
    //     cy.wait("@listDevices").its('response.statusCode').should('equal', 200);
    //
    //     cy.wait(500);
    //
    //     cy.get('.fa-lock-open').trigger('click');
    //     cy.get('.athenaeum-confirmation-dialog-confirmDialog', {timeout: 10000}).should('be.visible')
    //         // hack :(
    //         .find('[data-dismiss]').eq(2).trigger('click');
    //
    //     cy.goToDeviceAnnualInspectionPage("90011");
    //     cy.get("#ban_of_use_info").contains(`${Localizer.deviceAnnualInspectionPageDeviceUseBan}: ${Localizer.no}`);
    // });

    function submitForm() {
        cy.get('form').submit();
    }

    function submitFormWithConfirm() {
        cy.get('form').find('button[type=submit]').trigger('click');
        cy.get('[id^=confirmationContent-]').first().find('button[id^=confirmation-dialog-confirm-]').trigger('click');
    }


    function interceptRequests() {
        cy.intercept('POST', '/api/annualInspection/SaveDeviceAnnualInspection').as('saveDeviceAnnualInspection');
        cy.intercept('POST', '/api/annualInspection/ListAnnualInspectionVendors').as('listAnnualInspectionVendors');
        cy.intercept('POST', '/api/depo/getUserDepos').as('getUserDepos');
    }

    function assertAndFillRemarks() {
        cy.get("#remarksRepairedDate").click();
        cy.get("#input_remarks").type("Remarks");
    }

    function assertAndFillForm() {
        cy.get("#input_inspectionDate").click();

        cy.get("#annualInspectionVendor").click();
        cy.get("#inspectionType");

        cy.get("#pdf_input");
        cy.fixture('returnInspectionReport.pdf').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'returnInspectionReport.pdf',
                mimeType: 'application/pdf'
            });
        });
        cy.get("#invoiceNumber").click().type("lasku 123");
        cy.get("#inspectionCost").click().type("1");
        cy.get("#depot").click();
    }
});

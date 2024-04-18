import Localizer from "../../../localization/Localizer";

describe('Device existing annual inspection form tests', () => {

    before(() => {
    });

    beforeEach(() => {
        cy.login();
    });

    // Device has been inspected with remarks. There should be a functioning option for marking remarks as repaired.
    // it('Remarks fixed test', () => {
    //     cy.visit('Dashboard');
    //
    //     cy.goToDeviceAnnualInspectionPage("9001");
    //
    //     cy.get("#acceptButton").should("have.text", Localizer.deviceAnnualInspectionPageRemarksRepaired)
    //     cy.get('#acceptButton').click();
    //
    //     cy.wait(100);
    //
    //     assertHeader();
    //
    //     cy.wait(100);
    //
    //     cy.intercept("POST", "/api/annualInspection/SaveRemarksRepaired").as("SaveRemarksRepaired");
    //
    //     attachFile();
    //
    //     cy.wait(100);
    //
    //     submitForm();
    //
    //     cy.wait("@SaveRemarksRepaired", {timeout: 10000}).its('response.statusCode')
    //         .should('equal', 200);
    // });

    // Device has been inspected with remarks & banned from use. Marking remarks as repaired should clear ban of use.
    // it('Remarks repaired - ban removed', () => {
    //     cy.visit('Dashboard');
    //
    //     cy.wait(100);
    //
    //     cy.goToDeviceAnnualInspectionPage("86972");
    //
    //     cy.get('#infoContainer')
    //         .children()
    //         .should('contain', `${Localizer.deviceAnnualInspectionPageDeviceUseBan}: ${Localizer.yes}`);
    //
    //
    //     cy.get("#acceptButton").should("have.text", Localizer.deviceAnnualInspectionPageRemarksRepaired)
    //     cy.get('#acceptButton').click();
    //
    //     assertHeader();
    //
    //     cy.wait(100);
    //
    //     cy.intercept("POST", "/api/annualInspection/SaveRemarksRepaired").as("SaveRemarksRepaired");
    //
    //     attachFile();
    //
    //     cy.wait(100);
    //
    //     submitForm();
    //
    //     cy.wait("@SaveRemarksRepaired", {timeout: 30000}).its('response.statusCode')
    //         .should('equal', 200);
    //
    //     cy.wait(100);
    //
    //     cy.get('#infoContainer')
    //         .children()
    //         .should('contain', `${Localizer.deviceAnnualInspectionPageDeviceUseBan}: ${Localizer.no}`);
    // });

    // Device has been banned from use due overdue inspection, accepting should clear ban.
    // it('Accept - ban removed', () => {
    //     cy.visit('Dashboard');
    //
    //     cy.wait(500);
    //
    //     cy.goToDeviceAnnualInspectionPage("86973");
    //
    //     cy.get('#infoContainer')
    //         .children()
    //         .should('contain', `${Localizer.deviceAnnualInspectionPageDeviceUseBan}: ${Localizer.yes}`);
    //
    //
    //     cy.get("#acceptButton").should("have.text", Localizer.deviceAnnualInspectionPageButtonAccept)
    //     cy.get('#acceptButton').click();
    //
    //     cy.get(".athenaeum-page-container-content").should('contain.text', Localizer.deviceAnnualInspectionPageButtonAccept)
    //
    //     cy.wait(1000);
    //
    //     cy.intercept("POST", "/api/annualInspection/SaveDeviceAnnualInspection").as("SaveDeviceAnnualInspection");
    //
    //     submitForm();
    //
    //     cy.wait("@SaveDeviceAnnualInspection", {timeout: 30000}).its('response.statusCode')
    //         .should('equal', 200);
    //
    //     cy.wait(100);
    //
    //     cy.get('#infoContainer')
    //         .children()
    //         .should('contain', `${Localizer.deviceAnnualInspectionPageDeviceUseBan}: ${Localizer.no}`);
    // });

    function assertHeader() {
        cy.get(".athenaeum-page-container-content").should('contain.text', Localizer.deviceAnnualInspectionPageRemarksRepaired)
    }

    function submitForm() {
        cy.get('form').submit();
    }

    function attachFile(){
        cy.get("#pdf_input");
        cy.fixture('returnInspectionReport.pdf').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'returnInspectionReport.pdf',
                mimeType: 'application/pdf'
            });
        });
    }

});

import Localizer from "../../../localization/Localizer";
import * as path from "path";

describe('Device annual inspection details page tests', () => {

    before(() => {
        cy.intercept('/api/AnnualInspection/ListDeviceAnnualInspections', {fixture: 'listDeviceAnnualInspectionsResponse.json'})
    });

    beforeEach(() => {
        cy.login();
        cy.visit('Dashboard');
        cy.goToDeviceAnnualInspectionPage("90739");
    })

    // it('DeviceInfoPanel works', () => {
    //     assertHeader();
    //     assertDeviceInfo();
    //     assertInfoButton();
    // });

    // it('ArsenalButtons have correct labels', () => {
    //     cy.get('#acceptButton').should('have.text', Localizer.deviceAnnualInspectionPageButtonAccept)
    //     cy.get('#acceptWithRemarksButton').should('have.text', Localizer.deviceAnnualInspectionPageButtonAcceptWithRemarks)
    //     cy.get('#previousInspectionsButton').should('have.text', Localizer.deviceAnnualInspectionPageButtonPreviousInspections)
    //     cy.get('#backButton').should('have.text', Localizer.devicePageReturnBack)
    // })

    // describe('BanOfUse banner displays correct text.', () => {
    //     it ('Device in NeedBan should have banner.', () => {
    //         cy.goToDevicePage('86973');
    //         cy.get('#annual_inspection_details_button').click();
    //         cy.get('#device_ban_of_use_banner').should('contain', Localizer.bannerDeviceUseBan);
    //     });
    //
    //     it ('Device that has remarks overdue should have banner with corresponding text.', () => {
    //         cy.goToDevicePage('86972');
    //         cy.get('#annual_inspection_details_button').click();
    //         cy.get('#device_ban_of_use_banner').should('contain', Localizer.bannerDeviceUseBanRemarks);
    //     });
    // });

    function assertHeader() {
        cy.get('#multiTitleDiv').within(() => {
            cy.get('#deviceProductGroup')
                .should('contain', "MEGA LIFT");
            cy.get('#deviceType')
                .should('contain', "JLG 1230ES");
            cy.get("#device_externalId")
                .should('contain', "90739");
        })
    }

    function assertDeviceInfo() {
        cy.get('#infoContainer>p').each(($el, index) => {

            switch (index) {
                case 0:
                    cy.get('p').should('contain', Localizer.devicePageNextAnnualInspectionDate);
                    break;
                case 1:
                    cy.get('p').should('contain', Localizer.devicePagePreviousAnnualInspectionDate);
                    break;
                case 2:
                    cy.get('p').should('contain', Localizer.devicePageMaintenanceStatus);
                    break;
                case 3:
                    cy.get('p').should('contain', Localizer.deviceAnnualInspectionPageLastReport);
                    cy.intercept('POST', '/api/annualInspection/DownloadInspectionPdf',  {fixture: 'downloadInspectionPdfResponse.json'}).as("download");
                    cy.get("#download_pdf_button").click();
                    cy.wait('@download').then(e =>{
                        assertPdfFileWasDownloaded("testpdf.pdf")
                    })
                    break;
            }
        })
    }

    function assertInfoButton() {
        cy.get('#infobutton').should('have.text', Localizer.devicePageInfo);
        cy.get('#imageDiv').should('be.visible');
        cy.get('#infobutton').click();
        cy.get('#infobutton').should('have.text', Localizer.devicePagePicture);
        cy.get('#infoTable').should('be.visible');
        cy.get('#infoTable').should('contain.text', Localizer.enumDeviceStatusInStock);
    }

    function assertPdfFileWasDownloaded(fileName: string) {
        const folder = Cypress.config('downloadsFolder');
        const filePath = path.join(folder, fileName);
        cy.readFile(filePath).end();
    }
});

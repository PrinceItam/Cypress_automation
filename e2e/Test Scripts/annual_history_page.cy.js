import Localizer from "../../../localization/Localizer";
import * as path from "path";
import moment from "moment";

const today = moment(new Date()).format("DD-MM-YYYY");
const notToday = moment(new Date()).subtract(3, "days").format("DD-MM-YYYY")
describe('Device annual inspection details page tests', () => {

    before(() => {
        // Ensure desktop width so grid doesn't go responsive mode..
        cy.viewport(1480, 768)
    });

    beforeEach(() => {

    })

    // it('Header is ok', () => {
    //
    //     cy.login();
    //
    //     cy.visit('Dashboard');
    //
    //     cy.goToDeviceInspectionHistoryPage();
    //
    //     // Maybe not the best way to do this, but adding id or data-attribute would require doing it in Component Library
    //     cy.get('[class*=RentaTools_leftPageHeader]').within(() => {
    //         cy.get('h4').should('contain', 'TEST GROUP NAME');
    //         cy.get('p').should('contain', Localizer.deviceAnnualInspectionPageButtonPreviousInspections);
    //     })
    // })

    // it('Area manager can not edit inspections', () => {
    //
    //     cy.loginAsAreaManager()
    //
    //     cy.visit('Dashboard');
    //
    //     cy.goToDeviceInspectionHistoryPage();
    //
    //     cy.get('#toggleEditModeButton').should('not.exist');
    //
    // })

    // it('Depo manager can edit inspections with no fixed remarks', () => {
    //
    //     cy.loginAsDepoManager()
    //
    //     cy.visit('Dashboard');
    //
    //     cy.goToDeviceInspectionHistoryPage();
    //
    //     cy.get('#toggleEditModeButton').click();
    //
    //     cy.get('[class*=fa-pen]').should('have.length', 2);
    //
    // })

    // it('Table is visible and has correct info', () => {
    //
    //     cy.login();
    //
    //     cy.visit('Dashboard');
    //
    //     cy.goToDeviceInspectionHistoryPage();
    //
    //     cy.wait(200);
    //     cy.get('table').then(($table) => {
    //         const $rows = $table
    //             .find('tbody')
    //             .first()
    //             .find('[class*=athenaeum-grid-gridRow]')
    //             .not('[class*=athenaeum-grid-details]') //CL Grid component has these "extra" rows between the actual rows;
    //
    //         const $thList = $table
    //             .find('thead')
    //             .find('th');
    //
    //         cy.wrap($table).should('be.visible');
    //
    //         assertTableHeaders($thList);
    //
    //         assertRows($rows);
    //     })
    //
    // })

    // it('ArsenalButtons have correct labels', () => {
    //     cy.login();
    //
    //     cy.visit('Dashboard');
    //
    //     cy.goToDeviceInspectionHistoryPage();
    //
    //     cy.get('#backButton').should('have.text', Localizer.devicePageReturnBack)
    // })

    function assertRows($rows: JQuery<HTMLElement>) {

        cy.wrap($rows).should('have.length', 3);

        const $firstRowColumns = $rows.first().find('td');
        const $secondRowColumns = $rows.eq(1).find('td');
        const $thirdowColumns = $rows.eq(2).find('td');

        cy.intercept('POST', '/api/annualInspection/DownloadInspectionPdf',  {fixture: 'downloadInspectionPdfResponse.json'}).as("download");

        const inspectionDateColumnIndex: number = 0;
        const attachmentColumnIndex: number = 1;
        const inspectorColumnIndex: number = 2;
        const invoiceNumberColumnIndex: number = 3;
        const invoiceCostColumnIndex: number = 4;
        const invoiceTypeColumnIndex: number = 5;

        cy.wrap($firstRowColumns).first().should('have.text', today);
        cy.wrap($firstRowColumns).eq(invoiceTypeColumnIndex).should('have.text', Localizer.enumAnnualInspectionTypeCalibration);
        cy.wrap($firstRowColumns).eq(invoiceNumberColumnIndex).should('have.text', '1010110');
        cy.wrap($firstRowColumns).eq(invoiceCostColumnIndex).should('have.text', '20');
        cy.wrap($firstRowColumns).eq(inspectorColumnIndex).should('have.text', 'Vendor 303');
        assertActionIcons($firstRowColumns);

        cy.wrap($secondRowColumns).first().should('contain', today);
        cy.wrap($secondRowColumns).eq(invoiceTypeColumnIndex).should('have.text', Localizer.enumAnnualInspectionTypeInspection);
        cy.wrap($secondRowColumns).eq(invoiceNumberColumnIndex).should('have.text', '101010');
        cy.wrap($secondRowColumns).eq(invoiceCostColumnIndex).should('have.text', '20');
        cy.wrap($secondRowColumns).eq(inspectorColumnIndex).should('have.text', 'Vendor 303');
        assertActionIcons($secondRowColumns);

        cy.wrap($thirdowColumns).first().should('have.text', notToday);
        cy.wrap($thirdowColumns).eq(invoiceTypeColumnIndex).should('have.text', Localizer.enumAnnualInspectionTypeAnniversary10Years);
        cy.wrap($thirdowColumns).eq(invoiceNumberColumnIndex).should('have.text', '101011');
        cy.wrap($thirdowColumns).eq(invoiceCostColumnIndex).should('have.text', '20');
        cy.wrap($thirdowColumns).eq(inspectorColumnIndex).should('have.text', 'Vendor 303');
        assertActionIcons($thirdowColumns);
    }

    function assertTableHeaders($thList: JQuery<HTMLElement>) {
        cy.wrap($thList).should('have.length', 9);
        cy.wrap($thList).first().should('have.text', Localizer.deviceAnnualInspectionHistoryPageInspectionDate);

        cy.wrap($thList).eq(2).should('have.text', Localizer.deviceAnnualInspectionHistoryPageInspectionVendor);
        cy.wrap($thList).eq(3).should('have.text', Localizer.deviceAnnualInspectionHistoryPageInspectionInvoiceNumber);
        cy.wrap($thList).eq(1).should(($th) => {
            expect($th.text().trim()).equal(Localizer.deviceAnnualInspectionHistoryPageInspectionAttachment);
        });

        cy.wrap($thList).eq(4).should('have.text', Localizer.deviceAnnualInspectionHistoryPageInspectionCost);
        cy.wrap($thList).eq(5).should('have.text', Localizer.deviceAnnualInspectionHistoryPageInspectionType);
    }

    function assertPdfFileWasDownloaded(fileName: string) {
        const folder = Cypress.config('downloadsFolder');
        const filePath = path.join(folder, fileName);
        cy.readFile(filePath).end();
    }

    function assertActionIcons(row: JQuery<HTMLElement>) {
        //cy.wrap(row).find('[class*=paperclip]').click();
       // cy.wait('@download').then(e =>{
       //     assertPdfFileWasDownloaded("testpdf.pdf")
     //   })

        cy.get('#toggleEditModeButton').click();
        cy.wrap(row).find('[class*=fa-pen]').click();
        cy.get("#_annualInspectionToEditModal").find('[type=submit]').click();
        cy.contains(Localizer.annualInspectionHistoryPageInspectionNotModified);

        cy.wrap(row).find('[class*=fa-trash]').click();
        cy.get('[class*=athenaeum-confirmation-dialog-dialogContent]')
            .contains(Localizer.annualInspectionHistoryPageConfirmationDeleteInspection);

        cy.get('#toggleEditModeButton').click();
    }
});
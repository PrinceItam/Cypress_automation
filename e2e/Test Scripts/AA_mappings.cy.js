import Localizer from "../../../localization/Localizer";
import AnnualInspectionTypesPage from "@/pages/AnnualInspectionTypesPage/Tests/AnnualInspectionTypesPage";

describe('Mappings page tests', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Opens annual inspection type mappings page and loads data', () => {

        cy.visit("Dashboard");

        NavigateToMappings();

        AnnualInspectionTypesPage.validateMappings();
    });

    it('Adds the mapping', () => {
        cy.visit('Dashboard');

        NavigateToMappings();

        AnnualInspectionTypesPage.addMappings();
    });

    it('Deletes the existing mapping', () => {
        cy.visit('Dashboard');

        NavigateToMappings();

        cy.intercept("POST", "api/mappings/deleteAnnualInspectionTypeMapping").as("deleteAnnualInspectionTypeMapping");

        AnnualInspectionTypesPage.elements.mappings.inspection.deleteButtons().first().click();

        cy.wait("@deleteAnnualInspectionTypeMapping").its('response.statusCode').should('equal', 200);
    });

    it('Checks that all inspection types are listed', () => {
        cy.visit('Dashboard');

        NavigateToMappings();

        AnnualInspectionTypesPage.elements.mappings.inspection.title()
            .should('contain.text', Localizer.enumAnnualInspectionTypeInspection);

        AnnualInspectionTypesPage.elements.mappings.calibration.title()
            .should('contain.text', Localizer.enumAnnualInspectionTypeCalibration);

        AnnualInspectionTypesPage.elements.mappings.tenYear.title()
            .should('contain.text', Localizer.enumAnnualInspectionTypeAnniversary10Years);

        AnnualInspectionTypesPage.elements.mappings.deployment.title()
            .should('contain.text', Localizer.enumAnnualInspectionTypeDeploymentInspection);

        AnnualInspectionTypesPage.elements.mappings.IBC.title()
            .should('contain.text', Localizer.enumAnnualInspectionTypeIbcContainerInspection);

    });

    function NavigateToMappings() {
        cy.goToAdminPage();

        cy.intercept("POST", "api/mappings/GetAnnualInspectionTypeMappings").as("GetAnnualInspectionTypeMappings");

        cy.get('[href="/AnnualInspectionTypes"]')
            .click();

        cy.wait("@GetAnnualInspectionTypeMappings").its('response.statusCode').should('equal', 200);
    }
});

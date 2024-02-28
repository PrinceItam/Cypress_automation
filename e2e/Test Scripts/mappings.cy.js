import Localizer from "@/localization/Localizer";

export {}

describe('Mappings page tests', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/');
    })

    describe('Return inspection mapping tests', () => {

        beforeEach(() => {
            cy.goToAdminPage();
            cy.intercept("POST", "api/mappings/getMappings").as("getMappings")
            cy.get('[href="/Mappings"]')
                .click();
            cy.wait("@getMappings").its('response.statusCode').should('equal', 200);

        })

        it('Opens mappings page and loads data', () => {
            cy.get(".nav-tabs").children().should('have.length', 2);
            cy.get(".nav-tabs").children().first().find("span").should('have.text', Localizer.mappingsPageTabReturnInspections)
            cy.get(".nav-tabs").children().last().find("span").should('have.text', Localizer.mappingsPageTabServices)

        })

        it('Can add new mapping for specific product type', () => {

            cy.get('[data-cy="container_7cc2c505-c868-4d5f-87f4-36914a7c995a"]').should("contain.text", Localizer.mappingsPageTextNoCategories)

            selectCategoryToAdd("HEAVY")

            assertDeviceTypesCount(2);

            selectFirstDeviceTypeAndSave()

            cy.get('[data-cy="container_7cc2c505-c868-4d5f-87f4-36914a7c995a"]').should("not.contain.text", Localizer.mappingsPageTextNoCategories)

            selectCategoryToAdd("HEAVY")

            assertDeviceTypesCount(1);

            cy.get(".modal-content").each(($el) => {
                if($el.is(":visible"))
                    cy.wrap($el).type('{esc}');
            })
            cy.get('[data-cy="container_7cc2c505-c868-4d5f-87f4-36914a7c995a"]').find("button").click();

            cy.get('[data-cy="container_7cc2c505-c868-4d5f-87f4-36914a7c995a"]').should("contain.text", Localizer.mappingsPageTextNoCategories);
        })

        it('Can add new mapping for specific product type to different category', () => {

            cy.get('[data-cy="container_7cc2c505-c868-4d5f-87f4-36914a7c995a"]').should("contain.text", Localizer.mappingsPageTextNoCategories)

            selectCategoryToAdd("HEAVY")

            assertDeviceTypesCount(2);

            selectFirstDeviceTypeAndSave()

            cy.get('[data-cy="container_7c345a56-b74c-437f-a814-7e5a6638232f"]').should("not.contain.text", Localizer.mappingsPageTextNoCategories)

            selectCategoryToAdd("HEAVY")

            assertDeviceTypesCount(1);

            cy.get('[data-cy="container_7cc2c505-c868-4d5f-87f4-36914a7c995a"]').find("button").click({force: true});

            cy.get('[data-cy="container_7cc2c505-c868-4d5f-87f4-36914a7c995a"]').should("contain.text", Localizer.mappingsPageTextNoCategories);
        })

        function selectFirstDeviceTypeAndSave() {
            cy.get("#device_type_dropdown").find(".athenaeum-dropdown-item").first().click();

            cy.get("#add_mapping_submit").click({force: true});
        }

        function assertDeviceTypesCount(count: number) {
            cy.get("#device_type_dropdown").find(".athenaeum-dropdown-item").should("have.length", count);
        }

        function selectCategoryToAdd(text: string) {
            cy.get('[data-cy="container_7cc2c505-c868-4d5f-87f4-36914a7c995a"]').find(".athenaeum-form-inputGroup").click().find("input").clear().type(text);

            cy.get(".athenaeum-dropdown-itemsList").first().find(".athenaeum-dropdown-itemGroupIdent").click();

            cy.get("#device_type_dropdown").click();
        }


    })

})
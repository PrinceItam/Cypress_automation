export {}

describe('User management page tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('Dashboard');
        GoToUserManagementPage();
    })

    // describe('User list tests', () => {
    //     it('Filters list based on depot correctly', () => {
    //         cy.get('#depoFilter')
    //             .click();
    //
    //         cy.get('#depoFilter')
    //             .wait(100)
    //             .contains("101")
    //             .trigger('click');
    //
    //         // Wait for the filtered user list to render
    //         cy.wait(2000)
    //
    //         // Assert that the user list only contains depos with ID 101
    //         cy.get('#UserList_dropdown')
    //             .find(".athenaeum-dropdown-item")
    //             .find("small")
    //             .each(elem => {
    //                 cy.wrap(elem)
    //                     .should('contain', "101")
    //             })
    //     })
    // })

    function GoToUserManagementPage() {
        cy.goToAdminPage();

        cy.wait(100);

        cy.get('[href="/UserManagement"]')
            .click();
    }
})
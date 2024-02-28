export {}

describe('InvoiceDetails page tests', () => {
    before(() => {
    })

    beforeEach(() => {
        cy.login();
        cy.visit('Dashboard');
    })

    // describe('Page works', () => {
    //     it('Data shown on the page is correct', () => {
    //         cy.goToDevicePage('90011');
    //         cy.get('#device_page_fuel_and_clean_button').click();
    //
    //         CheckTableContent();
    //         CheckInputs();
    //     });
    // });

})

function CheckTableContent() {

    cy.get('table').find('tr').as('rows');

    cy.get('@rows').first()
        .find('td').last()
        .should('contain', "Customer 1");

    cy.get('@rows').eq(1)
        .find('td').last()
        .should('contain', "site name 1");

    cy.get('@rows').eq(2)
        .find('td').last()
        .should('contain', "2287873");

    cy.get('@rows').last()
        .find('td').last()
        .should('contain', "2");
}

function CheckInputs() {
    cy.get('#deviceContractId');

    cy.get('#setFueling').find('.fa-plus-circle').click();

    cy.get('#invoiceOtherResourcesCheckbox').find('label').click();

    cy.get('#setAdBlue').find('span').eq(1).trigger('click');
    cy.get('#setAdBlue').find('input').type("1");
    cy.get('#setAdBlue').find('.fa-minus-circle').click();

    cy.get('#setWashing').find('.fa-plus-circle').click();
}
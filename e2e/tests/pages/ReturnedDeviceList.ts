class ReturnedDeviceList{
    public elements = {
        listElement : () => cy.get('[data-cy=device_list_element]'),
        statusText : () => cy.get('[id=inspection_status_text]'),
    }
    
    public openFirstElement() {
        this.elements.listElement()
            .first().click();

    }
    
    public validateLength(index: number){
        this.elements.listElement()
            .should('have.length', index);
    }
    
    public validateInspectionStatus(text: string){
        this.elements.statusText()
            .contains(text)
    }
    
    public validateProgressIcon(icons : string[]){
        this.elements.listElement()
            .first()
            .get('[id=ri_progress]').children().should((p) =>{

            const classes = p.map((i, el) => {
                return Cypress.$(el).attr('class')
            })

            expect(classes.get()).to.deep.eq(icons)
        });
    }
}

export default  new ReturnedDeviceList();
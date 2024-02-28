class DevicePage {
    public elements = {
        continueReturnInspectionBtn : () => cy.get('[id=continue_return_inspection]'),
        startReturnInspectionBtn : () => cy.get('[id=device_page_start_inspection_button]'),
    }

    public continueReturnInspection(){
        cy.wait(100);

        this.elements.continueReturnInspectionBtn()
            .click()
    }
    
    public startReturnInspection() {
        this.elements.startReturnInspectionBtn()
            .should("be.visible")
            .click();
    }
}

export default new DevicePage();
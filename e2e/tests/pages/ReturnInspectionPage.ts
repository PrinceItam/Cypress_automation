import {IReturnInspectionTestInfo} from "@/tests/models/ReturnInspectionTestInfo";
import Localizer from "@/localization/Localizer";

class ReturnInspectionPage{
    public elements = {
        nextButton : () => cy.get('[id=ri_nextButton]'),
        stepOk: () => cy.get('[id=step_ok]'),
        phaseButton : () => cy.get('[id=phase_action_button]'),
        saveInspectionBtn : () =>  cy.get('[id=save_return_inspection]')
    }
    
    public completePhase(phaseIndex : number, steps : IReturnInspectionTestInfo[]){

        const phase= steps.filter(p=>p.phase == phaseIndex);

        for (let i = 0; i< phase.length; i++){
            const step = phase[i];
            const nextStep = phase[i +1];
            cy.contains(step.name);

            if(step.question === true){
                this.finishQuestionStep();
            }else {
                this.continueStep();
            }
            cy.wait(100);
            if(nextStep) {
                cy.contains(nextStep.name, {timeout: 100000})
                    .should('be.visible');
            }
        }
    }
    
    public finishQuestionStep(){
        this.elements.stepOk()
            .first()
            .click()
            .should('have.class', 'btn-success')

        cy.wait(100);

        this.continueStep();
    }

     public continueStep() {
        this.elements.nextButton()
            .click();

        cy.wait(300);
    }

    public startPhage(){
        cy.wait(100);

        this.elements.phaseButton()
            .get('span')
            .contains(Localizer.genericStart)
            .first()
            .click();

    }
    
    public startAndCompletePhase(index: number, steps : IReturnInspectionTestInfo[]){
        this.startPhage();

        this.completePhase(index, steps);
    }
    
    public saveInspectionButtonShouldBeDisabled(){
        this.elements.saveInspectionBtn().should('be.disabled')
    }
    
    public saveInspection() {
        this.elements.saveInspectionBtn().should('not.be.disabled')
            .click();
        
        cy.wait(2000);
    }
}

export default new ReturnInspectionPage();
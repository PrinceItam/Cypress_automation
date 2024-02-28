import Localizer from "@/localization/Localizer";
import {IReturnInspectionTestInfo} from "@/tests/models/ReturnInspectionTestInfo";
import ReturnInspectionPage from "@/tests/pages/ReturnInspectionPage";
import DevicePage from "@/tests/pages/DevicePage";
import ReturnedDeviceList from "@/tests/pages/ReturnedDeviceList";


describe('Return Inspection Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('Dashboard');
        cy.goToReturnInspectionPage();
    })

    // describe('Start Return Inspection', () => {
    //     it('Return Inspection should be completed and not shown on the list', () => {
    //         const returnInspectionList : IReturnInspectionTestInfo[] = [
    //             { index: 1, name : "Valokuvat", phase : 1},
    //             { index: 2, name : "Puhdistus", phase : 1},
    //             { index: 1, name : "Ulkopuoli", phase : 2},
    //             { index: 2, name : "Akusto", phase : 2},
    //             { index: 3, name : "Sähkö", phase : 2},
    //             { index: 4, name : "Hydraulijärjestelmä", phase : 2},
    //             { index: 5, name : "Ajolaite", phase : 2},
    //             { index: 6, name : "Tukijalat", phase : 2},
    //             { index: 1, name : "Turvallisuus", phase : 3, question: true},
    //             { index: 2, name : "Koekäyttö", phase : 3, question: false},
    //             { index: 3, name : "Lataus", phase : 3, question: true},
    //             { index: 4, name : "Checks", phase : 3, question: false},
    //         ];
    //
    //         ReturnedDeviceList.validateLength(4);
    //
    //         ReturnedDeviceList.openFirstElement();
    //
    //
    //         cy.wait(100);
    //
    //         DevicePage.startReturnInspection();
    //
    //         cy.wait(100);
    //
    //         //to start inspection click RI_NEXT button
    //         ReturnInspectionPage.continueStep();
    //
    //         cy.wait(100);
    //
    //         cy.goToReturnInspectionPage();
    //
    //         ReturnedDeviceList.validateProgressIcon([
    //             'fas fa-shower',
    //             'fas fa-check-circle',]);
    //
    //         ReturnedDeviceList.openFirstElement();
    //
    //         DevicePage.continueReturnInspection();
    //
    //         ReturnInspectionPage.saveInspectionButtonShouldBeDisabled();
    //
    //         ReturnInspectionPage.startAndCompletePhase(1, returnInspectionList);
    //
    //         cy.goToReturnInspectionPage();
    //
    //         ReturnedDeviceList.validateInspectionStatus(Localizer.returnInspectionPartlyCompleted);
    //
    //         ReturnedDeviceList.openFirstElement();
    //
    //         DevicePage.continueReturnInspection();
    //
    //         ReturnInspectionPage.saveInspectionButtonShouldBeDisabled();
    //
    //         ReturnInspectionPage.startAndCompletePhase(2, returnInspectionList);
    //
    //         ReturnInspectionPage.startAndCompletePhase(3, returnInspectionList);
    //
    //         cy.goToReturnInspectionPage();
    //
    //         ReturnedDeviceList.validateInspectionStatus(Localizer.returnInspectionCompleted);
    //
    //         ReturnedDeviceList.openFirstElement();
    //
    //         DevicePage.continueReturnInspection();
    //
    //         ReturnInspectionPage.saveInspection();
    //
    //         cy.goToReturnInspectionPage();
    //
    //         ReturnedDeviceList.validateLength(3);
    //     })
    // })
})
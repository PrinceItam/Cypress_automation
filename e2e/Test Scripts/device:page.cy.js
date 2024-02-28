import Localizer from "@/localization/Localizer";

export {}

describe('Device page tests', () => {
    before(() => {
    })

    beforeEach(() => {
        cy.login();
        cy.visit('Dashboard');
    })

    // describe('BanOfUse banner displays correct text.', () => {
    //     it ('Device in NeedBan should have banner.', () => {
    //         cy.goToDevicePage('86973');
    //         cy.get('#device_ban_of_use_banner').should('contain', Localizer.bannerDeviceUseBan);
    //     });
    //
    //     it ('Device that has remarks overdue should have banner with corresponding text.', () => {
    //         cy.goToDevicePage('86972');
    //         cy.get('#device_ban_of_use_banner').should('contain', Localizer.bannerDeviceUseBanRemarks);
    //     });
    // });

    // describe('Annual inspections related tests', () => {
    //
    //     it ('Device out of annual inspection scope should not have AA button', () => {
    //         cy.goToDevicePage('92253');
    //         cy.get('#annual_inspection_details_button').should('not.exist');
    //     });
    //
    //     it ('Device in annual inspection scope should have AA button', () => {
    //         cy.goToDevicePage('900112');
    //         cy.get('#annual_inspection_details_button');
    //     });
    // });

    // describe('In stock tests', () => {
    //
    //     it('In Rent - Displays correct buttons', () => {
    //         cy.goToDevicePage('90740');
    //         cy.get("#device_page_start_manual_service_button");
    //         cy.get("#device_page_fuel_and_clean_button");
    //         cy.get("#device_page_record_observation_button");
    //         AssertContainsCommonButtons();
    //     })
    //
    //     it('Inspections button hides other buttons', () => {
    //         cy.goToDevicePage('90740');
    //         cy.get('#device_page_previous_inspections_button').should('not.exist');
    //         cy.get('#device_page_previous_inspections_pictures_button').should('not.exist');
    //
    //         AssertContainsCommonButtons();
    //
    //         cy.get("#device_page_inspections_button")
    //             .click();
    //
    //         cy.get("#device_page_previous_inspections_pictures_button");
    //         cy.get("#device_page_previous_inspections_button");
    //         cy.get("#device_page_previous_inspections_button").parent().children().should('have.length', 9);
    //
    //         cy.get("#device_page_previous_inspections_back_button").click();
    //
    //         cy.get('#device_page_previous_inspections_button').should('not.exist');
    //         cy.get('#device_page_previous_inspections_pictures_button').should('not.exist');
    //
    //     })
    // })

    // describe('In rent tests', () => {
    //     it('Displays correct buttons', () => {
    //         cy.goToDevicePage('90740');
    //         cy.get("#device_page_start_manual_service_button");
    //         cy.get("#device_page_fuel_and_clean_button");
    //         cy.get("#device_page_record_observation_button");
    //         AssertContainsCommonButtons();
    //     })
    // })

    // describe('Need return inspection', () => {
    //
    //     it('Displays correct buttons', () => {
    //         cy.visit('/')
    //
    //         GoToDevicePageThroughReturnedDevicesList("JLG 1230ES");
    //
    //         cy.get("#device_page_start_inspection_button")
    //             .should('contain', Localizer.devicePageStartInspection)
    //
    //         cy.get("#skip_inspection_button")
    //             .should('contain', Localizer.devicePageSkip)
    //
    //         AssertContainsCommonButtons()
    //     })
    //
    //     it('Displays product group name', () => {
    //         cy.visit('/')
    //
    //         cy.get("#deviceProductGroup")
    //             .should('contain', "MEGA LIFT")
    //     })
    //
    //     it('Displays product group number', () => {
    //         cy.visit('/')
    //
    //         cy.get("#deviceProductGroup")
    //             .should('contain', "16810")
    //     })
    //
    //     it('"Device will be locked" modal is shown when starting return inspection if the annual inspection is overdue', () => {
    //         cy.visit('/')
    //
    //         CheckDeviceWillBeLockedModal("OVERDUE ANNUAL INSPECTION TYPE", "inspection");
    //     })
    // })

    // describe('Need service tests', () => {
    //
    //     it('Displays correct buttons', () => {
    //         cy.visit('/')
    //
    //         GoToDevicePageThroughServiceList("KAESER M125");
    //         cy.get("#device_page_start_service_button")
    //             .should('contain', Localizer.devicePageStartService)
    //
    //         cy.get("#skip_service_button")
    //             .should('contain', Localizer.skipServiceModalTitle)
    //
    //         AssertContainsCommonButtons()
    //     })
    //
    //     it('Can skip service tests', () => {
    //         cy.visit('/')
    //
    //         cy.get("#skip_service_button")
    //             .click();
    //
    //         cy.get("#comment")
    //             .type("testing")
    //
    //         cy.intercept('POST', '/api/report/skipService', {fixture: 'skipServiceResponse.json'})
    //
    //         cy.get("#skip_service_modal_confirm_button")
    //             .click();
    //     })
    //
    //     it('"Device will be locked" modal will be shown when starting service if device will be locked', () => {
    //         CheckDeviceWillBeLockedModal("BAN OF USE TEST TYPE", "service");
    //     })
    // })

    function AssertContainsCommonButtons() {
        cy.get("#device_page_inspections_button")
            .should('contain', Localizer.devicePageInspections)
        cy.get("#device_page_previous_services_button")
            .should('contain', Localizer.devicePagePreviousServices);
    }

    function CheckDeviceWillBeLockedModal(deviceName: string, action: string) {

        if (action === "service") {
            GoToDevicePageThroughServiceList(deviceName);
        } else {
            GoToDevicePageThroughReturnedDevicesList(deviceName);
        }

        let button = `#device_page_start_${action}_button`
        cy.get(button)
            .trigger('click')

        cy.get('[id^=messageBox-]')
            .should('be.visible')
            .find('[id^="message-box-cancel"]')
            .click()
    }


    function GoToDevicePageThroughReturnedDevicesList(deviceName: string) {
        cy.goToDashboard();

        cy.wait(100);

        cy.intercept('/api/device/listUnInspectedDevices').as('listUnInspectedDevices');
        cy.intercept('/api/device/listInspectedDevices').as('listInspectedDevices');

        cy.get('#returned_devices_dashboard_button')
            .click();

        cy.wait('@listUnInspectedDevices').its('response.statusCode').should('equal', 200);
        cy.get("#tab_inspectedDevices").click();
        cy.wait('@listInspectedDevices').its('response.statusCode').should('equal', 200);
        cy.get("#tab_unInspectedDevices").click();

        cy.get("[data-cy='devices_list']")
            .contains(deviceName)
            .click();
    }

    function GoToDevicePageThroughServiceList(deviceName: string) {
        cy.goToDashboard();

        cy.wait(500);

        cy.intercept('/api/device/listUnServicedDevices').as('listUnServicedDevices');
        cy.intercept('/api/device/listServicedDevices').as('listServicedDevices');

        cy.get('#service_devices_dashboard_button')
            .wait(300)
            .click();

        cy.wait('@listUnServicedDevices').its('response.statusCode').should('equal', 200);
        cy.wait('@listServicedDevices').its('response.statusCode').should('equal', 200);

        cy.get("[data-cy='devices_list']")
            .contains(deviceName)
            .click();
    }
})
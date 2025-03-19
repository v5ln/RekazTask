import CouponPageAction from '@pageObject/couponPage/couponPageAction';
import { BASE_URL, PASSWORD, USERNAME } from './constants';

declare global {
  namespace Cypress {
    interface Chainable {
        loginToPlatform(username?: string, password?: string): Chainable<void>;
        createCouponUI(couponData: { name: string; code: string; discount: string; type: 'Fixed' | 'Percentage'; active?: boolean; expiryDate?: string }): Chainable<void>;
        deleteCouponUI(couponName: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("loginToPlatform", (username: string = USERNAME, password: string = PASSWORD) => {
    cy.intercept('GET', '/api/app/notification-center/last-notifications').as('WaitPageLoad');
    cy
        .visit(BASE_URL())
        .contains("العربية").click().get('a[data-kt-lang="English"]').click()
        .get('#LoginInput_UserNameOrEmailAddress').type(username)
        .get('#LoginInput_Password').type(password)
        .get('button[type="submit"]').click();
    cy.wait('@WaitPageLoad');
});

Cypress.Commands.add("createCouponUI", (couponData: { name: string; code: string; discount: string; type: 'Fixed' | 'Percentage'; active?: boolean; }) => {
  CouponPageAction.visitCouponsPage();
  cy
    .get('a[href="/coupons/create"]').click()
    .get('#CouponModel_Name').clear().type(couponData.name)
    .get('#CouponModel_Code').clear().type(couponData.code);

  if (couponData.type === 'Fixed') {
    cy.get('[for="discountTypeFixed"]').click();
  } else {
    cy.get('[for="discountTypePercentage"]').click();
  }
  
  cy.get('#CouponModel_DiscountValue').clear().type(couponData.discount);

  if (couponData.active) {
    cy.get('#CouponModel_IsActive').check();
  } else {
    cy.get('#CouponModel_IsActive').uncheck();
  }

  cy
    .get('button#btn-submit').click()
    .get('#SearchInput').clear().type(couponData.code)
    .get('#SearchSubmitButton').click()
    .get('table').should('contain', couponData.name);
});


Cypress.Commands.add("deleteCouponUI", (couponCode: string) => {
  CouponPageAction.visitCouponsPage();
  couponCode = couponCode.toUpperCase();
  
  cy
    .get('#SearchInput').clear().type(couponCode)
    .get('#SearchSubmitButton').click()
  cy
    .contains('table', couponCode).should('exist')
    .get('button.dropdown-toggle').first().click()
    .get('ul.dropdown-menu').contains('Delete').click({force: true})
  cy
    .contains('Are you sure you want to delete').parent().find('button').contains('Yes').click()
  cy
    .get('#SearchInput').clear().type(couponCode)
    .get('#SearchSubmitButton').click()
  cy
    .contains('table', couponCode).should('not.exist')
});

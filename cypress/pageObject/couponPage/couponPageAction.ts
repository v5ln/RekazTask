import { BASE_URL } from "../../support/constants";

class CouponPageAction {
    static visitCouponsPage() {
      cy.intercept('GET', '/api/app/coupon*').as('WaitCouponsPageLoad');
      cy.visit(`${BASE_URL()}coupons`);
      cy.wait('@WaitCouponsPageLoad');
      return this;
    }
  
    static clickCreateButton() {
      cy.get('a[href="/coupons/create"]').click();
      return this;
    }

    static clickActionsButtonForCoupon(code: string) {
      cy.contains('table tr', code)
        .find('button.dropdown-toggle')
        .click();
      return this;
    }
  
    static selectEditOption() {
      cy.get('ul.dropdown-menu')
        .contains('Edit')
        .click();
      return this;
    }
}

export default CouponPageAction;

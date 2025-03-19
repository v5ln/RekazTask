import { BASE_URL } from "@support/constants";

class CheckoutPageAssertion {
  static verifyCouponIsApplied(isApplied: boolean = true) {
    cy.origin(BASE_URL(false), 
      { args: { isApplied } },
      ({ isApplied }) => {
      cy.contains('تم تطبيق الكود').should(isApplied ? 'exist' : 'not.exist');
    });
    return this;
  }

  static verifyCouponNotApplicableForTheProduct() {
    cy.origin(BASE_URL(false), () => {
      cy.contains('لا ينطق الكوبون على المنتجات الموجودة في السلة').should('exist');
    });
    return this;
  }

  static verifyDiscountAmount(discount: string) {
    cy.origin(BASE_URL(false), 
      { args: { discount } },
      ({ discount }) => {
      cy.contains('span', 'الخصم').parent().contains('span', discount).should('exist');
    });
    return this;
  }

  static verifyCouponNotValid() {
    cy.origin(BASE_URL(false), () => {
      cy.contains('الكوبون غير صالح').should('exist');
    });
    return this;
  }

  static verifyCartAmount(amount: string) {
    cy.origin(BASE_URL(false), 
      { args: { amount } },
      ({ amount }) => {
      cy.contains('span', 'المبلغ المطلوب دفعه').parent().contains('span', amount).should('exist');
    });
    return this;
  }
}

export default CheckoutPageAssertion;

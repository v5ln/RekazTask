import moment from "moment";

class CouponFormAction {
  static visitCouponsForm() {
    cy.visit('/coupons');
    return this;
  }

  static typeCouponName(name: string) {
    cy.get('#CouponModel_Name').clear().type(name);
    return this;
  }

  static typeCouponCode(code: string) {
    cy.get('#CouponModel_Code').clear().type(code);
    return this;
  }

  static selectDiscountType(type: 'Fixed' | 'Percentage' = 'Fixed') {
    cy.get(type === 'Fixed' ? '[for="discountTypeFixed"]' : '#discountTypePercentage').click();
    return this;
  }

  static typeDiscountValue(value: string) {
    cy.get('#CouponModel_DiscountValue').clear().type(value);
    return this;
  }

  static setStartDate(date: moment.Moment) {
    cy.get('input[placeholder="Coupon Start Date"]').click()
    cy.get('select aria-label="Month"').click();
    cy.get('div .flatpickr-current-month').find('option').contains(date.format("MMMM")).click();
    cy.find('div .dayContainer').contains(date.day()).click();
    return this;
  }
  
  static enableActivation(isActive: boolean = true) {
    isActive ? cy.get('#CouponModel_IsActive').check() : cy.get('#CouponModel_IsActive').uncheck();
    return this;
  }

  static clickSubmit() {
    cy.get('button#btn-submit').click();
    return this;
  }

  static selectSpecificProducts(products: string[]) {
    cy.contains('div', 'Specific Products').click();

    products.forEach(product => {
      cy.get('input[placeholder="All Products"]')
        .should('be.visible')
        .click()
        .clear()
        .type(product)
      cy
        .contains('ul', product).click();
    });
    return this;
  }
}

export default CouponFormAction;

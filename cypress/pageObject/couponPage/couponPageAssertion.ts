class CouponPageAssertion {
  
  static verifyCouponListed(name: string, isActive: boolean = true) {
    cy.contains('table', name)
      .should('exist')
      .within(() => {
        cy.contains(isActive ? 'Yes' : 'No').should('exist');
      });
    return this;
  }

  static verifyCouponStatus(code: string, expectedStatus: string) {
    cy.contains('table tr', code)
      .within(() => {
        cy.contains(expectedStatus).should('exist');
      });
    return this;
  }

  static verifyDuplicateCouponError() {
    cy.contains('div', 'There is already a coupon with the same code').should('exist');
    return this;
  }

}

export default CouponPageAssertion;

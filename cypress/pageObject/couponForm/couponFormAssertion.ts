class CouponFormAssertion {
    static verifyCreateCouponFormVisible() {
        cy.get('form#couponForm').should('be.visible');
        return this;
      }
}

export default CouponFormAssertion;
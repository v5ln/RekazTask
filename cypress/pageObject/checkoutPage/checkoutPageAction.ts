import { BASE_URL } from "@support/constants";

class CheckoutPageAction {
  static visitCheckoutPage() {
    cy.visit(`${BASE_URL(false)}products`);
    return this;
  }

  static searchProduct(productName: string) {
    cy.origin(
      BASE_URL(false),
      { args: { productName } },
      ({ productName }) => {
        cy.get('input[placeholder="ابحث عن منتج"]')
          .should('be.visible')
          .clear()
          .type(productName);
      }
    );
    return this;
  }

  static addProductToCart() {
    cy.wait(2000);
    cy.origin(BASE_URL(false), () => {
      cy.get('button').contains('اشتر الآن').click().then(() => {
        cy.url().should('contain', '/qatest/merchandise/');
        cy.get('button').contains('اشتر الآن').click();
      });
    });
    return this;
  }

  static openCouponForm() {
    cy.origin(BASE_URL(false), () => {
      cy.get('button').contains('هل لديك كود خصم؟').click();
    });
    return this;
  }

  static typeCouponCode(code: string) {
    cy.origin(
      BASE_URL(false),
      { args: { code } },
      ({ code }) => {
        cy.contains('label', 'كود الخصم')
          .parent()
          .find('input')
          .clear()
          .type(code);
      }
    );
    return this;
  }

  static applyCoupon() {
    cy.origin(BASE_URL(false), () => {
      cy.get('button').contains('تطبيق').click();
    });
    return this;
  }

  static clickCartButton() {
    return cy.origin(BASE_URL(false), { args: {} }, () => {
      return cy.get('button[data-sentry-component="CartButton"]').then(($btn) => {
        const countText = $btn.find('span p').text().trim();
        const count = parseInt(countText, 10) || 0;
        if (count > 0) {
          cy.wrap($btn).click();
          return true;
        } else {
          cy.log('Cart is empty; not clicking the Cart Button.');
          return false;
        }
      });
    }).then((clicked) => {
      return clicked ? this : false;
    });
  }

  static clickCloseButton() {
    cy.origin(BASE_URL(false), () => {
      cy.get('button[data-sentry-source-file="CheckoutSheet.tsx"]')
        .should('be.visible')
        .click();
    });
    return this;
  }

  static emptyTheCart() {
    this.clickCartButton().then((result) => {
      if (result === CheckoutPageAction) {
        cy.origin(BASE_URL(false), () => {
          cy.get('svg.lucide-trash2').each(($icon) => {
            cy.wrap($icon).click();
          });
        });
        CheckoutPageAction.clickCloseButton();
      } else {
        cy.log('Cart is empty, skipping emptyTheCart steps.');
      }
    });
    return this;
  }
}

export default CheckoutPageAction;

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { nanoid } from 'nanoid'
import CheckoutPageAction from "@pageObject/checkoutPage/checkoutPageAction";
import CheckoutPageAssertion from "@pageObject/checkoutPage/checkoutPageAssertion";
import CouponPageAssertion from "@pageObject/couponPage/couponPageAssertion";
import CouponPageAction from "@pageObject/couponPage/couponPageAction";
import CouponFormAction from "@pageObject/couponForm/couponFormAction";
import CouponFormAssertion from "@pageObject/couponForm/couponFormAssertion";

let couponName;
let couponCode;

beforeEach(() => {
  couponName = nanoid();
  couponCode = nanoid();
});

Given('User logged in as an admin user', () => {
  cy.loginToPlatform();
});

Given('User navigate to the Coupons page', () => {``
    CouponPageAction.visitCouponsPage();
});

Given('{string} coupon is already exists', (isActive: "Active" | "Inactive") => {
  cy.createCouponUI({ name: couponName, code: couponCode, discount: "50", type: "Fixed", active: isActive === "Active" });
});

When('User click on the {string} button', (buttonLabel: string) => {
  buttonLabel == 'Create' ? CouponPageAction.clickCreateButton() : CouponFormAction.clickSubmit();
});

When('User fill up name and code fields', () => {
    CouponFormAction.typeCouponName(couponName).typeCouponCode(couponCode);
});

When('User select {string} as the discount type', (type: 'Fixed' | 'Percentage') => {
  CouponFormAction.selectDiscountType(type);
});

When('User enter {string} as the discount amount', (value: string) => {
  CouponFormAction.typeDiscountValue(value);
});

When('User enable the Activate toggle', () => {
    CouponFormAction.enableActivation();
});

When('User fill up name and code fields with code {string}', (code: string) => {
  const couponName = nanoid();
  CouponFormAction.typeCouponName(couponName).typeCouponCode(code);
});

When('User select specific products', () => {
  CouponFormAction.selectSpecificProducts(['QaService']);
});

When('User open cart page and add product to cart', () => {
  CheckoutPageAction.visitCheckoutPage().emptyTheCart().searchProduct('QaService').addProductToCart().openCouponForm().typeCouponCode(couponCode).applyCoupon();
});

When('User open cart page and add the not applied product to cart', () => {
  CheckoutPageAction.visitCheckoutPage().emptyTheCart().searchProduct('TestProduct').addProductToCart().openCouponForm().typeCouponCode(couponCode).applyCoupon();
});

Then('User should see the Create Coupon form', () => {
  CouponFormAssertion.verifyCreateCouponFormVisible();
});

Then('User should see coupons listed in the Coupons grid', () => {
  CouponPageAssertion.verifyCouponListed(couponName);
});

Then('User should see error message {string}', () => {
  CouponPageAssertion.verifyDuplicateCouponError();
});

Then('Coupon should be applied successfully', () => {
  CheckoutPageAssertion.verifyCouponIsApplied();
});

Then('Discount should be applied to the cart', () => {
  CheckoutPageAssertion.verifyDiscountAmount("75");
});

Then('Coupon should not be applied', () => {
  CheckoutPageAssertion.verifyCouponIsApplied(false);
});

Then('Error message shows that coupon is not applicable for the product', () => {
  CheckoutPageAssertion.verifyCouponNotApplicableForTheProduct();
});

Then('Error message shows that coupon is not valid', () => {
  CheckoutPageAssertion.verifyCouponNotValid();
});

Then('Cart total should be updated', () => {
  CheckoutPageAssertion.verifyCartAmount("1925");
});

afterEach(() => {
  cy.deleteCouponUI(couponCode);
});

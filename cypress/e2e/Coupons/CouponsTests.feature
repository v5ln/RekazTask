Feature: Discount Coupon Management

  Background:
    Given User logged in as an admin user
    And User navigate to the Coupons page

  Scenario: TC-1 Navigate to the Coupons for and create a fixed discount coupon
    When User click on the "Create" button
    Then User should see the Create Coupon form
    When User fill up name and code fields
    And User select "Fixed" as the discount type
    And User enter "100" as the discount amount
    And User enable the Activate toggle
    And User click on the "Submit" button
    And User should see coupons listed in the Coupons grid

  Scenario: TC-2 Validate unique coupon code
    Given "Active" coupon is already exists
    When User click on the "Create" button
    And User fill up name and code fields
    And User select "Fixed" as the discount type
    And User enter "100" as the discount amount
    And User enable the Activate toggle
    And User click on the "Submit" button
    Then User should see error message "Coupon code already exists"

  Scenario: TC-3 Create a coupon for specific products and verify it is applied correctly
    When User click on the "Create" button
    And User fill up name and code fields
    And User select "Fixed" as the discount type
    And User enter "75" as the discount amount
    And User select specific products
    And User enable the Activate toggle
    And User click on the "Submit" button
    And User open cart page and add product to cart
    Then Coupon should be applied successfully
    And Discount should be applied to the cart
    And Cart total should be updated

    Scenario: TC-4 Create a coupon for specific products and use it for other product and verify it is not applied
    When User click on the "Create" button
    And User fill up name and code fields
    And User select "Fixed" as the discount type
    And User enter "75" as the discount amount
    And User select specific products
    And User enable the Activate toggle
    And User click on the "Submit" button
    And User open cart page and add the not applied product to cart
    Then Coupon should not be applied
    And Error message shows that coupon is not applicable for the product

  Scenario: TC-5 Deactivate a coupon and verify it cannot be applied
    Given "Inactive" coupon is already exists
    When User open cart page and add product to cart
    Then Coupon should not be applied
    And Error message shows that coupon is not valid

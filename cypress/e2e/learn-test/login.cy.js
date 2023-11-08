describe("Login", () => {
 it("Login Successfull", () => {
   cy.visit("https://www.saucedemo.com")
   cy.get("#user-name").type("performance_glitch_user")
   cy.get("#password").type("secret_sauce")
   cy.get("#login-button").click()
   cy.location().then((location) => {
     cy.wrap(location.href).should(
       "contain",
       "inventory.html"
     )
   })
 })

 it("Login Unsuccessfull", () => {
    cy.visit("https://www.saucedemo.com")
    cy.get("#user-name").type("wrong_password")
    cy.get("#password").type("secret_sauce")
    cy.get("#login-button").click()
    cy.get(".error")
            .should("have.length", 3)
            .then((errorMessage) => {
              cy.wrap(errorMessage)
                .last()
                .invoke("text")
                .should("be.oneOf", [
                  "Epic sadface: Sorry, this user has been locked out.",
                  "Epic sadface: Username and password do not match any user in this service",
                ])
            })
  })
})
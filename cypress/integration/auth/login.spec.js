describe('login', () => {
      beforeEach(() => {
        cy.clearCookie('userToken')
        cy.visit('http://localhost:3000')
      })

    it("sees error on email field when clicking login with empty form", () => {
        cy.contains('Login').click()
        // type="submit

        cy.contains("email is a required field").should('have.length', 1)
        cy.contains("password is a required field").should('have.length', 1)  
    })

    it("logs in succesfully", () => {
        const email = "fake_user1@officehourtesting.com"
        const password = "123456"
        cy.get('[data-test="email-field"]').type(`${email}`)
        cy.get('[data-test="password-field"]').type(`${password}{enter}`)

        cy.get('[data-test="page-2"]:first').click();

        // cy.get('[data-test=submitIsVisible]', { timeout: 10000 }).should('be.visible');
    })
})

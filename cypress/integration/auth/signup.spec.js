describe('/signup', () => {

    // const NEW_USER_EMAIL = "fake_user_new@officehourtesting.com"
    // const NEW_USER_PASSWORD = "123456"
  
    const NEW_USER_NAME = `Homework User ${new Date().getTime()}-${Math.random()}`
    const NEW_USER_PASSWORD = "Test01$"

    // const EXISTING_USER_EMAIL = "fake_user1@officehourtesting.com"
    // const EXISTING_USER_PASSWORD = "123456"

    const EXISTING_USER_EMAIL = "ana.user@test.com"
    const EXISTING_USER_PASSWORD = "Test01$"
  
  
    it("cannot access singup when logged in", () => {
        cy.clearCookies();
        cy.visit('http://localhost:3000')
      
        cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`)
        cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`)
        cy.get('[data-test="submit-login"]').click();

        cy.location('pathname').should('eq', '/')
        
        cy.visit('http://localhost:3000/signup')
    
        cy.location('pathname').should('eq', '/')
    })
  
    it("can access signup", () => {
        cy.clearCookies();
        cy.visit('http://localhost:3000/signup')  
        cy.location('pathname').should('eq', '/signup')
    })

    it('can register new user', () => {
        const NEW_USER_EMAIL = `homework-user-${new Date().getTime()}-${Math.random()}@test.com`
        cy.clearCookies();
        cy.visit('http://localhost:3000/signup')  
        cy.get('[data-test="first-name"]').type(`${NEW_USER_NAME}`)
        cy.get('[data-test="last-name"]').type(`${NEW_USER_NAME}`)
        cy.get('[data-test="email"]').type(`${NEW_USER_EMAIL}`)
        cy.get('[data-test="password"]').type(`${NEW_USER_PASSWORD}`)
        cy.get('[data-test="confirm-password"]').type(`${EXISTING_USER_PASSWORD}`)
        cy.get('[data-test="submit-sign-up"]').click();
    })

    it('shows field errors', () => {
        cy.clearCookies();
        cy.visit('http://localhost:3000/signup')  
        cy.get('[data-test="submit-sign-up"]').click();
        cy.get('[data-test="first-name-error"]').should('have.length', 1)
        cy.get('[data-test="last-name-error"]').should('have.length', 1)
        cy.get('[data-test="email-error"]').should('have.length', 1)
        cy.get('[data-test="password-error"]').should('have.length', 1)
        cy.get('[data-test="confirm-password-error"]').should('have.length', 1)

        cy.get('[data-test="first-name"]').type(`${NEW_USER_NAME}`)
        cy.get('[data-test="submit-sign-up"]').click();
        cy.get('[data-test="first-name-error"]').should('have.length', 0)
        cy.get('[data-test="last-name-error"]').should('have.length', 1)
        cy.get('[data-test="email-error"]').should('have.length', 1)
        cy.get('[data-test="password-error"]').should('have.length', 1)
        cy.get('[data-test="confirm-password-error"]').should('have.length', 1)
        
    })
  
  })
  
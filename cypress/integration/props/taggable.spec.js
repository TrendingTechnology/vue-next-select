/// <reference types="cypress" />

context('taggable', () => {
  it('should not have tag by default', () => {
    cy.visit('/cypress/fixtures/taggable/without.html')
    cy.get('.vue-select').click()

    cy.get('.vue-tag.selected').should('have.length', 0)
  })

  it('should show selected options as tags', () => {
    cy.visit('/cypress/fixtures/taggable/with.html')
    cy.get('.vue-select').click()

    cy.get('.vue-tag.selected').should('have.length', 1)

    cy.get('.vue-dropdown').children().first().next().click()
    cy.get('.vue-tag.selected').should('have.length', 2)

    cy.get('.vue-dropdown').children().first().next().next().click()
    cy.get('.vue-tag.selected').should('have.length', 3)
  })
})

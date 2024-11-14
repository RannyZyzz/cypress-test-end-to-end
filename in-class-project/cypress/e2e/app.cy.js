import assert from 'assert'

class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    urlFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit'),
  }
  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text)
  }
  typeUrl(text) {
    if (!text) return;
    this.elements.imageUrlInput().type(text)
  }
  clickSubmit() {
    this.elements.submitBtn().click()
  }
}

const registerForm = new RegisterForm();
const colors = {
  errors: "rgb(220, 53, 69)",
  success: "rgb(46, 204, 113)",
}

describe('Image Registration', () => {
  describe('Subumitting an imagem with invalid inputs', () => {

    after(() => {
      cy.clearAllLocalStorage()
    })

    const input = {
      title: '',
      url: ''
    }
    it('Given I am on the imagem registration page', () => {
      cy.visit('/')
    })

    it(`when I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })
    it(`when I enter "${input.url}" in the title field`, () => {
      registerForm.typeUrl(input.url)
    })
    it(`Then I click the submit button`, () => {
      registerForm.clickSubmit()
    })

    it(`Then I should see "Please type a title for the image" messagem above the title filed`, () => {
      // registerForm.elements.titleFeedback().should(element => {
      //   debugger
      // })
      registerForm.elements.titleFeedback().should('contains.text', 'Please type a title for the image.')
    })

    it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
      registerForm.elements.urlFeedback().should('contains.text', 'Please type a valid URL')
    })

    it(`And I should see and exclamation icon in the title and URL fields`, () => {
      // registerForm.elements.titleFeedback().should(element => {
      //   debugger
      // })

      registerForm.elements.titleInput().should(([element]) => {
        const stylus = window.getComputedStyle(element)
        const border = stylus.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.errors)
      })
    })
  })
})
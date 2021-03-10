describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'TopoCypress',
      username: 'TC',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Blog app login', function () {
    it('Login form is shown', function () {
      cy.contains('Blog app')
      cy.contains('Log in to application')
    })

    it('user can login', function () {
      cy.get('#usernameInLogin').type('TC')
      cy.get('#passwordInLogin').type('salasana')
      cy.get('#loginButton').click()

      cy.contains('TC logged in')
    })

    it('wrong user cannot login', function () {
      cy.get('#usernameInLogin').type('PC')
      cy.get('#passwordInLogin').type('julkinensana')
      cy.get('#loginButton').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function () {

    beforeEach(function () {
      cy.login({ username: 'TC', password: 'salasana' })
      cy.createBlog({ title: 'automatedCypressBlog', author: 'automCypress', url: 'automUrl' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('cypressTitle')
      cy.get('#author').type('cypressAuthor')
      cy.get('#url').type('cypressUrl')

      cy.get('#createBlogButton').click()
      cy.contains('cypressTitle')
    })

    it('blog can be liked', function () {
      cy.contains('automatedCypressBlog').parent().as('theBlog')
      cy.get('@theBlog').find('#viewButton').click()
      cy.get('@theBlog').find('#likeButton').click()
      cy.get('@theBlog').contains('likes: 1')
    })

    it('blog can be deleted', function () {
      cy.contains('automatedCypressBlog').parent().as('theBlog')
      cy.get('@theBlog').find('#viewButton').click()
      cy.get('@theBlog').find('#deleteButton').click()
      cy.contains('Blog removed')
    })

  })
})


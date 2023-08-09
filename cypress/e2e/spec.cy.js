import 'cypress-file-upload';
describe('template spec', () => {
  before(() => {
    cy.timeout(1200000); // Set the desired timeout value
    cy.on('window:confirm', () => true); // Always confirm
    cy.on('window:alert', () => { }); // Do nothing on alert
    cy.on('window:prompt', () => 'Mocked input');
    cy.intercept('POST', 'https://filevalidation.naukri.com/file').as('xhrRequest');
  });
  it('passes', () => {
    cy.visit('https://www.naukri.com/')
    cy.get('#login_Layer').click({ froce: true })
    cy.get('.form > :nth-child(2) > input', { timeouts: 50000 }).type('gayatrishirsat0407@gmail.com')
    cy.get(':nth-child(3) > input').type('debajyoti@1').type('{enter}');
    cy.get('.view-profile-wrapper > a', { timeouts: 90000 }).click()
    cy.get(':nth-child(2) > .secondary-content').click()
    cy.fixture('Gayatree_Shirsat_Resume.pdf').then(fileContent => {
      // Mock the file input element and attach the PDF file
      cy.get('#attachCV').attachFile({
        fileContent,
        fileName: 'file.pdf',
        mimeType: 'application/pdf'
      });
      cy.contains('.collection-item', 'Resume')
        .find('.secondary-content')
        .click();
    });
    cy.wait('@xhrRequest')
      .its('response.statusCode')
      .should('eq', 200);
  })
})
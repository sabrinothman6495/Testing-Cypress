describe('Tech Quiz E2E Tests', () => {
  beforeEach(() => {
    // Mock the questions API with the fixture
    cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
    
    // Visit the application
    cy.visit('/');
  });

  it('should load the quiz and start it', () => {
    cy.get('.btn').contains('Start Quiz').click(); // Start the quiz
    cy.wait('@getQuestions'); // Wait for the mocked API call
    cy.get('.spinner-border').should('not.exist'); // Spinner disappears
    cy.get('.card').contains('What does HTML stand for?'); // First question appears
  });

  it('should progress through questions and calculate the score', () => {
    cy.get('.btn').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer the first question
    cy.get('.btn').contains('1').click(); // Select "HyperText Markup Language"
    // Answer the second question
    cy.get('.btn').contains('2').click(); // Select "A library"

    // Validate the score
    cy.get('.alert').contains('Your score: 2/2').should('be.visible');
  });

  it('should allow restarting the quiz', () => {
    cy.get('.btn').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Complete the quiz
    cy.get('.btn').contains('1').click(); // First question
    cy.get('.btn').contains('2').click(); // Second question

    // Restart the quiz
    cy.get('.btn').contains('Take New Quiz').click();
    cy.get('.btn').contains('Start Quiz').should('be.visible'); // Restart prompt
  });
});

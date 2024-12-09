import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions', {
      fixture: 'questions.json',
    }).as('getQuestions');
  });

  it('renders the start screen', () => {
    mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').should('be.visible');
  });

  it('starts the quiz and fetches questions', () => {
    mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.spinner-border').should('be.visible');
  });

  it('displays a question and options', () => {
    mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.card').contains('What does HTML stand for?');
    cy.get('.btn').contains('1').should('exist');
  });

  it('updates the score and moves to the next question', () => {
    mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.btn').contains('1').click();
    cy.get('.card').contains('What is React?');
  });

  it('displays the final score when the quiz ends', () => {
    mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.btn').contains('1').click(); // First question
    cy.get('.btn').contains('1').click(); // Second question
    cy.get('.card').contains('Quiz Completed');
    cy.get('.alert').contains('Your score:');
  });

  it('resets the quiz when "Take New Quiz" is clicked', () => {
    mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.btn').contains('1').click(); // First question
    cy.get('.btn').contains('1').click(); // Second question
    cy.get('.btn').contains('Take New Quiz').click();
    cy.get('.btn').contains('Start Quiz');
  });
});

describe('Routing tests', () => {
    it('should navigate between Home, Projects, and Contacts pages', () => {
      // Відкриваємо головну сторінку
      cy.visit('/');
  
      // Перевіряємо, чи є заголовок сторінки Home
      cy.contains('Hi, my name is Sasha').should('be.visible');
  
      // Перехід на сторінку Projects
      cy.get('nav a').contains('Projects').click();
      cy.url().should('include', '/projects');
      cy.contains('Projects').should('be.visible');
  
      // Перехід на сторінку Contacts
      cy.get('nav a').contains('Contacts').click();
      cy.url().should('include', '/contacts');
      cy.contains('Contacts').should('be.visible');
    });
  
    it('should navigate to a specific project page and check content', () => {
      // Припустимо, що є хоча б один проєкт у списку
      cy.visit('/projects');
  
      // Отримуємо перше посилання на проект і переходимо на нього
      cy.get('.project-card a').first().click();
  
      // Перевіряємо, що ми на сторінці конкретного проекту
      cy.url().should('include', '/project/');
  
      // Перевіряємо, що відображається заголовок проєкту (використовуємо більш точний селектор)
      cy.get('.project-title').should('be.visible');
    });
  });
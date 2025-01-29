import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Projects from '../pages/projects';
import { projects } from "../helpers/projectsList";

describe('Projects Page', () => {
  test('renders all projects on the Projects page', () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter> 
    );

    // Перевіряємо, чи є на сторінці всі назви проектів
    projects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });

    // Перевіряємо, чи є на сторінці зображення для кожного проекту
    projects.forEach(project => {
      expect(screen.getByAltText(project.title)).toBeInTheDocument();
    });

    // Перевірка наявності посилань на GitHub, якщо є
    projects.forEach(project => {
      if (project.gitHubLink) {
        // Шукаємо всі посилання на сторінці
        const links = screen.getAllByRole('link');
        
        // Знаходимо перше посилання з правильним атрибутом href
        const githubLink = links.find(link => link.getAttribute('href') === project.gitHubLink);

        // Перевіряємо, чи знайдено відповідне посилання
        if (githubLink) {
          expect(githubLink).toBeInTheDocument();
        } else {
          console.error(`GitHub link for project "${project.title}" not found.`);
        }
      }
    });
  });
});
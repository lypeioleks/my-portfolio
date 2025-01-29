import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Projects from '../pages/projects';
import Project from '../pages/Project';
import Contacts from '../pages/Contacts'; 


describe('App Router', () => {

    test('renders the Home page on the default route', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </MemoryRouter>
        );
        const header = await screen.findByRole('heading', { name: /Hi, my name is Sasha/i });
        expect(header).toBeInTheDocument();
      });

  test('renders the Projects page on "/projects"', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <Routes>
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
  });

  test('renders the Contacts page on "/contacts"', () => {
    render(
      <MemoryRouter initialEntries={['/contacts']}>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </MemoryRouter>
    );
    screen.debug();  // Вивести DOM
    expect(screen.getByText(/contacts/i)).toBeInTheDocument();
  });

  test('renders the Project page for dynamic route "/project/:id"', () => {
    render(
      <MemoryRouter initialEntries={['/project/1']}>
        <Routes>
          <Route path="/project/:id" element={<Project title="Project Title" img="image.jpg" index={1} />} />
        </Routes>
      </MemoryRouter>
    );
  // Вивести DOM для діагностики 
    screen.debug();
  });
})
import { render, screen, fireEvent } from "@testing-library/react";
import BtnDarkMode from "/src/components/btnDarkMode/BtnDarkMode";

// Мок localStorage для тестування
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null; 
    },  
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  }; 
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Dark Mode Button", () => {
  afterEach(() => {
    window.localStorage.clear();
    document.body.classList.remove("dark");
  });

  test("should apply dark mode when clicked", () => {
    render(<BtnDarkMode />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(document.body.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("darkMode")).toBe("\"dark\"");
  });

  test("should apply light mode when clicked twice", () => {
    render(<BtnDarkMode />);

    const button = screen.getByRole("button");
    fireEvent.click(button); // Включити темну тему
    fireEvent.click(button); // Вимкнути темну тему

    expect(document.body.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("darkMode")).toBe("\"light\"");
  });

  test("should initialize with light mode if no localStorage or system preference", () => {
    render(<BtnDarkMode />);

    expect(document.body.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("darkMode")).toBe("\"light\"");
  });
  
  test("should save theme to localStorage when changed", () => {
    render(<BtnDarkMode />);
  
    const button = screen.getByRole("button");
    fireEvent.click(button); // Включити темну тему
  
    expect(window.localStorage.getItem("darkMode")).toBe("\"dark\"");
  
    fireEvent.click(button); // Вимкнути темну тему
  
    expect(window.localStorage.getItem("darkMode")).toBe("\"light\"");
  });
  
  test("should restore theme from localStorage after reload", () => {
    // Спочатку зберігаємо тему в localStorage
    localStorage.setItem("darkMode", JSON.stringify("dark"));
  
    render(<BtnDarkMode />);
  
    // Перезавантажуємо компонент
    window.location.reload();
  
    // Перевіряємо, що тема відновилася як темна
    expect(document.body.classList.contains("dark")).toBe(true);
  });

  test("should initialize with light mode when no previous theme is saved", () => {
    window.localStorage.clear(); // Очищаємо localStorage
  
    render(<BtnDarkMode />);
  
    expect(document.body.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("darkMode")).toBe("\"light\"");
  });
});
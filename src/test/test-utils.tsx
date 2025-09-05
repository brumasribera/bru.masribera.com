/**
 * Test Utilities
 * 
 * Custom render functions and utilities for testing React components
 * with proper context providers and common setup.
 */

import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  initialEntries?: string[];
}

const AllTheProviders = ({ 
  children, 
  route = '/' 
}: { 
  children: ReactNode; 
  route?: string; 
}) => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  {
    route = '/',
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  // Set the route
  if (route !== '/') {
    window.history.pushState({}, 'Test page', route);
  }

  return render(ui, {
    wrapper: ({ children }) => <AllTheProviders route={route}>{children}</AllTheProviders>,
    ...renderOptions,
  });
};

// Test data factories
export const createMockProject = (overrides = {}) => ({
  id: 'test-project',
  name: 'Test Project',
  country: 'Test Country',
  description: 'Test Description',
  image: '/test-image.jpg',
  lat: 0,
  lon: 0,
  pricePerM2: 1.0,
  totalArea: 1000,
  protectedArea: 500,
  protectionPercentage: 50,
  category: 'forest',
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: 'test-user',
  email: 'test@example.com',
  name: 'Test User',
  ...overrides,
});

// Utility functions
export const waitForLoadingToFinish = () =>
  new Promise(resolve => setTimeout(resolve, 0));

export const mockGeolocation = (coords = { latitude: 40.7128, longitude: -74.0060 }) => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn().mockImplementation((success) =>
      success({
        coords,
        timestamp: Date.now(),
      })
    ),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  };
  
  Object.defineProperty(global.navigator, 'geolocation', {
    value: mockGeolocation,
    writable: true,
  });
  
  return mockGeolocation;
};

export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  window.IntersectionObserverEntry = vi.fn();
  
  return mockIntersectionObserver;
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';


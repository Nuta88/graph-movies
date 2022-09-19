import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './index';

const mocks = [];

test('renders App component', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(screen.getByText(/HEADER/i)).toBeInTheDocument();
});

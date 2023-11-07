import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { act, create } from 'react-test-renderer';

import App from './App';
import store from '../resources/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/CVSS v4.0/i);
  expect(linkElement).toBeInTheDocument();
});

test('should match expected snapshot', () => {
  const mockStore = configureMockStore();

  const component = create(
    <Provider store={mockStore({ cvss4: {} })}>
      <App history={history} />
    </Provider>
  );

  act(() => {
    component.update(
      <Provider store={mockStore({ cvss4: {} })}>
        <App history={history} />
      </Provider>
    );
  });

  act(() => {
    component.root
      .findAllByProps({ 'data-testid': 'button-metric-change-value' })[7]
      .props.onClick();
  });

  act(() => {
    component.root
      .findByProps({ 'data-testid': 'button-reset-score' })
      .props.onClick();
  });

  expect(component.toJSON()).toMatchSnapshot();
});

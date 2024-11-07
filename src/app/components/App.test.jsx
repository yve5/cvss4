import React from 'react';
import configureMockStore from 'redux-mock-store';

import { vi } from 'vitest';
import { createRoot } from 'react-dom/client';
import { Provider, ReactReduxContext } from 'react-redux';
import { act, fireEvent, render } from '@testing-library/react';

import App from './App';
import store from '../resources/store';

const mockStore = configureMockStore();
const defaultStore = { cvss4: {} };

describe('App', () => {
  it('should render without crashing', async () => {
    const root = createRoot(document.createElement('div'));

    await act(async () => {
      root.render(
        <Provider store={store}>
          <App context={ReactReduxContext} />
        </Provider>
      );
    });

    await act(async () => {
      root.unmount();
    });
  });

  it('should match expected snapshot', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(),
      },
    });

    const { asFragment, getByText, rerender } = render(
      <Provider store={mockStore(defaultStore)}>
        <App history={history} />
      </Provider>
    );

    rerender(
      <Provider store={mockStore(defaultStore)}>
        <App history={history} />
      </Provider>
    );

    await act(async () => {
      fireEvent.click(getByText('Irrecoverable (I)'));
    });

    await act(async () => {
      fireEvent.click(getByText('Copy'));
    });

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    });

    await act(async () => {
      fireEvent.click(getByText('Reset'));
    });

    expect(asFragment()).toMatchSnapshot();
  });
});

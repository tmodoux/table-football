import { render } from '@testing-library/react';
import Player from '../components/Player';
import { MockedProvider } from "@apollo/client/testing";
import Game from '../components/Game';
import Scoreboard from '../components/Scoreboard';
import { mockMatchMedia } from './testUtils';

describe('Snapshots tests', () => {
  test('renders App', () => {
    const component =
      <MockedProvider>
        <Player />
      </MockedProvider>;
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  test('renders Game', () => {
    const component =
      <MockedProvider>
        <Game />
      </MockedProvider>;
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  test('renders Player', () => {
    const component =
      <MockedProvider>
        <Player addPlayer={() => { }} />
      </MockedProvider>;
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  test('renders Scoreboard', () => {
    mockMatchMedia();
    const component =
      <MockedProvider>
        <Scoreboard />
      </MockedProvider>;
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
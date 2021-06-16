import { render } from '@testing-library/react';

import ListItemLink from './list-item-link';

describe('ListItemLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListItemLink />);
    expect(baseElement).toBeTruthy();
  });
});

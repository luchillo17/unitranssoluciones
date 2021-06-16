import { render } from '@testing-library/react';

import UploadedListPage from './uploaded-list-page';

describe('UploadedListPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadedListPage />);
    expect(baseElement).toBeTruthy();
  });
});

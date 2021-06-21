import { render } from '@testing-library/react';

import FileTable from './file-table';

describe('FileTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileTable />);
    expect(baseElement).toBeTruthy();
  });
});

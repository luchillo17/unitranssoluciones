import { render } from '@testing-library/react';

import UploadQueuePage from './upload-queue-page';

describe('UploadQueuePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadQueuePage />);
    expect(baseElement).toBeTruthy();
  });
});

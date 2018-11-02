import { SanitizeInputPipe } from './sanitize-input.pipe';

describe('SanitizeInputPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeInputPipe();
    expect(pipe).toBeTruthy();
  });
});

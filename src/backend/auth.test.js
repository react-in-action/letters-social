import {
  loginWithGoogle,
  loginWithGithub,
  loginWithTwitter,
  loginWithFacebook,
  logout
} from './auth';

describe('auth', () => {
  it('should have the right provider methods exposed', () => {
    expect(loginWithGoogle).toBeDefined();
    expect(loginWithGoogle).toBeInstanceOf(Function);

    expect(loginWithGithub).toBeDefined();
    expect(loginWithGithub).toBeInstanceOf(Function);

    expect(loginWithTwitter).toBeDefined();
    expect(loginWithTwitter).toBeInstanceOf(Function);

    expect(loginWithFacebook).toBeDefined();
    expect(loginWithFacebook).toBeInstanceOf(Function);
  });

  it('should enable logout', () => {
    expect(logout).toBeDefined();
    expect(logout).toBeInstanceOf(Function);
  });
});

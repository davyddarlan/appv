import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.appv.beta',
  appName: 'appv-test-v1',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: 'appv.jks',
      keystorePassword: '123456789',
      keystoreAlias: 'appv',
      keystoreAliasPassword: '123456789',
    }
  }
};

export default config;

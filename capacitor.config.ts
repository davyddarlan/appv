import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.appv.sigma',
  appName: 'Visa Estrutural',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: 'appv.jks',
      keystorePassword: '123456789',
      keystoreAlias: 'appv',
      keystoreAliasPassword: '123456789',
      releaseType: 'APK',
      signingType: 'apksigner',
    },
  }, 
};

export default config;

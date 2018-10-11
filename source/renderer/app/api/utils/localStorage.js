import Store from 'electron-store';

const store = new Store();

/**
 * This api layer provides access to the electron local storage
 * for user settings that are not synced with any coin backend.
 */

export default class LocalStorageApi {
  constructor(NETWORK: string) {
    this.storageKeys = {
      USER_LOCALE: `${NETWORK}-USER-LOCALE`,
      TERMS_OF_USE_ACCEPTANCE: `${NETWORK}-TERMS-OF-USE-ACCEPTANCE`,
      THEME: `${NETWORK}-THEME`,
      DATA_LAYER_MIGRATION_ACCEPTANCE: `${NETWORK}-DATA-LAYER-MIGRATION-ACCEPTANCE`,
    };
  }

  getUserLocale = () => new Promise((resolve, reject) => {
    try {
      const locale = store.get(this.storageKeys.USER_LOCALE);
      if (!locale) return resolve('');
      resolve(locale);
    } catch (error) {
      return reject(error);
    }
  });

  setUserLocale = (locale: string) => new Promise((resolve, reject) => {
    try {
      store.set(this.storageKeys.USER_LOCALE, locale);
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetUserLocale = () => new Promise((resolve) => {
    try {
      store.delete(this.storageKeys.USER_LOCALE);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  getTermsOfUseAcceptance = () => new Promise((resolve, reject) => {
    try {
      const accepted = store.get(this.storageKeys.TERMS_OF_USE_ACCEPTANCE);
      if (!accepted) return resolve(false);
      resolve(accepted);
    } catch (error) {
      return reject(error);
    }
  });

  setTermsOfUseAcceptance = () => new Promise((resolve, reject) => {
    try {
      store.set(this.storageKeys.TERMS_OF_USE_ACCEPTANCE, true);
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetTermsOfUseAcceptance = () => new Promise((resolve) => {
    try {
      store.delete(this.storageKeys.TERMS_OF_USE_ACCEPTANCE);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  getUserTheme = () => new Promise((resolve, reject) => {
    try {
      const theme = store.get(this.storageKeys.THEME);
      if (!theme) return resolve('');
      resolve(theme);
    } catch (error) {
      return reject(error);
    }
  });

  setUserTheme = (theme: string) => new Promise((resolve, reject) => {
    try {
      store.set(this.storageKeys.THEME, theme);
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetUserTheme = () => new Promise((resolve) => {
    try {
      store.delete(this.storageKeys.THEME);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  getDataLayerMigrationAcceptance = () => new Promise((resolve, reject) => {
    try {
      const accepted = store.get(this.storageKeys.DATA_LAYER_MIGRATION_ACCEPTANCE);
      if (!accepted) return resolve(false);
      resolve(accepted);
    } catch (error) {
      return reject(error);
    }
  });

  setDataLayerMigrationAcceptance = () => new Promise((resolve, reject) => {
    try {
      store.set(this.storageKeys.DATA_LAYER_MIGRATION_ACCEPTANCE, true);
      resolve();
    } catch (error) {
      return reject(error);
    }
  });

  unsetDataLayerMigrationAcceptance = () => new Promise((resolve) => {
    try {
      store.delete(this.storageKeys.DATA_LAYER_MIGRATION_ACCEPTANCE);
      resolve();
    } catch (error) {} // eslint-disable-line
  });

  async reset() {
    await this.unsetUserLocale();
    await this.unsetTermsOfUseAcceptance();
    await this.unsetUserTheme();
    await this.unsetDataLayerMigrationAcceptance();
  }

}

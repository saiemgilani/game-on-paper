const createStorage = (provider: any) => ({
    get(key: any, defaultValue: any) {
      const json = provider.getItem(key);
      // eslint-disable-next-line no-nested-ternary
      return json === null || typeof json === 'undefined'
        ? typeof defaultValue === 'function'
          ? defaultValue()
          : defaultValue
        : JSON.parse(json);
    },
    set(key: any, value: any) {
      provider.setItem(key, JSON.stringify(value));
    },
  });

  export default createStorage;
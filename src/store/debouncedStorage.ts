let timeout: ReturnType<typeof setTimeout> | null = null;

export const createDebouncedJSONStorage = (delay = 300) => {
  return {
    getItem: (name: string) => {
      const value = localStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    },

    setItem: (name: string, value: any) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        localStorage.setItem(name, JSON.stringify(value));
      }, delay);
    },

    removeItem: (name: string) => {
      localStorage.removeItem(name);
    },
  };
};

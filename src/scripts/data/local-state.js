// create function for local storage
// Path: src/scripts/data/local-state.js
// import CONFIG from '../globals/config';

// const LocalState = {
//   init() {
//     const data = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);
//     if (!data) {
//       localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, JSON.stringify({
//         SETTINGS: [],
//         FAVORITES: [],
//       }));
//     }
//     return JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY));
//   },

//   saveData(data, type) {
//     const storage = this.init();
//     const filteredData = storage[type].filter(({ id }) => id !== data.id);
//     storage[type] = [...filteredData, data];
//     localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, JSON.stringify(storage));
//   },

//   getData(type) {
//     return this.init()[type];
//   },
// };

// export default LocalState;

import CONFIG from '../globals/config';

const LocalState = {
  init() {
    const settings = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);

    if (!settings) {
      const initialSettings = [];
      localStorage
        .setItem(CONFIG.LOCAL_STORAGE_KEY, JSON.stringify(initialSettings));
    }

    return JSON.parse(settings);
  },

  saveData(data) {
    const settings = this.init();
    const filteredData = settings.filter(({ id }) => id !== data.id);
    filteredData.push(data);
    localStorage
      .setItem(CONFIG.LOCAL_STORAGE_KEY, JSON.stringify(filteredData));
  },

  getData() {
    return this.init();
  },
};

export default LocalState;

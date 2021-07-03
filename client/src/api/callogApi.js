const { default: axiosClient } = require("./axiosClient");

module.exports = {
  testApi: () => {
    const url = "/testapi";
    return axiosClient.get(url);
  },
  showCallog: () => {
    const url = "/showcallog";
    return axiosClient.get(url);
  },
};

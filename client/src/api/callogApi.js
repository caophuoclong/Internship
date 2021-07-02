const { default: axiosClient } = require("./axiosClient");

module.exports = {
  createacallog: (params) => {
    const url = "/createacallog";
    return axiosClient.post(url, { params });
  },
  testApi: () => {
    const url = "/testapi";
    return axiosClient.get(url);
  },
  showCallog: () => {
    const url = "/showcallog";
    return axiosClient.get(url);
  },
};

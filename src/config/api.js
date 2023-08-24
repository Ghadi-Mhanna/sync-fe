import {PrivateApiCall, PublicApiCall} from "./interceptors";

const errorCatch = (error) => {
  if (error.response) {
    if (error.reponse?.data) {
      return error.response?.data;
    }
    return error.response;
  }
  return error;
};

/** ******************************************************************************************* */
/** ************************************** AUTH *********************************************** */
/** ******************************************************************************************* */

export async function login(data) {
  const resp = await PublicApiCall.post("/auth/login", data)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

/** ******************************************************************************************* */
/** ************************************** USER *********************************************** */
/** ******************************************************************************************* */

export async function addUser(data) {
  const resp = await PrivateApiCall.post("/users/create", data)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function getAllUsers() {
  const resp = await PrivateApiCall.get("/users/get-all")
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function getOneUser(uuid) {
  const resp = await PrivateApiCall.get(`/users/get-one/${uuid}`)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function updateUser(uuid, data) {
  const resp = await PrivateApiCall.put(`/users/update/${uuid}`, data)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function deleteUser(uuid) {
  const resp = await PrivateApiCall.delete(`/users/delete/${uuid}`)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}
/** ******************************************************************************************* */
/** ************************************ Categories ******************************************* */
/** ******************************************************************************************* */

export async function addCategory(data) {
  const resp = await PrivateApiCall.post("/categories/create", data)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function getAllCategories() {
  const resp = await PrivateApiCall.get("/categories/get-all")
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function getOneCategory(uuid) {
  const resp = await PrivateApiCall.get(`/categories/get-one/${uuid}`)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function updateCategory(uuid, data) {
  const resp = await PrivateApiCall.put(`/categories/update/${uuid}`, data)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function deleteCategory(uuid) {
  const resp = await PrivateApiCall.delete(`/categories/delete/${uuid}`)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

/** ******************************************************************************************* */
/** ************************************ News ************************************************* */
/** ******************************************************************************************* */

export async function addNews(data) {
  const resp = await PrivateApiCall.post("/news/create", data)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function getAllNews() {
  const resp = await PrivateApiCall.get("/news/get-all")
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function getOneNews(uuid) {
  const resp = await PrivateApiCall.get(`/news/get-one/${uuid}`)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function updateNews(uuid, data) {
  const resp = await PrivateApiCall.put(`/news/update/${uuid}`, data)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

export async function deleteNews(uuid) {
  const resp = await PrivateApiCall.delete(`/news/delete/${uuid}`)
    .then((response) => response)
    .catch((error) => errorCatch(error));
  return resp;
}

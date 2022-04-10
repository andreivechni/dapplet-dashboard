const API_VERSION = process.env.API_VERSION ? API_VERSION : "v1";
const API_BASE_URL = `https://dapplets-hiring-api.herokuapp.com/api/${API_VERSION}`;
const DEFAULT_API_LIMIT = 20;

const SORT_DIRS = {
  ascending: "ASC",
  descending: "DESC",
};

const DAPPLET_SORT_FIELDS = [
  "id",
  "icon",
  "title",
  "author",
  "rating",
  "address",
  "released",
  "downloads",
  "description",
];

const DESKTOP_SCREEN_SIZE = 1440;
const MOBILE_SCREEN_SIZE = 425;

export {
  API_BASE_URL,
  API_VERSION,
  DEFAULT_API_LIMIT,
  SORT_DIRS,
  DESKTOP_SCREEN_SIZE,
  MOBILE_SCREEN_SIZE,
  DAPPLET_SORT_FIELDS
};

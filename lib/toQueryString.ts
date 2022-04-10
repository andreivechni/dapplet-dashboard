function toQueryString(paramInput: Record<string, any>): string {
  const params = [];

  for (let key in paramInput) {
    if (paramInput.hasOwnProperty(key)) {
      if (Array.isArray(paramInput[key])) {
        const stringifiedArrayParam = JSON.stringify(paramInput[key]);

        const param = encodeURIComponent(key)
          .concat("=")
          .concat(encodeURIComponent(stringifiedArrayParam));

        params.push(param);
      } else {
        const param = encodeURIComponent(key)
          .concat("=")
          .concat(encodeURIComponent(paramInput[key]));

        params.push(param);
      }
    }
  }

  return params.join("&");
}

export { toQueryString };

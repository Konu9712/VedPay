/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}
/**
 * @desc For API Error/ Message Response
 * @param {*} value // Accepts errors
 */
export const getAPIErrorReason = (e) => {
  if (e) {
    if (e.response && e.response.data) {
      // console.log("e.response && e.response.data", e.response);
      return e.response.data.reason || e.response.data.message;
    } else if (e.message) {
      return e.message;
    }
  }
};

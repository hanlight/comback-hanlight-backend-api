export default function deleteUndefined(obj: object) {
  Object.keys(obj).forEach(val => obj[val] === undefined && delete obj[val]);
}

export function objectToFormData(obj, formData = new FormData(), parentKey = '') {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const formKey = parentKey ? `${parentKey}[${key}]` : key

      if (value instanceof Array) {
        // If the value is an array, iterate over the array and append each item
        value.forEach((item, index) => {
          objectToFormData({ [index]: item }, formData, formKey)
        })
      } else if (value instanceof Object && value !== null) {
        // If the value is an object, recursively call the function
        objectToFormData(value, formData, formKey)
      } else {
        // Otherwise, append the value to the FormData
        formData.append(formKey, value)
      }
    }
  }
  return formData
}

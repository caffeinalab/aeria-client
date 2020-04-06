/**
 * Checks if a field is enabled (depending on some conditions)
 *
 * @param {Object} field The field to perform check on
 * @param {Object[]} fields The full fields list
 *
 * @return {Boolean}
 */
export default function isFieldEnabled(field, fields) {
  const { when = false } = field

  return !when || fields.some(f => {
    const value = (f.value !== undefined && f.value !== null) ? f.value : f.defaultValue
    return (
      when.id === f.id
        && (
          typeof when.value === 'string'
            ? when.value === value
            : when.value.includes(value)
        )
    )
  })
}

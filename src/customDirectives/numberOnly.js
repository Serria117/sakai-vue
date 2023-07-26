
// OnlyNumberDashDirective.js
export default {
  mounted(el) {
    el.addEventListener('input', function(e) {
      const value = e.target.value
      const newValue = value.replace(/[^0-9-]/g, '') // Only keep numbers and dash
      e.target.value = newValue
    })
  }
}
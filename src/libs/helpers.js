import handlebars from 'handlebars'
import moment from 'moment/moment'
let now = moment()
moment.locale('es')

handlebars.registerHelper('checked', function (currentValue) {
  return currentValue === '1' ? ' checked="checked"' : ''
})
handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1
})
handlebars.registerHelper('format_date2', function (currentValue) {
  const date = moment(currentValue, "DD/MM/YYYY")
  return moment(date, "DD/MM/YYYY").format('LL')
})

handlebars.registerHelper('status_incidencia', function(currentValue) {
  if (currentValue === 'Pendiente'){
    return currentValue = false
  } else if (currentValue === 'Resuelto') {
    return currentValue = true
  }
});
handlebars.registerHelper('color_status_incidencia', function (currentValue) {
  if (currentValue === 'Pendiente'){
    return currentValue = 'text-danger'
  } else if (currentValue === 'Resuelto') {
    return currentValue = 'text-success'
  }
})
handlebars.registerHelper('format_date', function (currentValue) {
  const date = moment(currentValue, "DD/MM/YYYY hh:mm");
  return moment(date, "DD MM YYYY hh:mm").fromNow()
})
handlebars.registerHelper('collapse_status', function (currentValue) {
  return (currentValue === 0) ? currentValue = 'show' : ''
})
handlebars.registerHelper('status_incidencia_button', function (currentValue) {
  if (currentValue === 'Pendiente'){
    return currentValue = true
  } else if (currentValue === 'Resuelto') {
    return currentValue = false
  }
})

module.exports = {handlebars, moment}

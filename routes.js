const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

const APP_ROUTES = [{
  page: 'index',
  pattern: '/'
}, {
  page: 'home',
  pattern: '/home'
}, {
  page: 'ui',
  pattern: '/ui'
}]

APP_ROUTES.forEach(route => routes.add(route))

require('dotenv').config()
import webpush from 'web-push'
const publicKey = process.env.public
const privateKey = process.env.private

webpush.setVapidDetails(
  "mailto:splash.jalj@gmail.com",
  publicKey,
  privateKey
)

module.exports = webpush

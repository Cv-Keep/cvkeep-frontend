#!/usr/bin/env

heroku create cvkeep-frontend

heroku config:set VUE_APP_BRAND_NAME="CV Keep"
heroku config:set VUE_APP_API_URL="http://localhost:5000"
heroku config:set VUE_APP_AUTH_AVAILABLE="email facebook github likedin"
heroku config:set VUE_APP_FACEBOOK_API_VERSION="v7.0"
heroku config:set VUE_APP_FACEBOOK_API_ID=""
heroku config:set VUE_APP_LINKEDIN_API_KEY=""
heroku config:set VUE_APP_CONTACT_EMAIL="contact@email.com"
heroku config:set VUE_APP_DONATION_PAYPAL_URL=""
heroku config:set VUE_APP_DONATION_PIX_KEY=""
heroku config:set VUE_APP_DONATION_BITCOIN=""
heroku config:set FRONT_SERVER_APP_URL="https://cvkeep-frontend.herokuapp.com/"
heroku config:set SEO_CARD_IMAGE_URL="https://cvkeep-frontend.herokuapp.com/seo/card.png"
heroku config:set SEO_TWITTER_USER="username"

git push heroku main
heroku ps:scale web=1
heroku open
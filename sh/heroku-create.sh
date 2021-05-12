#!/usr/bin/env

heroku create cvkeep-frontend

for ITEM in "VUE_APP_BRAND_NAME" "VUE_APP_API_URL" "VUE_APP_AUTH_AVAILABLE" "VUE_APP_FACEBOOK_API_VERSION" "VUE_APP_FACEBOOK_API_ID" "VUE_APP_LINKEDIN_API_KEY" "VUE_APP_CONTACT_EMAIL" "VUE_APP_DONATION_PAYPAL_URL" "VUE_APP_DONATION_PIX_KEY" "VUE_APP_DONATION_BITCOIN" "FRONT_SERVER_APP_URL" "SEO_CARD_IMAGE_URL" "SEO_TWITTER_USER";
do
  echo "Enter value for env key $ITEM:"
  read VALUE
  heroku config:set $ITEM="$VALUE"
done

git push heroku main
heroku ps:scale web=1
heroku open
#!/usr/bin/env

heroku create cvkeep-frontend
git push heroku main
heroku ps:scale web=1
heroku open
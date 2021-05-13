#!/usr/bin/env

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

heroku create cvkeep-frontend
sh $SCRIPTPATH/heroku-setenv.sh

git push heroku main
heroku ps:scale web=1
heroku open
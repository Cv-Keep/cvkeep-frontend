#!/usr/bin/env

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

if test -f "$SCRIPTPATH/../.env.production"; then

  # if a .env.production axists, read it and set 
  # the same vars on heroku app
  while read line || [ -n "$line" ];
  do 
    KEY=$(echo $line | cut -d'=' -f1)
    VALUE=$(echo $line | cut -d'=' -f2)

    VALUE=${VALUE%\"}
    VALUE=${VALUE#\"}
    VALUE=${VALUE%\'}
    VALUE=${VALUE#\'}

    heroku config:set $KEY="${VALUE}"
  done < $SCRIPTPATH/../.env.production

else

  # if a .env.production doesnt exists, read the
  # .env file and ask to configure key by key
  while read line || [ -n "$line" ];
  do 
    KEY=$(echo $line | cut -d'=' -f1)

    if [$KEY != 'PORT']; then
      echo "Enter value for env key $KEY:"
      read VALUE </dev/tty
      heroku config:set $KEY="${VALUE}"
    fi
  done < $SCRIPTPATH/../.env

fi

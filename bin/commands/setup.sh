#!/bin/bash

BIN_DIR="$( cd "$( dirname $(dirname "${BASH_SOURCE[0]}" ))" >/dev/null && pwd )"/
BASE_DIR="$(dirname "${BIN_DIR}" )"/
CNF_DIR=${BASE_DIR}cnf/

DEFAULT_THEME=""
DEFAULT_THEME_LOCATION="/src/app/"
DEFAULT_PUBLIC_URL="http://httpd:80/"
DEFAULT_PUBLIC_PORT="9101"

source ${BIN_DIR}/config.sh

echo "Type the WordPress theme name. Leave it empty if you are not using WordPress."
read -p "Theme [${DEFAULT_THEME}]: " CNF_THEME
CNF_THEME=${CNF_THEME:-$DEFAULT_THEME}

echo "Type the location where the assets will be."
read -p "Assets location [${DEFAULT_THEME_LOCATION}]: " CNF_THEME_LOCATION
CNF_THEME_LOCATION=${CNF_THEME_LOCATION:-$DEFAULT_THEME_LOCATION}

echo "Type the web url used to access the http server."
read -p "Web url [${DEFAULT_PUBLIC_URL}]: " CNF_PUBLIC_URL
CNF_PUBLIC_URL=${CNF_PUBLIC_URL:-$DEFAULT_PUBLIC_URL}

echo "Type the web port used to access the http server."
read -p "Web port [${DEFAULT_PUBLIC_PORT}]: " CNF_PUBLIC_PORT
CNF_PUBLIC_PORT=${CNF_PUBLIC_PORT:-$DEFAULT_PUBLIC_PORT}

echo "Please confirm the typed values are correct:"
echo "Theme name: ${CNF_THEME}"
echo "Assets location: ${CNF_THEME_LOCATION}"
echo "Web url: ${CNF_PUBLIC_URL}"
echo "Web port: ${CNF_PUBLIC_PORT}"

PROCESS_CONFIRM="N"
while [[ "$PROCESS_CONFIRM" != "Y" ]]; do
	read -r -p "Are they correct? [Y/N]: " PROCESS_CONFIRM

	case "$PROCESS_CONFIRM" in
	    [yY][eE][sS]|[yY])
			PROCESS_CONFIRM="Y"
			;;
	    [nN][oO]|[nN])
			break
            ;;
	    *)
		echo "Please use Y to confirm or N to exit"
		;;
	esac
done

if [[ "$PROCESS_CONFIRM" != "Y" ]]; then
    echo "Process canceled!"
    exit 0
fi

cat << EOF > ${CNF_DIR}config.json
{
  "public_url": "${CNF_PUBLIC_URL}",
  "browsersync_port": ${CNF_PUBLIC_PORT},
  "theme_name": "${CNF_THEME}",
  "theme_location": "${CNF_THEME_LOCATION}"
}
EOF

echo "File ${CNF_DIR}config.json generated successfully!"

#!/bin/bash
set -e
function local_read_args() {
  while (( "$#" )); do
  opt="$1"
  case $opt in
    -h|-\?|--\?--help)
      PRINT_USAGE=1
      QUICKSTART_ARGS="$SCRIPT $1"
      break
    ;;
    -b|--branch)
      BRANCH="$2"
      QUICKSTART_ARGS+=" $1 $2"
      shift
    ;;
    -o|--override)
      QUICKSTART_ARGS=" $SCRIPT"
    ;;
    --skip-setup)
      SKIP_SETUP=true
    ;;
    --skip-pull)
      SKIP_PULL=true
    ;;
    *)
      QUICKSTART_ARGS+=" $1"
      #echo $1
    ;;
  esac
  shift
  done

  if [[ -z $BRANCH ]]; then
    echo "Usage: $0 -b/--branch <branch> [--skip-setup]"
    exit 1
  fi
}



BRANCH="master"
PRINT_USAGE=0
SKIP_SETUP=false
SKIP_PULL=false
ASSET_MODEL="-amkit kit-service/src/main/resources/asset-model/kit-asset-model-metadata.json kit-service/src/main/resources/asset-model/kit-asset-model.json"
SCRIPT="-script edge-starter.sh -script-readargs edge-starter-readargs.sh"
QUICKSTART_ARGS="-ba -uaa -asset -ts -cidd -dx $ASSET_MODEL -kitsvc -kitui $SCRIPT"
VERSION_JSON="version.json"
PREDIX_SCRIPTS=predix-scripts
REPO_NAME=kit-service
APP_NAME="Predix Kit Service"
SCRIPT_NAME="quickstart-kit-service.sh"
TOOLS="Cloud Foundry CLI, Git, Maven, Node.js, Predix CLI"
TOOLS_SWITCHES="--cf --git --maven --nodejs --predixcli"

local_read_args $@
IZON_SH="https://raw.githubusercontent.com/PredixDev/izon/$BRANCH/izon.sh"
VERSION_JSON_URL=https://raw.githubusercontent.com/PredixDev/$REPO_NAME/$BRANCH/version.json

function check_internet() {
  set +e
  echo ""
  echo "Checking internet connection..."
  curl "http://google.com" > /dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo "Unable to connect to internet, make sure you are connected to a network and check your proxy settings if behind a corporate proxy"
    echo "If you are behind a corporate proxy, set the 'http_proxy' and 'https_proxy' environment variables."
    exit 1
  fi
  echo "OK"
  echo ""
  set -e
}

function init() {
  currentDir=$(pwd)
  echo $currentDir
  if [[ $currentDir == *"scripts" ]]; then
    echo 'Please launch the script from the root dir of the project'
    exit 1
  fi

  check_internet
  eval "$(curl -s -L $IZON_SH)"
  getVersionFile
  getLocalSetupFuncs

}

if [[ $PRINT_USAGE == 1 ]]; then
  init
  __print_out_standard_usage
else
  if $SKIP_SETUP; then
    init
  else
    init
    __standard_mac_initialization
  fi
fi

echo "getPredixScripts"
getPredixScripts
echo "gotPredixScripts"
#clone the repo itself if running from oneclick script
getCurrentRepo

echo "quickstart_args=$QUICKSTART_ARGS"
source $PREDIX_SCRIPTS/bash/quickstart.sh $QUICKSTART_ARGS


__append_new_line_log "Successfully completed $APP_NAME installation!" "$quickstartLogDir"

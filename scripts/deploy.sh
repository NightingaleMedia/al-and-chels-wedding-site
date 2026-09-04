#!/usr/bin/env bash
# Build the site and deploy it to its Cloud Run service.
#
#   scripts/deploy.sh dev    -> wedding-site-dev, env from .env.development
#   scripts/deploy.sh prod   -> wedding-site,     env from .env.production
#
# The env files are gitignored; each holds plain KEY=VALUE lines (no quotes,
# no `export`). Everything in them is set as a Cloud Run runtime env var.
set -euo pipefail

cd "$(dirname "$0")/.."

case "${1:-}" in
  dev)  SERVICE=wedding-site-dev; ENV_FILE=.env.development ;;
  prod) SERVICE=wedding-site;     ENV_FILE=.env.production ;;
  *) echo "Usage: scripts/deploy.sh dev|prod" >&2; exit 1 ;;
esac

PROJECT=al-and-chels
REGION=us-central1
IMAGE="gcr.io/$PROJECT/$SERVICE"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE — create it before deploying $SERVICE." >&2
  exit 1
fi

# "^@^" tells gcloud to split on @ instead of comma, so values may contain commas.
ENV_VARS="^@^$(grep -v '^[[:space:]]*#' "$ENV_FILE" | grep -v '^[[:space:]]*$' | paste -sd '@' -)"

docker build --platform linux/amd64 -t "$IMAGE" .
docker push "$IMAGE"

gcloud run deploy "$SERVICE" \
  --image "$IMAGE" \
  --project "$PROJECT" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "$ENV_VARS"

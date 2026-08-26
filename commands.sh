docker build --platform linux/amd64 -t gcr.io/al-and-chels/wedding-site .
docker push gcr.io/al-and-chels/wedding-site
gcloud run deploy wedding-site \
  --image gcr.io/al-and-chels/wedding-site \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
# Objective

Take the curl requests below and generate zod and typescript interfaces corresponding to the rsvp API created in spec 1.

## Search Wedding Party By Guest:

curl --location 'localhost:8080/info/party-by-guest/search' \
--header 'Content-Type: application/json' \
--data '{
"searchQuery": "Jon Sheehanss"
}'

## Get Party By UUID:

curl --location 'localhost:8080/info/party-by-guest/bride--jon-sheehan'

## Get Party by Party ID:

curl --location 'localhost:8080/info/party/slater-johnson-party'

## Submit RSVP:

curl --location 'localhost:8080/rsvp' \
--header 'Content-Type: application/json' \
--data '{
"partyId": "aviles-noteman-party",
"rsvps": [
{
"guestId": "groom--max-slater",
"isAttending": true,
"mealChoice": "chicken"
}
]
}'

# Notes:

Do not worry about security or PII, this information is placeholder and will be deleted. Make your best guess to where these interfaces align. Also update the placeholder endpoints now that you have the api routes from these curls.

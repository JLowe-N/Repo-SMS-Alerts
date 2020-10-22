# Repo SMS Alerts with Cloudflare Worker

This application sets up a Cloudflare Worker that will receive POST requests 
from GitHub Webhooks when a change is made to the targeted Repo.  The Cloudflare worker
will then send a request to the Twilio endpoint which will send an SMS alert to
the specified number.

This application is based on the Cloudflare Workers tutorial at:
https://developers.cloudflare.com/workers/tutorials/github-sms-notifications-using-twilio

## Installation

1. Set up a GitHub Webhook for the Repo you wish to monitor.
2. Set up a Cloudflare Workers account and update the wrangler.toml with your account id.
3. Login with the Wrangler CLI using 'wrangler login'.
4. Set up a Twilio account.
5. Update secret environment variables:
    - ACCOUNT_SID: Twilio Account SID
    - RECIPIENT: Number to send SMS repo update alerts to.
    - AUTH_TOKEN: Twilio Auth Token
    - SECRET_TOKEN: GitHub Repo Webhook Secret Token you set.
    These values can be updated with the Wranger CLI using 'wrangler secret put <VARIABLE_NAME>
6.  Finally, publish the worker to your Cloudflare Workers account using 'wrangler publish'

Depending on the webhook you set up, you will now receive SMS alerts when your target repo is updated.


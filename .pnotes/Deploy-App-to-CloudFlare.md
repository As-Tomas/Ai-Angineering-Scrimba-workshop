## Create a Worker
npm create cloudflare@latest


├ Do you want to deploy your application?
crashes probably because of dublicated names
so need to manualy register at ClouFlare > Workers & Pages with neme we used

after that run: 
## Deploy a Worker
npx wrangler deploy

Cloudflare Workers
https://developers.cloudflare.com/workers/
A whole new Quick Edit in Cloudflare Workers
https://blog.cloudflare.com/improved-quick-edit

## Install OpenAI in your Worker project
npm install openai
https://developers.cloudflare.com/ai-gateway/tutorials/deploy-aig-worker/#3-configure-openai-in-your-worker

## Save API key to your Workers environment
npx wrangler secret put OPENAI_API_KEY  

## Deploy the latest Worker changes
npx wrangler deploy 

Cross-Origin Resource Sharing (CORS)
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
Preflight request
https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
OPTIONS
https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS

## AI Gateway for rate limiting ets...
in CloudFlare AI > AI Gateway > create new, chose platform, copy link
need remove id from stock data to have chashed, because it is every timi diferent
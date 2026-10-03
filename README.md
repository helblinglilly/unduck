# Unduck

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.

```
https://unduck.link?q=%s
```

## How is it that much faster?

DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages.

I solved this by doing all of the work client side. Once you've went to https://unduck.link once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.

## Deployment

The app is deployed as a Cloudflare Worker that serves the Vite build output. Its configuration is in [`wrangler.jsonc`](./wrangler.jsonc).

### One-time Cloudflare and GitHub setup

1. Create a Cloudflare API token with **Edit** permission for **Workers Scripts** in the account that will host the app.
2. In the GitHub repository, create these Actions secrets under **Settings → Secrets and variables → Actions**:
   - `CLOUDFLARE_API_TOKEN`: the API token created above.
   - `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID from the Workers dashboard URL or account overview.
3. Push to `main`. The [`Deploy to Cloudflare`](./.github/workflows/deploy.yml) workflow builds and deploys the site automatically. It can also be run manually from the GitHub Actions tab.
4. In Cloudflare Workers, attach the desired custom domain (for example, `unduck.link`) to the `unduck` Worker after its first deployment.

For a local production deployment after authenticating with Cloudflare, run:

```sh
npm run deploy
```

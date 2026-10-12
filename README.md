# Shadowbanned site

Static website. No install. No account required to look at it.

## Open it
Unzip this folder. Double-click `index.html`.

Pages:
- index.html — home
- shop.html — products and add-to-bag
- cart.html — demo bag saved in the browser
- about.html
- contact.html — opens an email draft

## Change the obvious stuff
- Prices and names live in `shop.html` (`data-name`, `data-price` is cents: 4800 = $48).
- Email address is `hello@shadowbanned.xyz` in `contact.html` and `app.js`.
- Copy is placeholder. Replace it with your real story before you sell.

## Put it on the internet
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. Netlify gives you a live link in about a minute.
4. Later, buy a domain (Namecheap or Cloudflare) and point it at that site.

Checkout is not connected. When you are ready to take money, the simple path is Shopify for the shop and this design as the look, or Square / Stripe payment links on each product.

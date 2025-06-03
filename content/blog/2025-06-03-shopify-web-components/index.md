---
date: "2025-06-03T11:15:00"
title: "Shopify web components"
---

As mentioned [previously](/blog/composable-web-components), composable web components are the future.

Shopify [recently announced](https://shopify.dev/docs/api/storefront-web-components) their Storefront web components, allowing easy embedding of Shopify-hosted products into external pages. And because they're web components, they're framework agnostic and require zero changes to your build system. Import their JS, wrap your markup in `<shopify-store>` and `<shopify-content>` tags, then include the parts of content you want (`<shopify-media>` for images, `<shopify-data>` for title/etc), styled how you want. Data loading is handled for you and non-trivial UX (e.g. a modal) is possible.

And now that custom elements are [supported by every major framework (even React!)](https://custom-elements-everywhere.com/), interop is a breeze.

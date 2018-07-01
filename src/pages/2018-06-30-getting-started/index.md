---
path: "/defining-page-titles-react-router"
date: "2016-08-29T13:31:49"
title: "Defining page titles in react-router route config"
---

I’ve been using [react-helmet](https://github.com/nfl/react-helmet) to set page titles in [Nomos](http://nomos.us), but it’s felt weird to me to litter my JSX templates with <Helmet> tags. Thinking it would be cleaner (and would allow me to re-use titles, e.g. for breadcrumbs) if I pulled the page titles into the route config, [I created a higher-order component that I now just wrap my container components in](https://gist.github.com/0bb5f5e88718944f514b99c064be64b1).

I use this by defining a `title` on my route’s config, which can be either a string or a function (which receives the component’s props as an argument). Something like:

```jsx
<Route
  path='/documents/:documentId'
  component={DocumentContainer}
  title={props => props.documentName}
/>
```

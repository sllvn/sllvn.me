---
date: "2023-11-26T13:22:00"
title: "Composable custom elements"
---

I've been enjoying the resurgent buzz around web components (specifically custom elements). The idea *du jour* seems to be "HTML Web Components", ie, treating components as another form of progressive enhancement: wrap your normal content with a custom element, so that the normal content gets enhanced with the web component's behavior. E.g. something like:

```html
<my-player>
  <audio src="podcast.mp3" />
</my-player>
```

But what about wrapping other elements? Guy at 11ty has created an `<is-land>` component with this idea in mind (it handles boring-but-necessary stuff like loading and rendering). I'm thinking more like configurators to control the behavior of nested components.

<script type='text/javascript' src='./script.js'></script>
<style>
  svg {
    border: 1px solid var(--primary);
    max-width: 500px;
    max-height: 500px;
  }
</style>

Here we have an ordinary Game of Life component (written largely by Copilot):

```html
<game-of-life />
```

<game-of-life />

Now if we allow passing rules in as properties, we can customize its behavior:

```html
<game-of-life size='50' speed='200' />
```

<game-of-life size='50' speed='200' />

Now let's create that wrapper component and let *it* set those rules:

```html
<game-config>
  <label>Speed <input type='range' min='50' max='1000' value='100' /></label>
  <label>Size <input type='range' min='10' max='100' value='50' /></label>

  <game-of-life size='50' speed='100' />
</game-config>
```

<game-config>
  <label>Speed <input type='range' min='50' max='1000' value='100' /></label>
  <label>Size <input type='range' min='10' max='100' value='50' /></label>

  <game-of-life size='50' speed='100' />
</game-config>

Component full source can be found at <a href='./script.js'>script.js</a>
---
date: "2023-11-26T13:22:00"
title: "Composable web components"
---

I've been enjoying the resurgent buzz around web components (specifically custom elements). The idea *du jour* seems to be "HTML Web Components", ie, treating components as another form of progressive enhancement: wrap your normal content with a custom element, so that the normal content gets enhanced with the web component's behavior. E.g. something like:

```html
<my-player>
  <audio src="podcast.mp3" />
</my-player>
```

But what about wrapping other elements? If the idea is progressive enhancement, why not enhance your other custom elements? [Zach](https://github.com/zachleat) at 11ty [created an `<is-land>` component](https://is-land.11ty.dev/) with this idea in mind (it handles boring-but-necessary stuff like loading and rendering). I'm thinking something more like configurators to control the behavior of nested components.

<script type='text/javascript' src='./script.js'></script>
<style>
  svg {
    border: 1px solid var(--primary);
    max-width: 500px;
    max-height: 500px;
  }
</style>

Here we have an ordinary Game of Life component (written largely by Copilot). It accepts a couple attributes to control its behavior.

```html
<game-of-life size='25' speed='100' />
```

<game-of-life size='25' speed='100' />

Now let's create that wrapper component and let *it* set those rules:

```html
<game-config>
  <label>Speed <input name='speed' type='range' min='50' max='1000' value='100' /></label>
  <label>Size <input name='size' type='range' min='10' max='100' value='50' /></label>

  <game-of-life data-configurable />
</game-config>
```

<game-config>
  <label>Speed <input name='speed' type='range' min='50' max='1000' value='100' /></label>
  <label>Size <input name='size' type='range' min='10' max='100' value='50' /></label>

  <game-of-life data-configurable />
</game-config>

By making `game-of-life` responsive to changes passed down by `game-config` (a la [React context](https://react.dev/learn/passing-data-deeply-with-context)), it's much more re-usable. Consumers can use sliders, numeric inputs, and other custom elements to set speed+size and `game-of-life` reacts appropriately.

Component full source can be found at <a href='./script.js'>script.js</a>

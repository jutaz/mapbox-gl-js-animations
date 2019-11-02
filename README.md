# mapbox-gl-js-animations

Adds animation capabilities to Mapbox GL JS maps! By extending the [style spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/) with [`animejs`](https://github.com/juliangarnier/anime/) some level of animation is possible.

:warning: This package & spec aren't stable just yet - use at your own risk.

## Usage

Install the library via:
```sh
npm i mapbox-gl-js-animations
```

Add animation metadata in style spec:
```js
{
  // ... Other props.
  "layers": [
    {
      "id": "layer-1",
      "source": "your-source",
      "metadata": {
        "animations": [
          {
            "rules": {
              "opacity": 0,
              "duration": 1500,
              "loop": true,
              "easing": "easeInOutQuart"
            },
            "variables": {
              "opacity": 0.9
            },
            "paint": {
              "circle-opacity": ["var", "opacity"]
            }
          }
        ]
      },
      "paint": {
        "circle-radius": 30,
        "circle-color": "red"
      }
    }
  ]
}
```

Add to the map:
```js
import animations from 'mapbox-gl-js-animations';

// ... Create Mapbox map

animations.addToMap(map);
```

That's it!

## Goal

Trying to blend into Mapbox's ecosystem of the style spec and its expressions to create "native-feeling" for the animations, which should blend in nicely into native expressions. As of a result, this project will be limited by the capabilities of the expressions in the style spec.

## TODO

- [ ] Support feature states for _when_ the animation should trigger.
- [ ] Document the spec better.
- [ ] More examples.
- [ ] Add API outside of the style spec.

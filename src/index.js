import anime from 'animejs/lib/anime.es.js';

function runAnimation (map) {
  const animations = [];

  map.getStyle().layers.forEach((layer) => {
    if (!layer.metadata || !Array.isArray(layer.metadata.animations)) {
      return;
    }

    layer.metadata.animations.forEach(({rules, variables, paint}) => {
      const vars = {...variables};
      const paintEntries = Object.entries(paint);
      const varKeys = Object.keys(vars);

      const varDefs = (expression) => {
        const def = [];
        let ref = def;

        if (varKeys.length === 0) {
          return expression;
        }

        for (var i = 0; i < varKeys.length; i++) {
          varKeys[i]

          if (def.length === 0) {
            ref.push('let', varKeys[i], ['literal', vars[varKeys[i]]]);
            continue;
          }

          const expr = ['let', varKeys[i], ['literal', vars[varKeys[i]]]];

          ref.push(expr);

          ref = expr;
        }

        ref.push(expression)

        return def;
      }

      animations.push({
        anime: anime({
          targets: vars,
          ...vars,
          ...rules,
          autoplay: false,
          update: () => {
            for (var i = 0; i < paintEntries.length; i++) {
              const [prop, expression] = paintEntries[i];
              map.setPaintProperty(layer.id, prop, varDefs(expression), {
                validate: false
              });
            }
          }
        })
      })
    })
  });

  let currentTask;

  function loop () {
    const t = performance.now();
    for (var i = 0; i < animations.length; i++) {
      animations[i].anime.tick(t);
    }
    currentTask = map._renderTaskQueue.add(loop);
  }

  currentTask = map._renderTaskQueue.add(loop);

  map.on('webglcontextlost', () => map._renderTaskQueue.remove(currentTask))
  map.on('webglcontextrestored', () => currentTask = map._renderTaskQueue.add(loop))
}

function addToMap (map) {
  if (map.loaded()) {
    return runAnimation(map);
  }

  map.on('load', () => runAnimation(map))
}

export default {addToMap}
export {addToMap}

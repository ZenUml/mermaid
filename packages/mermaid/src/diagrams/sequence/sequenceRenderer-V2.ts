// @ts-nocheck TODO: fix file
import { select } from 'd3';
import * as configApi from '../../config';
import { VueSequence } from 'vue-sequence';

const { Vue, Vuex } = VueSequence;

/**
 * Draws a sequenceDiagram in the tag with id: id based on the graph definition in text.
 *
 * @param {any} _text The text of the diagram
 * @param {any} id The id of the diagram which will be used as a DOM element id¨
 * @param {any} _version Mermaid version from package.json
 */
export const draw = function (_text: string, id: string) {
  const { securityLevel } = configApi.getConfig();
  // Handle root and Document for when rendering in sanbox mode
  let sandboxElement;
  if (securityLevel === 'sandbox') {
    sandboxElement = select('#i' + id);
  }

  const root =
    securityLevel === 'sandbox'
      ? select(sandboxElement.nodes()[0].contentDocument.body)
      : select('body');

  const diagram =
    securityLevel === 'sandbox' ? root.select(`[id="${id}"]`) : select(`[id="${id}"]`);

  Vue.use(Vuex);
  const store = new Vuex.Store(VueSequence.Store());
  store.dispatch('updateCode', { code: _text });
  new Vue({
    el: diagram._groups[0][0].parentNode,
    store,
    render: (h) => h(VueSequence.DiagramFrame),
  });
};

export default {
  draw,
};

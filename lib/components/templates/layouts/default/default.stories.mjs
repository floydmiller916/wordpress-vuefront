import VfTLayoutDefault from "./default.vue.mjs"; // More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export

export default {
  title: "template/layout/default",
  component: VfTLayoutDefault,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {}
}; // More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    VfTLayoutDefault
  },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      args
    };
  },

  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<vf-t-layout-default v-bind="args">
    <div class="text-center">Page content</div>
  </vf-t-layout-default>`
});

export const Default = Template.bind({}); // More on args: https://storybook.js.org/docs/vue/writing-stories/args

Default.args = {};
//# sourceMappingURL=default.stories.mjs.map
<template>
  <div class="vf-m-product-quantity" :class="`--${size}`">
    <vf-m-input-group>
      <vf-a-button
        class="vf-m-product-quantity__descrease"
        size="md"
        color="light"
        @click="handleChange('discrease')"
        ><vf-a-icon :size="20" :icon="mdiMinus"
      /></vf-a-button>
      <vf-a-input
        :value="quantity"
        class="vf-m-product-quantity__input"
        @input="handleChange"
      ></vf-a-input>
      <vf-a-button
        class="vf-m-product-quantity__increase"
        size="md"
        color="light"
        @click="handleChange('increase')"
        ><vf-a-icon :size="20" :icon="mdiPlus"
      /></vf-a-button>
    </vf-m-input-group>
  </div>
</template>
<script lang="ts" setup>
import { mdiPlus, mdiMinus } from "@mdi/js";
const props = defineProps({
  size: {
    type: String,
    default() {
      return "md";
    },
  },
  quantity: {
    type: Number,
    default() {
      return 1;
    },
  },
});
const emits = defineEmits(["change"]);
const handleChange = (event: string) => {
  if (event === "increase") {
    emits("change", props.quantity + 1);
  } else if (props.quantity > 1) {
    emits("change", props.quantity - 1);
  }
};
</script>

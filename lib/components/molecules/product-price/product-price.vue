<template>
  <vf-a-heading
    :level="variant === 'normal' ? 1 : 6"
    class="vf-m-product-price"
    :class="`--${variant}`"
  >
    <span v-if="special !== ''" class="vf-m-product-price__special">{{
      special
    }}</span>
    <vf-a-heading
      v-if="special !== ''"
      tag="span"
      :level="6"
      class="font-normal vf-m-product-price__oldprice"
      >{{ price }}</vf-a-heading
    >
    <span v-else class="vf-m-product-price__price">{{ price }}</span>
  </vf-a-heading>
</template>
<script setup lang="ts">
defineProps({
  price: {
    type: String,
    default() {
      return "";
    },
  },
  special: {
    type: String,
    default() {
      return "";
    },
  },
  variant: {
    type: String,
    default() {
      return "normal";
    },
  },
});
</script>

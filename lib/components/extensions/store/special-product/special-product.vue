<template>
  <vf-o-apollo class="vf-e-store-special-product">
    <template #loader>
      <span>
        <vf-l-o-product-module
          :column="column"
          :variables="{ size: $vuefront.options.productGridSize }"
        />
      </span>
    </template>
    <template #default="{ data }">
      <span>
        <vf-o-product-module
          :items="data.specialProducts.content"
          :column="column"
          >{{
            $t("modules.store.specialProduct.textTitle")
          }}</vf-o-product-module
        >
      </span>
    </template>
  </vf-o-apollo>
</template>
<script setup lang="ts">
defineProps({
  column: {
    type: Boolean,
    default: false,
  },
});
</script>
<graphql>
query($size: Int){
    specialProducts: productsList(page: 1, size: $size, special: true, sort: "date_added", order: "DESC") {
        content {
            id
            name
            shortDescription
            price
            special
            image
            imageLazy
            rating
            keyword
            url(url: "/store/product/_id")
            extra {
              name
              value
            }
            manufacturer {
              id
              name
              image
              imageLazy
              url(url: "/store/manufacturer/_id")
            }
        }
    }
}
</graphql>

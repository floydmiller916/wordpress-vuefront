<template>
  <vf-t-account-address-create :countries="countries" :zones="zones" />
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import useBreadcrumbs from "../../../../utils/breadcrumbs";
import { useRoute } from "vue-router";

const store = useStore();
const i18n = useI18n();
const { onLoad } = useBreadcrumbs();
const route = useRoute();

await store.dispatch("common/country/list", {
  page: 1,
  size: -1,
});

const countries = computed(() => store.getters["common/country/list"]);

const zones = computed(() => store.getters["common/zone/list"]);

onLoad([
  {
    title: i18n.t("pages.account.addressCreate.breadcrumbTitle"),
    to: route.path,
  },
]);
</script>

<template>
  <vf-t-account-register />
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import useBreadcrumbs from "../../../../utils/breadcrumbs";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const { onLoad } = useBreadcrumbs();
const i18n = useI18n();
const route = useRoute();
const router = useRouter();

if (store.getters["common/customer/auth"]) {
  router.push("/account");
}

onLoad([
  {
    title: i18n.t("pages.account.register.breadcrumbTitle"),
    to: route.path,
  },
]);
</script>

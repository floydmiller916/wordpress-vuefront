<template>
  <vf-o-form ref="review-form" @submit="onSubmit">
    <template #title>{{ $t("elements.common.reviews.writeText") }}</template>

    <vf-m-field
      id="input-name"
      :state="v$.author.$dirty ? !v$.author.$error : null"
    >
      <template #label>{{ $t("elements.common.reviews.nameEntry") }}</template>
      <template #default="data">
        <vf-a-input v-model="author" v-bind="data" trim />
      </template>
      <template #error>{{
        $t("elements.common.reviews.authorError")
      }}</template>
    </vf-m-field>

    <vf-m-field
      id="input-review"
      :state="v$.review.$dirty ? !v$.review.$error : null"
    >
      <template #label>{{
        $t("elements.common.reviews.reviewEntry")
      }}</template>
      <template #default="data">
        <vf-a-textarea v-model="review" v-bind="data" trim />
      </template>
      <template #error>{{
        $t("elements.common.reviews.reviewError")
      }}</template>
    </vf-m-field>
    <vf-m-field
      id="input-rating"
      :state="v$.rating.$dirty ? !v$.rating.$error : null"
    >
      <template #default="data">
        <vf-m-rating v-model="rating" v-bind="data" :size="18" />
      </template>
      <template #error>{{
        $t("elements.common.reviews.ratingError")
      }}</template>
    </vf-m-field>

    <template #button>{{ $t("elements.common.reviews.buttonSend") }}</template>
  </vf-o-form>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  required,
  minLength,
  minValue,
  maxLength,
  maxValue,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const emits = defineEmits(["submit"]);
const rating = ref(0);
const author = ref("");
const review = ref("");
const v$ = useVuelidate(
  {
    rating: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(5),
    },
    author: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(32),
    },
    review: {
      required,
      minLength: minLength(25),
      maxLength: maxLength(1000),
    },
  },
  { rating, author, review }
);

const onSubmit = () => {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    emits("submit", {
      content: review.value,
      author: author.value,
      rating: rating.value,
    });
    author.value = "";
    rating.value = 0;
    review.value = "";
    v$.value.$reset();
  }
};
</script>

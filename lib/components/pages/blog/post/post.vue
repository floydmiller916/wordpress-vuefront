<template>
  <vf-t-blog-post :post="post" />
</template>
<script setup lang="ts">
import { computed, inject } from "vue";
import { useMeta } from "vue-meta";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useBreadcrumbs from "../../../../utils/breadcrumbs";
import useQuery from "../../../../utils/query";
const route = useRoute();
const store = useStore();
const { meta } = useMeta({});
const { onLoad } = useBreadcrumbs();
const vuefront$ = inject<any>("$vuefront");
const { query } = useQuery();

const post = computed(() => store.getters["blog/post/get"]);

const handleLoadData = async () => {
  const { id } = vuefront$.params;
  await store.dispatch("apollo/query", {
    query,
    variables: { id },
  });
  const { post } = store.getters["apollo/get"];

  store.commit("blog/post/setPost", post);

  meta.title = post.meta.title;
  meta.description = post.meta.description;
  meta.keywords = post.meta.keyword;

  onLoad([
    {
      title: post.meta.title,
      to: route.path,
    },
  ]);
};

await handleLoadData();
</script>
<graphql>
query($id: String) {
  post(id: $id) {
    id
    name
    description
    image
    imageLazy
    datePublished
    rating
    meta {
      title
      description
      keyword
    }
    categories {
      id
      name
      url(url: "/blog/category/_id")
    }
    prev {
      id
      name
      image
      imageLazy
      shortDescription
      keyword
    }
    next {
      id
      name
      image
      imageLazy
      shortDescription
      keyword
    }
    reviews {
      totalElements
      content {
        author
        author_email
        content
        created_at
        rating
      }
    }
  }
}
</graphql>

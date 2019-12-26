<template lang="pug">
  section.index
    card(
      v-for="post in posts"
      :key="post.fields.slug"
      :title="post.fields.title"
      :slug="post.fields.slug"
      :headerImage="post.fields.headerImage"
      :publishedAt="post.fields.publishedAt")
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '~/components/card.vue';
import createClient from '~/plugins/contentful';

const client = createClient();

export default Vue.extend({
  components: { Card },
  async asyncData({ env }) {
    const entries = await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishedAt'
      })
      .then(entries => {
        return { posts: entries.items };
      })
      .catch(console.error);
    return entries;
  }
});
</script>

<style lang="stylus" scoped>
.index
  display flex
  flex-wrap wrap
</style>

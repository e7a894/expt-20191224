<template lang="pug">
  section.slug
    h1.slug_title {{ post.fields.title }}
    p.slug_date {{ (new Date(post.fields.publishedAt)).toLocaleDateString() }}
    img.slug_image(:src="post.fields.headerImage.fields.file.url")
    p {{ post.fields.body }}
</template>

<script lang="ts">
import Vue from 'vue';
import createClient from '~/plugins/contentful';

const client = createClient();

export default Vue.extend({
  transition: 'slide-left',
  async asyncData({ env, params }) {
    const post = await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug,
        order: '-sys.createdAt'
      })
      .then(entries => {
        return { post: entries.items[0] };
      })
      .catch(console.error);
    return post;
  }
});
</script>

<style lang="stylus" scoped>
.slug
  max-width 800px
  margin 0 auto

.slug_title
  font-size 2.0rem
  font-weight bolder

.slug_date
  font-size 1.0rem
  color rgb(57, 72, 85)
  text-align right
</style>

<template lang="pug">
  article.card
    nuxt-link.wrapper(:to="{ name: 'blog-slug', params: { slug: slug } }")
      img.card_image(:src="headerImage.fields.file.url")
      h1.card_title {{ title }}
      p.card_date {{ (new Date(publishedAt)).toLocaleDateString() }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
  props: {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    headerImage: { type: Object, required: true },
    publishedAt: { type: String, required: true }
  }
});
</script>

<style lang="stylus" scoped>
.card
  width 300px
  height 200px
  box-shadow 1px 2px 3px 1px rgba(0, 0, 0, 0.2)
  border 0.5px solid rgb(57, 72, 85)
  padding 10px 20px
  margin 10px 10px

.wrapper
  text-decoration none

.card_title
  font-size 1.2rem

.card_date
  font-size 0.7rem
  color rgb(57, 72, 85)
  text-align right

.card_image
  max-height 100px
</style>

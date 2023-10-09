<script>
export default {
  props: {
    examples: {
      type: Array,
      required: true
    },
  }
}
</script>

<template>
<h2 v-if="examples.length > 0">Examples</h2>
<ul v-if="examples.length > 0">
  <li v-for="example in examples">
    <code>{{ example.example }}</code> <div v-if="!example.image">⮕ "{{ example.returns }}"</div> 
    <img v-else :src="example.returns" />
  </li>
</ul>
</template>

<style scoped>
div {
  display: inline;
}

img {
  display: block;
}
</style>
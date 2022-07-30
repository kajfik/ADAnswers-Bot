<script>
export default {
  props: {
    aliases: {
      type: Array,
      required: false,
    },
  }
}
</script>

<template>
<h2 v-if="aliases.length > 0">Aliases</h2>
<ul v-if="aliases.length > 0">
  <li v-for="alias in aliases">{{ alias }}</li>
</ul>
</template>
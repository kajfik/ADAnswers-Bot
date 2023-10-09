<script>
import commands from "../../javascripts/commands.js";

export default {
  methods: {
    noCommandSelected() {
      return this.commandSelected === undefined;
    },
  }
}
</script>

<template>
<div v-if="noCommandSelected">Welcome to the ADAnswersBot commands page!</div>
</template>

<style scoped>

</style>
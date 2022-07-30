<script>
import CommandHeader from "./CommandHeader.vue"
import CommandDescription from "./CommandDescription.vue"
import CommandParameters from "./CommandParameters.vue";
import CommandUsage from "./CommandUsage.vue";
import CommandExamples from "./CommandExamples.vue";
import CommandAliases from "./CommandAliases.vue";

export default {
  components: {
    CommandDescription,
    CommandHeader,
    CommandParameters,
    CommandUsage,
    CommandExamples,
    CommandAliases
},
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    usage: {
      type: String,
      required: true
    },
    examples: {
      type: Array,
      required: false
    },
    aliases: {
      type: Array,
      required: false,
    },
    parameters: {
      type: Array,
      required: false,
    },
  },
}
</script>

<template>
<div class="command">
  <CommandHeader :name="name" />
  <CommandDescription :description="description" />
  <CommandParameters :parameters="parameters" />
  <CommandUsage :usage="usage" />
  <CommandExamples :examples="examples" />
  <CommandAliases :aliases="aliases" />
</div>
</template>

<style scoped>
div {
  display: inline;
}
</style>
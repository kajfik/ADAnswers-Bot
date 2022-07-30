<script>
export default {
  props: {
    parameters: {
      type: Array,
      required: true
    },
  },
  methods: {
    optionalLabel(param) {
      if (param.required) return "(required)";
      else return "(optional)";
    },
    optionalLabelClassObject(param) {
      return {
        "command-info-optional-label": true,
        "command-info-optional-label--required": param.required,
        "command-info-optional-label--optional": !param.required
      }
    }
  }
}
</script>

<template>
<h2 v-if="parameters.length > 0">Arguments/parameters</h2>
  <ul v-if="parameters.length > 0">
    <li v-for="param in parameters">
      <code>{{ param.name }}</code> - {{ param.description }} <div :class="optionalLabelClassObject(param)">{{ optionalLabel(param) }}</div>
      <ol v-if="param.choices" class="command-info-parameter-choices--wrapper">
      <h3 v-if="param.choices">Choices</h3>
        <li v-for="choice in param.choices" class="command-info-parameter-choices--choice">
          <code>{{ choice.name }}</code> - {{ choice.description }}
        </li>
      </ol>
    </li>
  </ul>
</template>

<style scoped>
.command-info-optional-label {
  display: inline;
  font-weight: bold;
}
.command-info-optional-label--required {
  color: rgb(196, 4, 4);
}

.command-info-optional-label--optional {
  color: rgb(0, 145, 7);
}

.command-info-parameter-choices--wrapper {
  display: inline;
  list-style-type: circle;
  padding-bottom: 0;
}

.command-info-parameter-choices--choice {
  margin-left: 2rem;
}

div {
  display: inline;
}
</style>
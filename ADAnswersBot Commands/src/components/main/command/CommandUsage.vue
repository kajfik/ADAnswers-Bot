<script>
export default {
  props: {
    usage: {
      type: String,
      required: true
    },
  }
}
</script>

<template>
<h2>Usage</h2>
<code>{{ usage }}</code>
</template>
<script>
export default {
  props: {
    description: {
      type: String,
      required: true
    },
  }
}
</script>

<template>
<h2>Description</h2>
<p>{{ description }}</p>
</template>
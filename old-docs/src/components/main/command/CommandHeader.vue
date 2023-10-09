<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
  }
}
</script>

<template>
<h1>{{ name }}</h1>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <a :href="link" target="_blank">
    {{ label }}
  </a>
</template>

<style scoped> 
a {
  display: flex;
  padding: 0.2rem 0.4rem 0.2rem;
  text-decoration: none;
  font-size: 1.2rem;
  text-align: center;
  align-content: center;
  justify-content: center;
  user-select: none;
  color: #818181;
  margin-top: auto;
  align-self: bottom;
}

a:hover {
  color: #f1f1f1;
  background-color: hsla(0, 0%, 38%, 0.2);
}

a {
  color: #818181;
}
</style>
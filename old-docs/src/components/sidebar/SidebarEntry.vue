<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
  },
  methods: {
    onClick() {
      selectedCommand = this.name;
    }
  }
}
</script>

<template>
  <a :href="'#' + name"
    @click="onClick"
  >{{ name }}</a>
</template>

<style scoped>
a {
  padding: 0.2rem 0.4rem 0.2rem;
  text-decoration: none;
  font-size: 1.2rem;
  color: #818181;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-content: center;
  justify-content: center;
  user-select: none;
}

a:hover {
  color: #f1f1f1;
  background-color: hsla(0, 0%, 38%, 0.2);
}
</style>
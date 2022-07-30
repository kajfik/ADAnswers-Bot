<script>
import SidebarEntry from "./SidebarEntry.vue";
import Commands from "../../javascripts/commands.js";

export default {
  components: {
    SidebarEntry,
  },
  props: {
    name: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    label() {
      return this.name;
    },
    contents() {
      return Commands.byPage[this.page];
    }
  },
  methods: {
    onClick() {
      this.show = !this.show;
    },
    indicatorClassObject() {
      return {
        "sidebar-indicator-arrow": true,
        "sidebar-indicator-arrow--flipped": !this.show,
      }
    },
  }
}
</script>

<template>
<div class="sidebar-group-header" @click="onClick">
  <div :class="indicatorClassObject()">▼</div> {{ label }} <div :class="indicatorClassObject()">▼</div>
</div>

<div class="sidebar-group-contents" v-if="show">
  <SidebarEntry
    v-for="command in contents"
    :name="command.name"
  />
</div>
</template>

<style scoped>
.sidebar-group-header {
  font-size: 1.1rem;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0.2rem 0.4rem 0.2rem;
  cursor: pointer;
  user-select: none;
}

.sidebar-group-header:hover {
  color: #f1f1f1;
  background-color: hsla(0, 0%, 38%, 0.2);
}

.sidebar-indicator-arrow {
  transform: rotate(180deg);
  transition: transform 0.33s ease-out;
}

.sidebar-indicator-arrow--flipped {
  transform: rotate(360deg);
}
</style>
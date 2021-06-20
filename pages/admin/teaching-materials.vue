<template>
  <div>
    <section class="tm" v-if="$route.name === 'admin-teaching-materials'">
      <ul class="tm__folders">
        <li class="tm__folder" v-for="folder in folders" :key="folder.name">
          <nuxt-link class="link" :to="`teaching-materials/${folder.link}`"
            >📁 {{ folder.name }}</nuxt-link
          >
        </li>
      </ul>
    </section>
    <nuxt-child v-else />
  </div>
</template>
<script>
export default {
  data() {
    return {
      folders: [
        { name: "Movies", link: "movies" },
        { name: "Abacus", link: "abacus" },
        { name: "Anzan", link: "anzan" },
        { name: "Fast reading", link: "fast-reading" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.tm__folders {
  list-style: none;
  font-size: 5rem;

  &:hover {
    cursor: pointer;
  }
}
</style>

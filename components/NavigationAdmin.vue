<template>
  <nav class="navigation">
    <ul class="navigation__ul">
      <li
        v-for="({ img, label, link, sub }, index) in navigation"
        :key="'link' + index"
      >
        <nuxt-link class="navigation__link" :to="localePath(`/admin/${link}`)">
          <img
            :src="require(`~/assets/images/${img.file}`)"
            :alt="img.alt"
            height="32"
          />
          {{ label }}
        </nuxt-link>
        <ul>
          <li v-for="(sublink, index) in sub" :key="'link' + index">
            <nuxt-link
              class="navigation__link"
              :to="localePath(`/admin/${sublink.link}`)"
            >
              {{ `-${sublink.label} ` }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      navigation: [
        {
          label: this.$t('general.students'),
          link: "users/",
          img: { file: "users.svg", alt: "users icon white" },
          sub: []
        },
        {
          label: this.$t("general.trainers"),
          link: "trainers/",
          img: { file: "trainers.svg", alt: "trainers icon white" },
          sub: []
        },
        {
          label: this.$t("general.lessons"),
          link: "lessons/",
          img: { file: "lessons.svg", alt: "lessons icon white" },
          sub: [
            { label: this.$t("general.demo_classes"), link: "demo/" },
            { label: this.$t("general.schedules"), link: "schedule/" }
          ]
        },
        {
          label: this.$t("general.presences"),
          link: "presences/",
          img: { file: "presences.svg", alt: "presences icon white" },
          sub: []
        },
        {
          label: this.$t('general.payments'),
          link: "payments/",
          img: { file: "payments.svg", alt: "payments icon white" },
          sub: []
        },
        {
          label: this.$t('general.teaching_materials'),
          link: "teaching-materials/",
          img: {
            file: "teaching_materials.svg",
            alt: "teaching materials icon white"
          },
          sub: []
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.navigation {
  padding: 2rem 2rem 2rem 0;
  font-size: 2rem;
  min-height: calc(100vh - 10rem);
  min-width: $navMenuWidth;
}
.navigation__ul {
  padding-left: 0;
}
.navigation ul {
  list-style: none;
}
.navigation ul li {
  padding: 1rem 0 0 0;
}
.navigation__link {
  align-items: center;
  color: $white;
  display: flex;
  text-decoration: none;
  transition: all 0.5s;
}
.navigation__link:hover {
  transform: scale(1.1);
}
</style>

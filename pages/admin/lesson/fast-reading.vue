<template>
  <div class="fast-reading">
    <div
      class="fast-reading__pdf-box"
      v-for="(pdf, index) in pdfs"
      :key="'pdf' + index"
    >
      <h2 class="fast-reading__title">
        {{ getNumberWithTrailingSpace(++index) }}
      </h2>
      <a
        class="fast-reading__link"
        :href="pdf.link"
        target="_blank"
        @click="sendMessage(index)"
        >{{ pdf.title }}</a
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pdfs: [
        {
          title: "Be happy",
          link: "http://localhost:41205/file/test.pdf"
        },
        {
          title: "Wake me up",
          link: "http://localhost:41205/file/test.pdf"
        },
        {
          title: "DOTA",
          link: "http://localhost:41205/file/test.pdf"
        },
        {
          title: "Sugar",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "YMCA",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "All Start",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "Livin' La Vida Loca",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "Juanes - La Camisa Negra",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "Party Rock Anthem",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "Coca Cola",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "Uptown Funk",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "Hips Don't Lie",
          link: "https://api.ngo.pl/media/get/108219"
        },
        {
          title: "They Don’t Care About Us",
          link: "https://api.ngo.pl/media/get/108219"
        }
      ]
    };
  },
  methods: {
    getNumberWithTrailingSpace(numberToAdd) {
      if (numberToAdd < 10) {
        return "0" + numberToAdd;
      }
      return numberToAdd;
    }
  }
};
</script>
<style lang="scss" scoped>
.fast-reading {
  display: flex;
  flex-wrap: wrap;
}
.fast-reading__pdf-box {
  align-items: center;
  display: flex;
  padding: 0.25rem;
  width: 33.333333%;
}
.fast-reading__title {
  text-align: center;
}
.fast-reading__link {
  background-color: $lightBlue;
  border-radius: $appRadius;
  color: $black;
  padding: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 2rem;
  text-decoration: none;
}
</style>

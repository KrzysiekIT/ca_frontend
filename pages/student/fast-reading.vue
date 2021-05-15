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
      <a class="fast-reading__link" :href="pdf.link">{{ pdf.title }}</a>
    </div>
  </div>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/user.js";
export default {
  mixins: [socket, user],
  created() {
    if (process.client) {
      this.sendResult("game", {
        studentId: this.user.id,
        game: "fast-reading",
        action: "lesson-choice"
      });
    }
  },
  data() {
    return {
      pdfs: [
        {
          title: "Be happy",
          link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs"
        },
        {
          title: "Wake me up",
          link: "https://www.youtube.com/watch?v=pIgZ7gMze7A"
        },
        {
          title: "DOTA",
          link: "https://www.youtube.com/watch?v=qTsaS1Tm-Ic"
        },
        {
          title: "Sugar",
          link: "https://www.youtube.com/watch?v=09R8_2nJtjg"
        },
        {
          title: "YMCA",
          link: "https://www.youtube.com/watch?v=CS9OO0S5w2k"
        },
        {
          title: "All Start",
          link: "https://www.youtube.com/watch?v=CS9OO0S5w2k"
        },
        {
          title: "Livin' La Vida Loca",
          link: "https://www.youtube.com/watch?v=p47fEXGabaY"
        },
        {
          title: "Juanes - La Camisa Negra",
          link: "https://www.youtube.com/watch?v=kRt2sRyup6A"
        },
        {
          title: "Party Rock Anthem",
          link: "https://www.youtube.com/watch?v=KQ6zr6kCPj8"
        },
        {
          title: "Coca Cola",
          link: "https://www.youtube.com/watch?v=gdjFeiiJaPI"
        },
        {
          title: "Uptown Funk",
          link: "https://www.youtube.com/watch?v=OPf0YbXqDm0"
        },
        {
          title: "Hips Don't Lie",
          link: "https://www.youtube.com/watch?v=DUT5rEU6pqM"
        },
        {
          title: "They Don’t Care About Us",
          link: "https://www.youtube.com/watch?v=QNJL6nfu__Q"
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

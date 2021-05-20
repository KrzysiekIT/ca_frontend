<template>
  <div class="movies">
    <div
      class="movies__movie-box"
      v-for="(video, index) in videos"
      :key="'video' + index"
      @mouseover="sendMessage(index)"
    >
      <h2 class="movies__title">{{ video.title }}</h2>
      <video-embed :src="video.link"></video-embed>
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
        game: "movies",
        action: "lesson-choice"
      });
    }
  },
  data() {
    return {
      lastIndex: -1,
      videos: [
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
    sendMessage(index) {
      if (index === this.lastIndex) {
        return;
      }
      this.lastIndex = index;
      this.sendResult("game", {
        studentId: this.user.id,
        game: "movies",
        action: "lesson-selected",
        file: this.videos[index]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.movies {
  display: flex;
  flex-wrap: wrap;
}
.movies__movie-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
}
.movies__title {
  max-width: 16rem;
  text-align: center;
}
</style>

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
      >
        {{ pdf[`description_${$i18n.locale}`] }}
      </a>
    </div>
  </div>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/user.js";
export default {
  mixins: [socket, user],
  async created() {
    if (process.client) {
      this.sendResult("game", {
        studentId: this.user.id,
        game: "fast-reading",
        action: "lesson-choice"
      });
      let filesResponse = await this.$store.dispatch("auth/request", {
        method: "get",
        url: `files/folder/4`
      });
      let files = filesResponse.data;
      files = files.map(file => {
        return {
          id: file.id,
          description_pl: file.description_pl,
          description_en: file.description_en,
          name: file.name,
          link: this.getLinkToFile(file.name)
        };
      });
      this.pdfs = files;
    }
  },
  data() {
    return {
      pdfs: []
    };
  },
  methods: {
    getLinkToFile(filename) {
      const apiUrl = process.env.API_URL;
      const fullUrl = `${apiUrl}/file/${filename}`;
      return fullUrl;
    },
    sendMessage(index) {
      this.sendResult("game", {
        studentId: this.user.id,
        game: "fast-reading",
        action: "lesson-selected",
        file: this.pdfs[index]
      });
    },
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

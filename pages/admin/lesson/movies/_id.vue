<template>
  <div class="fs">
    <div v-for="(file, index) in files" :key="file + index" class="fs__file">
      <nuxt-link
        class="link"
        :to="localePath(`/admin/lesson/movies/${file.id}`)"
        v-if="file.type === 'folder'"
      >
        {{ `📁  ${file.name}` }}
      </nuxt-link>
      <a
        v-else-if="file.type === 'file'"
        class="link"
        :href="`${apiUrl}/file/${file.name}`"
        target="openFile"
        @click="isFileOpen = true"
      >
        {{ `🔗 ${file.name}` }}
      </a>
      <a
        v-else-if="file.type === 'movie'"
        class="link"
        :href="file.link.replace('watch?v=', '/embed/')"
        target="openFile"
        @click="isFileOpen = true"
      >
        {{ `🎥 ${file.name}` }}
      </a>

      <button class="fs__remove" @click="prepareToRemove(file)">
        {{ $t("general.remove") }}
      </button>
    </div>
    <div class="fs__actions">
      <div class="fs__action">
        <label>
          {{ $t("general.folder_name") }}
          <input v-model="folderToAddName" />
        </label>
        <button @click="addFolder(folderToAddName)" class="fs__add">
          {{ $t("general.add_folder") }}
        </button>
      </div>
      <div class="fs__action">
        <div>
          <label>
            {{ $t("general.movie_name") }}
            <input v-model="newMovie.name" />
          </label>
          <label>
            <br />
            {{ $t("general.link") }}
            <input v-model="newMovie.link" />
          </label>
        </div>
        <button class="fs__add" @click="addMovie()">
          {{ $t("general.add_movie") }}
        </button>
      </div>
    </div>
    <app-modal
      v-show="isModalVisible"
      @close="closeModal"
      @ok="removeFile"
      @no="closeModal"
    >
      <template v-slot:header>
        {{ $t("general.approve_file_remove") }}
      </template>

      <template v-slot:body>
        <span
          v-html="
            `${$t('general.file_remove_question')} <strong>${
              fileToRemove.name
            }</strong>?`
          "
        />
      </template>
    </app-modal>
    <div class="file-opener" v-if="isFileOpen">
      <button class="file-close" @click="isFileOpen = false">X</button>
      <iframe name="openFile" class="openFile" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Movies",
  components: {
    AppModal: () => import("@/components/AppModal.vue"),
  },
  created() {
    const parentId = this.$route.params.id;
    this.currentParent = parentId ? +parentId : 0;
  },
  watch: {
    $route(to) {
      this.currentParent = to.params.id ? +to.params.id : 0;
    },
    currentParent: {
      handler(newValue) {
        if (newValue !== null && newValue !== undefined) {
          this.getFiles(newValue);
        }
        if(this.$route.params.id && !newValue) {
          this.currentParent = +this.$route.params.id
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      files: [],
      isFileOpen: false,
      currentParent: null,
      isModalVisible: false,
      folderToAddName: "",
      fileToAdd: null,
      fileToRemove: {
        id: "",
        name: "",
      },
      newFile: {
        name: "",
        file: null,
      },
      newMovie: {
        name: "",
        link: "",
      },
      apiUrl: process.env.API_URL,
    };
  },
  methods: {
    handleFileChange(evt) {
      this.newFile.file = evt.target.files[0];
    },
    closeModal() {
      this.isModalVisible = false;
    },
    prepareToRemove(file) {
      this.fileToRemove = file;
      this.isModalVisible = true;
    },
    async removeFile() {
      await this.$store.dispatch("auth/request", {
        method: "delete",
        url: `movies/${this.fileToRemove.id}`,
      });
      await this.getFiles(this.currentParent);
      this.isModalVisible = false;
    },

    async addFolder(name) {
      if (!name) {
        return;
      }
      const newData = {};
      if (this.currentParent !== 0) {
        newData.parent_id = this.currentParent;
      }
      newData.name = name;
      newData.type = "folder";

      await this.$store.dispatch("auth/request", {
        method: "post",
        url: `movies/`,
        data: { values: { ...newData } },
      });
      await this.getFiles(this.currentParent);
    },

    async addMovie() {
      if (!this.newMovie.name) {
        return;
      }
      if (!this.newMovie.link) {
        return;
      }
      const newData = {};
      if (this.currentParent !== 0) {
        newData.parent_id = this.currentParent;
      }
      newData.name = this.newMovie.name;
      newData.type = "movie";
      newData.link = this.newMovie.link;

      await this.$store.dispatch("auth/request", {
        method: "post",
        url: `movies/`,
        data: { values: { ...newData } },
      });
      await this.getFiles(this.currentParent);
    },

    async addFile() {
      if (!this.newFile.name) {
        return;
      }
      if (!this.newFile.file) {
        return;
      }
      const bodyFormData = new FormData();
      if (this.currentParent !== 0) {
        bodyFormData.append("parent_id", this.currentParent);
      }
      bodyFormData.append("name", this.newFile.name);
      bodyFormData.append("type", "file");
      bodyFormData.append("new_file", this.newFile.file);
      await this.$store.dispatch("auth/request", {
        method: "post",
        url: "movies/file",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await this.getFiles(this.currentParent);
    },
    async getFiles(id) {
      const files = await this.$store.dispatch("auth/request", {
        method: "get",
        url: `movies/${id}`,
      });
      this.files = files.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.fs {
  margin-bottom: 5rem;
  &__file {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 2.5rem;
    cursor: pointer;
    display: flex;
    padding: 0.25rem;
  }

  &__remove {
    margin-left: 6rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: $white;
    background-color: $red;

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(2px);
    }
  }

  &__actions {
    margin-top: 5rem;
    font-size: 2rem;
  }

  &__action {
    display: grid;
    grid-template-columns: 26rem 16rem;
    margin-bottom: 2rem;
  }

  &__add {
    font-size: 2rem;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    background-color: $green;
    align-self: center;
    padding: 1rem 2rem;

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(2px);
    }
  }
}
.file-opener {
  position: absolute;
  top: 10vh;
  left: 0;
  width: 100vw;
  height: 90vh;
  background-color: rgba($darkBackground, 0.8);
}
.openFile {
  position: absolute;
  top: 10vh;
  left: 4vw;
  width: 90vw;
  height: 75vh;
}
.file-close {
  cursor: pointer;
  position: absolute;
  left: 94vw;
  transform: translate(-100%, -100%);
  top: 10vh;
}
</style>
<template>
  <div>
    <section class="tm">
      <div class="movies__button-box">
        <label class="login--label">
          <span class="login--label__input">{{ $t("general.new_filename") }}:</span>
          <input class="login--input" v-model="newFile.name" />
        </label>
        <label class="login--label">
          <span class="login--label__input">{{ $t("general.file") }}:</span>
          <input
            class="login--input--file"
            type="file"
            @change="handleFileChange($event)"
          />
        </label>
        <label class="login--label">
          <span class="login--label__input">{{ $t("general.title_polish") }}:</span>
          <input class="login--input" v-model="newFile.description_pl" />
        </label>
        <label class="login--label">
          <span class="login--label__input">{{ $t("general.title_english") }}:</span>
          <input class="login--input" v-model="newFile.description_en" />
        </label>
        <div class="movies__add-button-box">
          <button class="add__button add__button--default" @click="addFile">
            {{ $t("general.add_file") }}
          </button>
        </div>
      </div>
      <ul class="tm__files">
        <li class="tm__file" v-for="(file, index) in files" :key="file.id">
          <a
            class="link"
            :href="`http://localhost:41205/file/${file.name}`"
            target="_blank"
            >🔗 {{ file[`description_${$i18n.locale}`] }}</a
          ><fa
            class="tm__icon"
            :title="$t('general.remove')"
            icon="minus-circle"
            @click="remove(index)"
          />
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  async created() {
    let filesResponse = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `files/folder/${this.$route.params.id}`
    });
    let files = filesResponse.data;
    files = files.map(file => {
      return {
        id: file.id,
        description_pl: file.description_pl,
        description_en: file.description_en,
        name: file.name
      };
    });
    this.files = files;
  },
  data() {
    return {
      newFile: {
        description_pl: "",
        description_en: "",
        name: "",
        file: null
      },
      files: []
    };
  },
  methods: {
    handleFileChange(evt) {
      this.newFile.file = evt.target.files[0];
      console.log(this.newFile.file)
    },
    async addFile() {
      const bodyFormData = new FormData();
      bodyFormData.append("name", this.newFile.name);
      bodyFormData.append("description_pl", this.newFile.description_pl);
      bodyFormData.append("description_en", this.newFile.description_en);
      bodyFormData.append("folder_id", +this.$route.params.id);
      bodyFormData.append("new_file", this.newFile.file);
      let newFile = await this.$store.dispatch("auth/request", {
        method: "post",
        url: "files",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" }
      });
      newFile = newFile.data[1][0];
      this.files.push(newFile);
      this.newFile = {
        description_pl: "",
        description_en: "",
        name: "",
        file: null
      };
    },
    async remove(index) {
      await this.$store.dispatch("auth/request", {
        method: "delete",
        url: `files/${this.files[index].id}`
      });
      this.files.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.tm__files {
  list-style: none;
  font-size: 3rem;
}
.tm__icon {
  margin-left: 5rem;
  cursor: pointer;
  color: $red;
  transform: scale(0.5);
}
.movies {
  display: flex;
  flex-wrap: wrap;
}
.movies__button-box {
  width: 100%;
  padding-left: 2rem;
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
.add__button {
  border: none;
  border-radius: $appRadius;
  color: $white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
  min-width: 8rem;
  outline: none;
  padding: 0.625rem;
}
.add__button:active {
  transform: scale(0.95);
}
.add__button--default {
  background-color: $resultNeutralBlue;
}
.add__button--default:hover {
  background-color: darken($resultNeutralBlue, 15%);
}
.movies__input {
  display: block;
  width: 100%;
}
.movies__add-button-box {
  display: flex;
  width: 26rem;
  justify-content: flex-end;
}
.login--label {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  width: 26rem;
  font-size: 1rem;
  padding-bottom: 0.25rem;
}
.login--input {
  border: none;
  border-radius: $appRadius;
  display: block;
  font-size: 1rem;
  padding: 0.1rem;
  padding-left: 0.25rem;
}
.login--input--file {
  border: none;
  border-radius: $appRadius;
  display: block;
  font-size: 1rem;
}
.login--select {
  border: none;
  border-radius: $appRadius;
  display: block;
  font-size: 1rem;
  padding: 0.1rem;
  width: 12rem;
  padding-left: 0.25rem;
}
.login--label__input {
  display: block;
}
.login--link {
  color: #3c69bd;
  font-size: 1.5rem;
  text-decoration: none;
}
input:focus {
  box-shadow: 0 0 0 0.125rem #d48a0b;
  outline: none;
}
</style>

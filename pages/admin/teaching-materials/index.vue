<template>
  <div>
    <section class="tm" v-if="$route.name === 'admin-teaching-materials'">
      <div class="movies__button-box">
        <label class="login--label">
          <span class="login--label__input">{{ $t("general.label") }}:</span>
          <input class="login--input" v-model="newFolder.label" />
        </label>
        <div class="movies__add-button-box">
          <button class="add__button add__button--default" @click="addFolder">
            {{ $t("general.add_folder") }}
          </button>
        </div>
      </div>
      <ul class="tm__folders">
        <li
          class="tm__folder"
          v-for="(folder, index) in folders"
          :key="folder.name"
        >
          <nuxt-link class="link" :to="`teaching-materials/${folder.link}`"
            >📁 {{ folder.label }}</nuxt-link
          ><fa
            class="tm__icon"
            :title="$t('general.remove')"
            icon="minus-circle"
            @click="remove(index)"
            v-if="folder.id !== 4"
          />
        </li>
      </ul>
    </section>
    <nuxt-child v-else />
  </div>
</template>
<script>
export default {
  async created() {
    let foldersResponse = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `folders`
    });
    let folders = foldersResponse.data;
    folders = folders.map(folder => {
      return {
        id: folder.id,
        label: folder.label,
        link: folder.id + ""
      };
    });
    folders.unshift({ label: "Movies", link: "movies" });
    this.folders = folders;
  },
  data() {
    return {
      newFolder: {
        label: ""
      },
      folders: []
    };
  },
  methods: {
    async addFolder() {
      let newFolder = await this.$store.dispatch("auth/request", {
        method: "post",
        url: "folders",
        data: {
          values: { ...this.newFolder }
        }
      });
      newFolder = newFolder.data[1][0];
      console.log({ ...newFolder, link: newFolder.id + "" });
      this.folders.push(newFolder);
      this.newFolder = {
        label: ""
      };
    },
    async remove(index) {
      await this.$store.dispatch("auth/request", {
        method: "delete",
        url: `folders/${this.folders[index].id}`
      });
      this.folders.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.tm__folders {
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

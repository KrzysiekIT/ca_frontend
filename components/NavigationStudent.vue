<template>
  <nav class="navigation">
    <ul class="navigation__first-ul">
      <li>
        <nuxt-link class="navigation__link" :to="localePath('/student')">
          <img
            src="~/assets/images/home.svg"
            alt="Home icon"
            class="navigation__image"
          />
          {{ $t("general.main_page") }}
        </nuxt-link>
        <ul>
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/account')"
            >
              <img
                src="~/assets/images/user_white.svg"
                alt="User icon white"
                class="navigation__image"
              />
              {{ $t("general.student_account") }}
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li>
        {{ $t("general.training") }}
        <ul>
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/abacus')"
            >
              <img
                src="~/assets/images/abacus.png"
                alt="Abacus icon"
                class="navigation__image"
              />
              {{ $t("general.abacus") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/anzan')"
            >
              <img
                src="~/assets/images/anzan.png"
                alt="Anzan icon"
                class="navigation__image"
              />
              {{ $t("general.anzan") }}
            </nuxt-link>
          </li>
          <!-- <li>
            <img
              src="~/assets/images/supermind.png"
              alt="Supermind icon"
            />
            {{ $t("general.supermind") }}
          </li> -->
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/supermemory')"
            >
              <img
                src="~/assets/images/supermemory.png"
                alt="Supermemory icon"
                class="navigation__image"
              />
              {{ $t("general.supermemory") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/fast-reading')"
            >
              <img
                src="~/assets/images/fast_reading.png"
                alt="Abacus icon"
                class="navigation__image"
              />
              {{ $t("general.fast_reading") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/movies')"
            >
              <img
                src="~/assets/images/movies.png"
                alt="Movies icon"
                class="navigation__image"
              />
              {{ $t("general.movies") }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
.navigation {
  padding: 2rem 2rem 2rem 0;
  font-size: 1.5rem;
  min-height: calc(100vh - 10rem);
  min-width: $navMenuWidth;
}
.navigation__first-ul {
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
.navigation__image {
  margin-right: 0.5rem;
  max-width: 10%;
}
</style>

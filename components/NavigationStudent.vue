<template>
  <nav class="navigation">
    <ul class="navigation__first-ul">
      <li>
        <img src="~/assets/images/home.svg" alt="Home icon" height="28" />
        Strona główna
        <ul>
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/account')"
            >
              <img
                src="~/assets/images/user_white.svg"
                alt="User icon white"
                height="32"
              />
              Konto ucznia
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li>
        Trening
        <ul>
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/abacus')"
            >
              <img
                src="~/assets/images/abacus.png"
                alt="Abacus icon"
                height="32"
              />
              Abacus
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
                height="32"
              />
              Anzan
            </nuxt-link>
          </li>
          <li>
            <img
              src="~/assets/images/supermind.png"
              alt="Supermind icon"
              height="32"
            />
            Gry Super Mind
          </li>
          <li>
            <img
              src="~/assets/images/supermemory.png"
              alt="Supermemory icon"
              height="32"
            />
            Super Pamięć
          </li>
          <li>
            <nuxt-link
              class="navigation__link"
              :to="localePath('/student/movies')"
            >
              <img
                src="~/assets/images/movies.png"
                alt="Movies icon"
                height="32"
              />
              Filmy
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
  font-size: 2rem;
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
  color: $white;
  display: inline-block;
  text-decoration: none;
  transition: all 0.5s;
}
.navigation__link:hover {
  transform: scale(1.1);
}
</style>

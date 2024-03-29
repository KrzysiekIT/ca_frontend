<template>
  <div class="account">
    <div class="account__header">
      <div>
        <span class="account__header-label">{{
          $t("general.lesson_day")
        }}</span>
        <strong class="account__header-label--inline">
          {{ `${group.lesson_hour}` }}
          {{ $t(`general.${days[group.lesson_day]}`) }}
        </strong>
      </div>
      <div>
        <span class="account__header-label">{{ $t("general.trainer") }}</span>
        <strong class="account__header-label--inline">{{
          `${trainer.name} ${trainer.surname}`
        }}</strong>
      </div>
      <div>
        <span class="account__header-label">{{ $t("general.contact") }}</span>
        <strong class="account__header-label--inline">{{
          trainer.phone_number
        }}</strong>
      </div>
    </div>
    <div class="account__box">
      <section class="account__box--inner payments">
        <nuxt-link
          :to="localePath(`/student/payments`)"
          class="link"
          :title="$t('general.show_payments_data')"
        >
          <img src="~/assets/images/money.svg" alt="Money icon" height="64"
        /></nuxt-link>
        <img src="~/assets/images/sad.svg" alt="Sad icon" height="64" />
        <div>
          <span class="payments__label">{{ $t("general.status") }}</span>
          <span class="payments__label-value payments__label-value--suspended">
            {{ $t(`general.${statuses[user.status]}`) }}
          </span>
        </div>
        <nuxt-link to="/student/terms" class="link payments__icon-label">
          <img
            src="~/assets/images/terms_of_use.svg"
            alt="User icon white"
            height="32"
          />
          <span class="payments__terms">{{ $t("general.terms_of_use") }}</span>
        </nuxt-link>
      </section>
      <section class="account__box--inner year">
        <ul class="year__ul">
          <li class="year__li">{{ $t("general.year") }} 1</li>
          <li class="year__li">{{ $t("general.year") }} 2</li>
        </ul>
      </section>
      <section class="account__box--inner attendance">
        <div class="attendance__header">
          <score-box
            :presences="{
              present: numberOfPresences,
              total: attendance.length
            }"
          />
          <div class="attendance__title">
            {{ $t("general.program_progress") }}
          </div>
        </div>
        <attendance-table :attendance="attendance" />
      </section>
    </div>
  </div>
</template>
<script>
import user from "~/mixins/user.js";
const days = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  0: "sunday"
};
const statuses = {
  0: "blocked",
  1: "active",
  2: "unactive"
};
export default {
  mixins: [user],
  async fetch() {
    const userId = this.$store.state.auth.user.id;
    const presences = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `presences/${userId}`
    });
    this.attendance = presences.data;

    const group = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `groups/${this.user.group_id}`
    });
    this.group = group.data[0];

    const trainer = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `trainers/${this.group.trainer_id}`
    });
    this.trainer = trainer.data[0];
  },
  computed: {
    numberOfPresences() {
      return this.attendance.filter(presence => presence.status === 2).length;
    }
  },
  data() {
    return {
      attendance: [],
      days,
      group: {},
      trainer: {},
      statuses
    };
  }
};
</script>
<style lang="scss" scoped>
$boxPadding: 0.5rem;
.account__header {
  display: flex;
  padding: $boxPadding;
  gap: 4rem;
}
.account__header-label {
  color: #00b0f0;
  padding-left: 1rem;
}
.account__header-label--inline {
  white-space: nowrap;
}
.payments {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
}
.payments__icon-label {
  align-items: center;
  justify-content: center;
  display: flex;
  padding: $boxPadding;
}
.payments__label-value {
  text-transform: uppercase;
}
.payments__label-value--active {
  color: #00cc00;
}
.payments__label-value--suspended {
  color: #ffff00;
}
.payments__terms {
  text-transform: uppercase;
}
.year__ul {
  list-style-type: none;
  padding: 0;
}
.year__li {
  text-transform: uppercase;
}
.year__li:not(:first-child) {
  padding: 0.75rem 0;
}
.account__box {
  display: flex;
}
.account__box--inner {
  padding: 1.5rem;
}
.attendance {
  flex: 1 1 auto;
}
.attendance__header {
  display: flex;
}
.attendance__score-box {
  display: flex;
}
.attendance__title {
  align-items: flex-end;
  display: flex;
  justify-content: center;
  width: 100%;
  text-transform: uppercase;
}
</style>

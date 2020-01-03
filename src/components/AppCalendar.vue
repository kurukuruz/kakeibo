<template>
  <div>
    <v-toolbar flat>
      <v-btn fab text
        @click="toggleType"
      >
        <v-icon v-if="isMonth">mdi-calendar</v-icon>
        <v-icon v-else>mdi-calendar-month</v-icon>
      </v-btn>
      <v-toolbar-title>{{focusYearMonth}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn fab text
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab text
        @click="gotoToday"
      >
        <v-icon>mdi-calendar-today</v-icon>
      </v-btn>
      <v-btn fab text
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-progress-linear
        :active="isLoading"
        indeterminate
        absolute
        bottom
      ></v-progress-linear>
    </v-toolbar>
    <v-calendar
      v-model="innerValue"
      ref="calendar"
      :type="type"
      interval-width="17"
      interval-height="0"
    >
      <template v-slot:day-label="{ date, day }">
        <AppCalendarDayLabel
          @click="focusOn(date)"
          :date="date"
          :avatar-color="dayColor(date)"
        />
      </template>

      <template v-slot:day-header="{ date, day }">
        <AppCalendarDayHeader :date="date"/>
      </template>
    </v-calendar>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, SetupContext, computed, watch, toRefs, reactive } from '@vue/composition-api';
import { useInnerValue, ValueProps } from '@/commons/inner-value';
import AppCalendarDayHeader from '@/components/AppCalendarDayHeader.vue';
import AppCalendarDayLabel from '@/components/AppCalendarDayLabel.vue';
import { typicalInjection, LoadingStoreKey } from '@/store';

type CalendarType = 'month' | 'day';

const today = new Date().toISOString().substring(0, 10);

export default createComponent({
  components: {
    AppCalendarDayHeader,
    AppCalendarDayLabel,
  },
  props: {
    value: {
      type: String,
      default: today,
    },
  },
  setup: (props: ValueProps<string>, context: SetupContext) => {
    const { innerValue } = useInnerValue(props, context);

    const focusYearMonth = computed(() => innerValue.value.substring(0, 7));

    function focusOn (date: string) { innerValue.value = date; }
    function gotoToday () { innerValue.value = today; }

    function dayColor (date: string): string {
      switch (date) {
        case innerValue.value: return 'accent';
        case today: return 'blue-grey lighten-4';
        default: return '';
      }
    }

    const { isLoading } = typicalInjection(LoadingStoreKey);

    const type = ref('month');
    const isMonth = computed(() => type.value === 'month');
    function toggleType () {
      if (type.value === 'month') {
        type.value = 'day';
      } else {
        type.value = 'month';
      }
    }

    return {
      innerValue,
      focusYearMonth,
      focusOn,
      gotoToday,
      dayColor,
      type,
      isMonth,
      toggleType,
      isLoading,
    };
  },
});
</script>

<style>
.payout {
  color: crimson;
}
.income {
  color: darkblue;
}
</style>

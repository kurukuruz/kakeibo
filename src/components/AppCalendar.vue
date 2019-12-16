<template>
  <div>
    <v-toolbar flat>
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

    </v-toolbar>
    <v-calendar
      v-model="innerValue"
      ref="calendar"
      type="month"
    >
      <template v-slot:day-label="{ date, day }">
        <div @click="focusOn(date)">
          <v-avatar
            :color="dayColor(date)"
            size="36"
          >{{day}}</v-avatar>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, SetupContext, computed, watch, toRefs, reactive } from '@vue/composition-api';
import { useInnerValue, ValueProps } from '@/commons/inner-value';

const today = new Date().toISOString().substring(0, 10);

export default createComponent({
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

    return {
      innerValue,
      focusYearMonth,
      focusOn,
      gotoToday,
      dayColor,
    };
  },
});
</script>

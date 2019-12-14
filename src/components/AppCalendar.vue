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
      v-model="focus"
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

const today = new Date().toISOString().substring(0, 10);

type Props = {
  value: string;
};

export default createComponent({
  props: {
    value: {
      type: String,
      default: today,
    },
  },
  setup: (props: Props, context: SetupContext) => {
    const focus = ref(props.value);

    watch(focus, (newDate: string) => { context.emit('input', newDate); });

    const focusYearMonth = computed(() => focus.value.substring(0, 7));

    const valueComputed = computed(() => props.value);
    watch(valueComputed, (newDate: string) => { focus.value = newDate; });
    function focusOn (date: string) { focus.value = date; }
    function gotoToday () { focus.value = today; }

    function dayColor (date: string): string {
      switch (date) {
        case focus.value: return 'accent';
        case today: return 'blue-grey lighten-4';
        default: return '';
      }
    }

    return {
      focus,
      focusYearMonth,
      focusOn,
      gotoToday,
      dayColor,
    };
  },
});
</script>

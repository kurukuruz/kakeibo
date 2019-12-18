<template>
  <v-container>
    <v-row dense>
      <v-col><v-btn block @click="shiftDown">BK</v-btn></v-col>
      <v-col><v-btn block @click="clear">C</v-btn></v-col>
      <v-col><v-btn block>CA</v-btn></v-col>
      <v-col><v-btn block @click="inputOperator('/')">/</v-btn></v-col>
    </v-row>
    <v-row dense>
      <v-col><v-btn x-large block @click="shiftAndAdd(7)">7</v-btn></v-col>
      <v-col><v-btn x-large block @click="shiftAndAdd(8)">8</v-btn></v-col>
      <v-col><v-btn x-large block @click="shiftAndAdd(9)">9</v-btn></v-col>
      <v-col><v-btn x-large block @click="inputOperator('*')">*</v-btn></v-col>
    </v-row>
    <v-row dense>
      <v-col><v-btn x-large block @click="shiftAndAdd(4)">4</v-btn></v-col>
      <v-col><v-btn x-large block @click="shiftAndAdd(5)">5</v-btn></v-col>
      <v-col><v-btn x-large block @click="shiftAndAdd(6)">6</v-btn></v-col>
      <v-col><v-btn x-large block @click="inputOperator('-')">-</v-btn></v-col>
    </v-row>
    <v-row dense>
      <v-col><v-btn x-large block @click="shiftAndAdd(1)">1</v-btn></v-col>
      <v-col><v-btn x-large block @click="shiftAndAdd(2)">2</v-btn></v-col>
      <v-col><v-btn x-large block @click="shiftAndAdd(3)">3</v-btn></v-col>
      <v-col><v-btn x-large block @click="inputOperator('+')">+</v-btn></v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6"><v-btn x-large block @click="shiftAndAdd(0)">0</v-btn></v-col>
      <v-col><v-btn x-large block @click="multiply100">00</v-btn></v-col>
      <v-col><v-btn x-large block @click="finalize">=</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent, ref, watch, SetupContext, computed, Ref } from '@vue/composition-api';
import { useInnerValue, ValueProps } from '@/commons/inner-value';

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Operator = '+' | '-' | '*' | '/';
enum LastInput { DIGIT, OPERATOR }

export default createComponent({
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  setup: (props: ValueProps<number>, context: SetupContext) => {
    let lastInput: LastInput = LastInput.DIGIT;
    const { innerValue } = useInnerValue(props, context);

    function shiftAndAdd (d: Digit): void {
      if (lastInput === LastInput.DIGIT) {
        innerValue.value = innerValue.value * 10 + d;
      } else {
        innerValue.value = d;
      }
      lastInput = LastInput.DIGIT;
    }
    function multiply100 (): void {
      innerValue.value *= 100;
    }
    function shiftDown (): void {
      innerValue.value = Math.floor(innerValue.value / 10);
    }
    function clear (): void {
      innerValue.value = 0;
    }

    let operator: Operator | null = null;
    let stackedValue = 0;

    function inputOperator (newOperator: Operator): void {
      flush();

      if (lastInput === LastInput.OPERATOR) {
        history.value = history.value.slice(0, -2);
      }
      history.value += ' ' + newOperator;

      operator = newOperator;
      lastInput = LastInput.OPERATOR;
    }
    function finalize (): void {
      flush();

      history.value = '';
      stackedValue = 0;
      operator = null;
      lastInput = LastInput.DIGIT;
    }

    function flush (): void {
      if (lastInput === LastInput.DIGIT) {
        if (operator) {
          stackedValue = calc(stackedValue, operator, innerValue.value);
        } else {
          stackedValue = innerValue.value;
        }
        history.value += ' ' + innerValue.value;
        innerValue.value = stackedValue;
      }
    }

    function calc (val1:number, o: Operator, val2: number): number {
      switch (o) {
        case '+': return val1 + val2;
        case '-': return val1 - val2;
        case '*': return val1 * val2;
        case '/': return Math.floor(val1 / val2);
      }
    }

    let history = ref('');
    watch(history, (newValue: string) => {
      context.emit('update:history', newValue);
    });

    return {
      shiftAndAdd,
      multiply100,
      shiftDown,
      clear,
      inputOperator,
      finalize,
    };
  },
});
</script>

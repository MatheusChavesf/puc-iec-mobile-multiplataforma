// __tests__/counterStore.test.ts
//
// Testes do Zustand counter store.

import { useCounterStore } from '../src/store/counterStore';

describe('counterStore', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  test('increment aumenta count em 1', () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  test('decrement diminui count em 1', () => {
    useCounterStore.setState({ count: 5 });
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(4);
  });

  test('decrement pode levar count a valores negativos', () => {
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(-1);
  });

  test('reset volta count para 0 após mutações', () => {
    const { increment, reset } = useCounterStore.getState();
    increment();
    increment();
    increment();
    expect(useCounterStore.getState().count).toBe(3);
    reset();
    expect(useCounterStore.getState().count).toBe(0);
  });

  test('100 increments seguidos resultam em count=100', () => {
    const { increment } = useCounterStore.getState();
    for (let i = 0; i < 100; i++) increment();
    expect(useCounterStore.getState().count).toBe(100);
  });
});

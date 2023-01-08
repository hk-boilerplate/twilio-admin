import { useEffect, useReducer } from "react";

import { AxiosError } from "axios";
import { useDeepCompareEffect } from "react-use";

// actions

export type StartAction = {
  type: "start";
};

export type FinishAction<T> = {
  type: "finish";
  value: T;
};

export type ErrorAction = {
  type: "error";
  error: any;
};

// dispatch types

export type DispatchTypes<T> = StartAction | FinishAction<T> | ErrorAction;

// async state

export type AsyncState<T> = {
  isLoading: boolean;
  result?: T;
  error?: any;
};

// async return

export type AsyncReturn<T> = [
  state: AsyncState<T>,
  run: () => Promise<void>,
  setState: (value: T) => void
];

// use async hook

export type UseAsyncProps<T> = {
  fn: () => Promise<T>;
};

export function useAsync<T>({ fn }: UseAsyncProps<T>): AsyncReturn<T> {
  const initialState = { isLoading: false, hasError: false, value: undefined };

  const stateReducer = (
    _state: AsyncState<T>,
    action: DispatchTypes<T>
  ): AsyncState<T> => {
    switch (action.type) {
      case "start":
        return { isLoading: true } as AsyncState<T>;
      case "finish":
        return { isLoading: false, result: action.value } as AsyncState<T>;
      case "error":
        return { isLoading: false, error: action.error } as AsyncState<T>;
      default:
        return { isLoading: true } as AsyncState<T>;
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const setState = (value: T) => {
    dispatch({ type: "finish", value });
  };

  const run = async () => {
    try {
      dispatch({ type: "start" });
      const value = await fn();
      dispatch({ type: "finish", value });
    } catch (error) {
      dispatch({
        type: "error",
        error: (error as AxiosError).response?.data as any,
      });
    }
  };

  return [{ ...state }, run, setState];
}

// use async effect params

export type UseAsyncEffectParams<T> = {
  fn: () => Promise<T>;
  dependencies: any[];
  useDeepCompare?: boolean;
};

// use async effect hook

export function useAsyncEffect<T>({
  fn,
  dependencies,
  useDeepCompare = false,
}: UseAsyncEffectParams<T>): AsyncReturn<T> {
  const [state, run, setState] = useAsync({ fn });

  if (useDeepCompare) {
    useDeepCompareEffect(() => {
      run();
    }, dependencies);
  } else {
    useEffect(() => {
      run();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
  }

  return [state, run, setState];
}

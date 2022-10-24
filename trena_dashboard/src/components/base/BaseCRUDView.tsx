import React from "react";

export abstract class BaseCRUDView<T, K> extends React.Component<T, K> {
  abstract isValid(): boolean;

  abstract onChange(value: K): void;

  handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState((previousState) => {
      let newState = { ...previousState, [name]: value } as unknown as Pick<
        K,
        keyof K
      >;
      this.onChange(newState);
      return newState;
    });
  };
}

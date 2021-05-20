import { BehaviorSubject, Observable } from "rxjs";

type SetStateCallback<T> = (currentState: T) => Partial<T>;

export class AppStore<StateType = any> {

  private state: BehaviorSubject<StateType>;

  constructor(initialState: StateType) {
    this.state = new BehaviorSubject<StateType>(initialState);
  }

  public getState(): Observable<StateType> {
    return (this.state.asObservable());
  }

  public getStateSnapshot(): StateType {
    return (this.state.getValue());
  }

  public setState(callback: SetStateCallback<StateType> | Partial<StateType>): void;
  public setState(updater: any): void {
    const currentState = this.getStateSnapshot();
    const partialState = (updater instanceof Function) ? updater(currentState) : updater;
    const nextState = { ...{}, ...currentState, ...partialState };
    this.state.next(nextState);
  }
}

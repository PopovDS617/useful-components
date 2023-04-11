export interface Person {
  id: number;
  name: string;
  age: number;
}

export interface ApiResponse {
  message: string;
  statusCode: number;
  data: Person[];
}

const initialPersonList: Person[] = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 24 },
  { id: 3, name: 'Judy', age: 23 },
];

export class Api {
  state: Person[];

  constructor(state: Person[]) {
    this.state = state;
  }

  mockResponse(): Promise<ApiResponse> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        return res({ message: 'success', statusCode: 200, data: this.state });
      }, 1000);
    });
  }

  mockAddNewPerson(id: number, name: string, age: number) {
    const newUser = { id: id, name: name, age: age };
    const state = [...this.state];
    const newState = [...state, newUser];
    this.state = newState;

    return new Promise((res, rej) => {
      setTimeout(() => {
        res({ message: 'success', statusCode: 200 });
      }, 300);
    });
  }

  mockEditPerson(id: number, name: string, age: number) {
    const state = [...this.state];
    const personIndex = state.findIndex((item) => item.id === id);
    const newPerson = { id: id, name: name, age: age };
    state[personIndex] = newPerson;
    this.state = state;

    return new Promise((res, rej) => {
      setTimeout(() => {
        res({ message: 'success', statusCode: 200 });
      }, 300);
    });
  }
  mockDeletePerson(id: number) {
    const state = [...this.state];
    const filtered = state.filter((item) => item.id !== id);
    this.state = filtered;
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({ message: 'success', statusCode: 200 });
      }, 300);
    });
  }
}

export const dummyApi = new Api(initialPersonList);

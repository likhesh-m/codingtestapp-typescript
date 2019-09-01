import User from '../../models/User';

const initialState: User[] = [
  {
    id: '1',
    firstName: 'Leanne',
    lastName: 'Bret',
    dob: '12-Sep-1978'
  },
  {
    id: '2',
    firstName: 'Ervin',
    lastName: 'Antonette',
    dob: '01-Apr-1987'
  },
  {
    id: '3',
    firstName: 'Clementine',
    lastName: 'Samantha',
    dob: '31-Oct-2011'
  },
  {
    id: '4',
    firstName: 'Patricia',
    lastName: 'Karianne',
    dob: '20-Oct-1982'
  },
  {
    id: '5',
    firstName: 'Chelsey',
    lastName: 'Kamren',
    dob: '10-May-1943'
  },
  {
    id: '6',
    firstName: 'Mrs. Dennis',
    lastName: 'Leopoldo-Corkery',
    dob: '16-Sep-1979'
  }
];

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'EDIT_USER':
      return state.map((item: User) => {
        if (item.id !== action.payload.id) {
          // This isn't the item we care about - return as it is.
          return item;
        }
        // Otherwise, this is the one we want - return an updated value.
        return {
          ...action.payload
        };
      });
    case 'ADD_USER':
      return [...state, action.payload];
    default:
      break;
  }
  return state;
};

export default userReducer;

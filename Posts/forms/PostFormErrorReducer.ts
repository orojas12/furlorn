export interface IErrorState {
  name: string;
  species: string;
  sex: string;
  breed: string;
  age: string;
  weight: string;
  microchip: string;
  coatColors: string;
  eyeColors: string;
  fileUpload: string;
  description: string;
  status: string;
}

export default function PostFormErrorReducer(
  state: IErrorState,
  action: { type: string; payload: string }
): IErrorState {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "species":
      return { ...state, species: action.payload };
    case "sex":
      return { ...state, sex: action.payload };
    case "breed":
      return { ...state, breed: action.payload };
    case "age":
      return { ...state, age: action.payload };
    case "weight":
      return { ...state, weight: action.payload };
    case "microchip":
      return { ...state, microchip: action.payload };
    case "coatColors":
      return { ...state, coatColors: action.payload };
    case "eyeColors":
      return { ...state, eyeColors: action.payload };
    case "fileUpload":
      return { ...state, fileUpload: action.payload };
    case "description":
      return { ...state, description: action.payload };
    default:
      return state;
  }
}

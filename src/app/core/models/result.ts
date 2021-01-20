export class IResult {
  results: IData[];
  totalResults: string;
}

export interface IData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

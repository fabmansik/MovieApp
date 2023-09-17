
export interface IMovieResponse<DATA> {
    page: number
    results: DATA
    total_pages?: number
    total_results?: number
}

export interface IMovieList {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface IGenre {
    id: number
    name: string
}
export interface ICompanies{
    id: number
    logo_path: string
    name: string
    origin_country: string
}
export interface ICountries{
    iso_3166_1: string
    name: string
}
export interface ILanguages{
    english_name:string
    iso_639_1: string
    name: string
}
export interface IMovieInfo {
    adult: boolean,
    backdrop_path: string
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string
        backdrop_path: string
    },
    budget: number
    genres: IGenre[],
    homepage: string
    id: number
    imdb_id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ICompanies[]
    production_countries: ICountries[],
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: ILanguages[]
    status: string
    tagline: string
    title:  string
    video: boolean
    vote_average: number
    vote_count: number
}
export interface IVideo {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}
export interface IVideoRes{
    id: number
    results: IVideo[]
}
export interface ICredits{
    id: number
    cast: ICast[]
    crew: ICrew[]
}
export interface ICast{
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}
export interface ICrew{

    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
    order?: number
}

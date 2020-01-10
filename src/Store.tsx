import React from 'react'

interface IState {
    episodes: Array<IEpisode>,
    favourites: Array<any>
}
export interface Iaction {
    type: string;
    payload: any
}

export interface IEpisode {
    id: number,
    url: string,
    name: string,
    season: number,
    number: number,
    airdate: string,
    airtime: string,
    airstamp: string,
    runtime: number,
    image: { medium: string, original: string },
    summary: string
}

const initialState:IState = {
    episodes: [],
    favourites: []
}

const Store = React.createContext<IState | any>(initialState)
//export const dispatchStore = React.createContext<IState | any>(initialState)

function reducer(state: IState, action: Iaction): IState {
    switch (action.type) {
      case "FETCH_DATA":
        return { ...state, episodes: action.payload };
      case "ADD_FAV":
        return { ...state, favourites: [...state.favourites, action.payload] };
      case "REM_FAV":
          const newFavs = state.favourites.filter(fav => fav.id !== action.payload.id)
        return { ...state, favourites: newFavs };
      default:
        return state;
    }
}

function StoreProvider(props: any): JSX.Element {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return <Store.Provider value={{ state, dispatch}}>{props.children}</Store.Provider>
}

export {Store, StoreProvider}
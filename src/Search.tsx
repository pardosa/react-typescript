import React, { useEffect, useContext, useState }  from 'react'
import { Store, Iaction, IEpisode } from './Store';

const EpisodeList = React.lazy<any>(() => import('./Episodes'))

interface IEpisodeProps {
    episodes: IEpisode[],
    toogleFav: (episode: IEpisode) => Iaction,
    favourites: IEpisode[]
}

export default function Search() {
    const { state, dispatch } = useContext(Store)

    useEffect(() => {
        state.episodes.length === 0 && FetchDataAction()
    })

    const FetchDataAction = async () => {
        const URL = `http://api.tvmaze.com/singlesearch/shows?q=game%20of%20thrones&embed=episodes`
      const data = await fetch(URL)
      const dataJSON = await data.json();
      return dispatch({
        type: 'FETCH_DATA',
        payload: dataJSON._embedded.episodes
      })
    }

    const toogleFav = (episode: IEpisode): Iaction => {
        const epsInFav = state.favourites.includes(episode)
        let dispatchObj = {
          type: "ADD_FAV",
          payload: episode
        };
        if (epsInFav){
            dispatchObj = {
              type: "REM_FAV",
              payload: episode
            };
        }
        return dispatch(dispatchObj);
    }

    const props: IEpisodeProps = {
      episodes: state.episodes,
      toogleFav: toogleFav,
      favourites: state.favourites
    };

    let favEpisodes = <div></div>
    if (state.favourites.length > 0){
        const favProps: IEpisodeProps = {
          episodes: state.favourites,
          toogleFav: toogleFav,
          favourites: state.favourites
        };
        favEpisodes = (
          <div>
            <div>Fav Episodes: </div>
            <section className="episode-layout">
              <EpisodeList {...favProps} />
            </section>
          </div>
        );
    }

    return (
      <React.Fragment>
        <header>
          <h1>Game of Thrones</h1>
          <h3>You know nothing, John Snow!!!</h3>
        </header>

        {favEpisodes}
        <div>All Episodes:</div>
        <React.Suspense fallback={<div>loading...</div>}>
            <section className="episode-layout">
                <EpisodeList {...props} />
            </section>
        </React.Suspense>
      </React.Fragment>
    );
}

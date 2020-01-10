import React from 'react'
import { IEpisode } from './Store';

export default function Episodes(props: any): Array<JSX.Element> {
    const {episodes, toogleFav, favourites} = props;
    return episodes.map((episode: IEpisode) => {
        return (
            <section key={episode.id} className="episode-box">
            <img
                src={episode.image.medium}
                alt={`Game of Thrones ${episode.name}`}
            />
            <div>
                <strong>{episode.name}</strong>
            </div>
            <section>
                <div>
                Session: {episode.season} Number: {episode.number}
                </div>
                <button onClick={() => toogleFav(episode)}>
                {favourites.find((fav: IEpisode) => fav.id === episode.id) ? 'Remove' : 'Add to Fav' }
                </button>
            </section>
            </section>
        );
    })
}

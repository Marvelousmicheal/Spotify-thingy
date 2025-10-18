import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
    
})


// const clientCredentialsGrant  = async () => {
//     try {
//         const data = await spotifyApi.clientCredentialsGrant()
//         const accessToken = data.body['access_token']
//         spotifyApi.setAccessToken(accessToken)
//         console.log("access token has been succesfully retrived")

//         setTimeout(clientCredentialsGrant , data.body["expires_in"]*1000)

//     } catch (error) {
//         console.error('something went wrong when retrieving an access token',error)
//     }
// }

const refreshAccessToken = async () => {
    try {
        const data = await spotifyApi.refreshAccessToken()
        const accessToken = data.body['access_token']
        spotifyApi.setAccessToken(accessToken)
        console.log("access token has been suceessfully , the token is pohiugyct87943r4trspihouivhopoguOIUYGTYUi")
        setTimeout(refreshAccessToken, data.body["expires_in"]*10000)

    } catch (error) {
        console.error("something went wrong", error)
    }
}

export const getSpotifyApi = async () =>{
    if(!spotifyApi.getAccessToken()){
await  refreshAccessToken()
    }
    return spotifyApi
}




export default async function getNowPlaying() {
 try {
    const spotifyApi = await getSpotifyApi()
    const nowPlaying = await spotifyApi.getMyCurrentPlayingTrack()
    return nowPlaying.body
 } catch (error) {
    console.error("error fetching now playing", error)
 }
}

export const getRecommendationsForMood = async (mood: string) => {
    const spotifyApi = await getSpotifyApi();

    // Define mood profiles with seed genres and audio feature targets
    const moodProfiles: { [key: string]: any } = {
        happy: { seed_genres: ['happy', 'pop', 'dance'], target_valence: 0.8, target_energy: 0.8 },
        sad: { seed_genres: ['sad', 'acoustic', 'rainy-day'], target_valence: 0.2, target_energy: 0.3 },
        chill: { seed_genres: ['chill', 'lo-fi', 'ambient', 'acoustic'], target_energy: 0.4, target_acousticness: 0.8 },
        energetic: { seed_genres: ['electronic', 'dance', 'rock', 'pop'], target_energy: 0.9, target_danceability: 0.8 },
        focus: { seed_genres: ['focus', 'ambient', 'classical', 'instrumental'], target_instrumentalness: 0.8, target_energy: 0.3 },
        party: { seed_genres: ['party', 'dance', 'pop', 'hip-hop'], target_danceability: 0.9, target_energy: 0.9, target_popularity: 80 },
    };

    const profile = moodProfiles[mood.toLowerCase()];

    if (!profile) {
        // Fallback to a simple genre search if mood profile doesn't exist
        return spotifyApi.searchTracks(`genre:${mood}`, { limit: 10 });
    }

    return spotifyApi.getRecommendations({
        ...profile,
        limit: 10,
    });
};

 
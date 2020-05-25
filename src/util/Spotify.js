const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = "http://localhost:3000%2F";
let accessToken = null;
let userId = null;
let playlistId = null;

const Spotify = {
    getAccessToken() {
        if (accessToken !== null) {
            return accessToken;
        }
        const url = window.location.href;
        if (url.includes("access_token")) {
            let index = url.indexOf("=");
            accessToken = url.substring(index + 1, url.indexOf("&", index));
            index = url.indexOf("=", index + 1);
            index = url.indexOf("=", index + 1);
            const expiresIn = url.substring(index + 1, url.length);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    async search(term) {
        if (term !== "") {
            const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
            try {
                const response = await fetch(endpoint, {
                    headers: {
                        Authorization: `Bearer ${this.getAccessToken()}`
                    }
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (jsonResponse.tracks.items) {
                        const response = jsonResponse.tracks.items.map(track => {
                            return {
                                id: track.id,
                                name: track.name,
                                artists: track.artists,
                                album: track.album,
                                uri: track.uri
                            };
                        });
                        return response;
                    } else {
                        return [];
                    }
                }
            } catch (error) {
                console.log(error);
                return [];
            }
        } else {
            return [];
        }
    },
    async savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) {
            return;
        }
        try {
            let responseUser = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${this.getAccessToken()}`
                }
            });
            if (responseUser.ok) {
                const jsonResponseUser = await responseUser.json();
                userId = jsonResponseUser.id;
            }
            let responsePlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application%5Cson',
                },
                body: JSON.stringify({name:name})
            });
            if (responsePlaylist.ok) {
                const jsonResponsePlaylist = await responsePlaylist.json();
                playlistId = jsonResponsePlaylist.id;
            }
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackURIs.toString()}`, {
                method:'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application%5Cson'
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}
export default Spotify;
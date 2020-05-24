const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = "http:%2F%2Flocalhost:3000%2F";
let accessToken = null;
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
            const expiresIn = url.substring(index + 1, url.indexOf("&", index));
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    async search(term) {
        this.getAccessToken();
        if (term !== "") {
            const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
            try {
                const response = await fetch(endpoint, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
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
        const token=this.getAccessToken();
        const userId=null;
        let response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            userId=jsonResponse.id;
        }
        response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?name=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type':'application\json'
            }
        });
        const playlistId=null;
        if (response.ok) {
            const jsonResponse = await response.json();
            playlistId=jsonResponse.id;
        }
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackURIs.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type':'application\json'
            }
        });
    }
}
export default Spotify;
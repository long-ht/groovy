const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URL;

const Spotify = {
    handleSuccess(message) {
        document.getElementById("Alert").innerText = message;
        document.getElementById("Alert").style.color = "#3c763d";
        document.getElementById("Alert").style.backgroundColor = "#dff0d8";
        document.getElementById("Alert").style.display = "block";
        setTimeout(function () { document.getElementById("Alert").style.display = "none"; }, 2000);
    },
    handleError(message) {
        document.getElementById("Alert").innerText = message;
        document.getElementById("Alert").style.color = "#a94442";
        document.getElementById("Alert").style.backgroundColor = "#f2dede";
        document.getElementById("Alert").style.display = "block";
        setTimeout(function () { document.getElementById("Alert").style.display = "none"; }, 2000);
    },
    getAccessTokenLocal() {
        var expires = 0 + localStorage.getItem('pa_expires', '0');
        if ((new Date()).getTime() > expires) {
            return '';
        }
        var token = localStorage.getItem('pa_token', '');
        return token;
    },
    setAccessTokenLocal(token, expires_in) {
        localStorage.setItem('pa_token', token);
        localStorage.setItem('pa_expires', (new Date()).getTime() + expires_in);
    },
    getAccessToken() {
        let accessToken = this.getAccessTokenLocal();
        if (accessToken) {
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
            this.setAccessTokenLocal(accessToken, expiresIn);
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    async search(term, searchBy) {
        const accessToken = this.getAccessToken();
        if (term !== "") {
            const endpoint = `https://api.spotify.com/v1/search?type=${searchBy}&q=${term}`;
            try {
                const response = await fetch(endpoint, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (jsonResponse.tracks) {
                        const response = jsonResponse.tracks.items.map(track => {
                            return {
                                id: track.id,
                                name: track.name,
                                artists: track.artists,
                                album: track.album.name,
                                uri: track.uri,
                                image: track.album.images[1].url
                            };
                        });
                        return response;
                    } else if (jsonResponse.albums) {
                        const response = jsonResponse.albums.items.map(album => {
                            return {
                                id: album.id,
                                name: album.name,
                                artists: album.artists,
                                uri: album.uri,
                                image: album.images[1].url
                            };
                        });
                        return response;
                    }
                }
            } catch (error) {
                this.handleError("Search failed");
                return [];
            }
        } else {
            this.handleError("Empty field");
            return [];
        }
    },
    async onAlbumClick(id, imageUrl, albumName) {
        const accessToken = this.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/albums/${id}/tracks`;
        try {
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.items) {
                    const response = jsonResponse.items.map(track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artists: track.artists,
                            album: albumName,
                            uri: track.uri,
                            image: imageUrl
                        };
                    });
                    return response;
                }
            }
        } catch (error) {
            this.handleError("Failed to fetch album");
            return [];
        }
    },

    async savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) {
            return;
        }
        let userId = null;
        let playlistId = null;
        try {
            const accessToken = this.getAccessToken();
            let responseUser = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
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
                body: JSON.stringify({ name: name })
            });
            if (responsePlaylist.ok) {
                const jsonResponsePlaylist = await responsePlaylist.json();
                playlistId = jsonResponsePlaylist.id;
            }
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackURIs.toString()}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application%5Cson'
                },
            });
            this.handleSuccess("Playlist saved");
        } catch (error) {
            this.handleError("Save failed");
        }
    }
}
export default Spotify;
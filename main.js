document.getElementById('search-button').addEventListener('click', function() {
    const songName = document.getElementById('song-name').value;
    // const songCount = parseInt(countText.data.length);
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then(res => res.json())
        .then(data => {
            
            // data = data.slice(0, song);
            const songContainer = document.getElementById('song-list');
            songContainer.innerHTML = '';
            console.log(data.data);
            for (let i = 0; i < 10; i++) {
                const songList = data.data[i];
                const p = document.createElement('p');
                const d = document.createElement('div');
                d.innerHTML = ` 
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${songList.title}</h3>
                        <p>Artist name: <span>${songList.artist.name}</span></p>
                        <p class="author lead">Album by: <span>${songList.album.title}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${songList.artist.name}', '${songList.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>` ;
                songContainer.appendChild(d);
            }
        })
})



function getLyrics(artist, title) {
    
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const detail = document.getElementById('lyrics');
            if(!data.error){
                detail.innerHTML = 
                ` <h2 class="text-success mb-4">${artist}</>
                <pre class="lyric text-white">${data.lyrics}</pre>`;
            }
            else{
                detail.innerHTML = 
                ` <h2 class="text-success mb-4">${artist}</>
                <pre class="lyric text-white">Lyrics not found!!</pre>`; 
            }
            
                     
              
        })
}
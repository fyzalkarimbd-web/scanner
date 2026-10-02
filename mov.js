 // মুভি সার্ভারের সিকিউর ডাটাবেজ (সহজে নতুন লিঙ্ক যুক্ত করার ট্রিকস)
  var movieServers = [
    { name: "Fibwatch", url: "https://fibwatch.art/" },
    { name: "Flixmet", url: "https://flixmet.net/" },
    { name: "Filmy4wap", url: "https://filmtani.xyz/" },
    { name: "Filmyzilla", url: "https://www.filmyzilla71.com/" },
    { name: "FilmyFly", url: "https://filmyfly.army/" },
    { name: "Jadoo Cinema BD", url: "https://jadoocinema.net/" },
    { name: "BollyFlix", url: "https://new.bollyflix.vote/" },
    { name: "Joya Move", url: "https://joya9tv1.com/" },
    { name: "Fojik", url: "https://fojik.site/" },
    { name: "Southfreak", url: "https://southfreak.vip/" },
    { name: "Bolly4u", url: "https://bolly11.com/" },
    { name: "Mp4moviez", url: "https://www.mp4moviez5.com/" },
    { name: "Moviesflix", url: "https://moviesflixwow.xyz/" },
    { name: "MoviesLink", url: "https://movieslinkbd.net/" },
    { name: "Notun Movie", url: "https://notunmovie.net/" },
    { name: "CineWorld", url: "https://cineworldbd.top/" },
    { name: "MovieLinkBD", url: "https://movielinkbd.is/" },
    { name: "CineFreak", url: "https://cinefreak.net/" },
    { name: "Mela Movies", url: "https://melamovies.top/" },
    { name: "HDmovies4u", url: "https://hdmovies4u.in/" },
    { name: "9XFLIX", url: "https://9xflix.esq/m/" },
    { name: "9xMovies", url: "https://9xmovies.watch/" },
    { name: "8xfilms", url: "https://8xfilms.blog/" },
    { name: "11xmovies", url: "https://11xmovies.online/" },
    { name: "Vega Movies", url: "https://vegamoviess.io/" }
  ];

  // DOM পেজ পুরোপুরি লোড হওয়ার পর বাটনগুলো জেনারেট করার ফাংশন
  document.addEventListener("DOMContentLoaded", function() {
    var gridContainer = document.getElementById("movie-grid-container");
    if (gridContainer) {
      movieServers.forEach(function(server, index) {
        var card = document.createElement("div");
        card.className = "mds-server-card";
        
        // ডাইনামিকালি ক্রমিক নং (১, ২, ৩...) সহ বাটন রেন্ডার করা হচ্ছে
        card.innerHTML = `
          <div class="server-card-header">
            <h4>${server.name}</h4>
            <span class="server-num-badge">সার্ভার: ${index + 1}</span>
          </div>
          <a href="${server.url}" class="mds-access-btn" target="_blank">
            <i class="fa-solid fa-circle-play"></i> সার্ভার এক্সেস করুন
          </a>
        `;
        gridContainer.appendChild(card);
      });
    }
  });

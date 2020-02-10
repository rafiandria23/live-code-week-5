class Comic {
  static findAllComics() {
    $("#comicCollectionContainer").empty();
    $.ajax({
      type: "GET",
      url: `${baseURL}/comics`,
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(comics => {
        comics.forEach(comic => {
          let template = `<div class="col-4 mb-4">`;
          template += `<div class="card text-center">`;
          template += `<img
                src="${comic.imageUrl}"
                class="card-img-top"
              />`;
          template += `<div class="card-body">`;
          template += `<h5 class="card-title">${comic.title}</h5>`;
          template += `<p class="card-text">${comic.author}</p>`;
          template += `<button onclick="Comic.preUpdateComic(${comic.id})" class="btn btn-primary">Edit</button>`;
          template += `</div>`;
          template += `</div>`;
          template += `</div>`;
          $("#comicCollection").append(template);
        });
        $("#comicCollection").show(1000);
      })
      .fail(err => {
        console.log(err);
      });
  }

  static preUpdateComic(comic_id) {
    localStorage.setItem("comic_id", comic_id);
    $.ajax({
      type: "GET",
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      url: `${baseURL}/comics/${comic_id}`
    })
      .done(({ comic }) => {
        $("#comicUpdateForm").show(1000);
        $("#title").val(comic.title);
        $("#author").val(comic.author);
        $("#imageUrl").val(comic.imageUrl);
      })
      .fail(err => {
        console.log(err);
      });
  }

  static updateComic(e) {
    e.preventDefault();
    const comicUpdateData = $("#comicForm").serialize();
    const comic_id = localStorage.getItem("comic_id");
    $.ajax({
      type: "PUT",
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      url: `${baseURL}/comics/${comic_id}`,
      data: comicUpdateData,
      dataType: "json"
    })
      .done(updatedComic => {
        $("#comicUpdateForm").hide(1000);
        localStorage.removeItem("comic_id");
        Comic.findAllComics();
      })
      .fail(err => {
        console.log(err);
      });
  }
}
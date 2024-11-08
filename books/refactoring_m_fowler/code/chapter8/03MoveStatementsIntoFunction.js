(() => {
  function test(title, callback) {
    console.log(title);
    callback();
  }

  // Mock person
  const person = {
    name: "keech",
    photo: {
      value: "[this is the photo]",
      title: "title",
      location: "Bg",
      date: {
        toDateString: () => {
          return "yyyy-mm-dd";
        },
      },
    },
  };

  //Mock render photo
  function renderPhoto(p) {
    return p.value;
  }

  // Starter
  (() => {
    function renderPerson(outStream, person) {
      const result = [];
      result.push(`<p>${person.name}</p>`);
      result.push(renderPhoto(person.photo));
      result.push(`<p>title: ${person.photo.title}</p>`);
      result.push(emitPhotoData(person.photo));
      return result.join("\n");
    }

    function photoDiv(p) {
      return [
        "<div>",
        `<p>title: ${p.title}</p>`,
        emitPhotoData(p),
        "</div>",
      ].join("\n");
    }

    function emitPhotoData(aPhoto) {
      const result = [];
      result.push(`<p>location: ${aPhoto.location}</p>`);
      result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`);
      return result.join("\n");
    }

    test("starter", () => {
      const html = renderPerson(null, person);
      const div = photoDiv(person.photo);
      const photoData = emitPhotoData(person.photo);
      if (
        html ===
          `<p>keech</p>\n[this is the photo]\n<p>title: title</p>\n<p>location: Bg</p>\n<p>date: yyyy-mm-dd</p>` &&
        div ===
          `<div>\n<p>title: title</p>\n<p>location: Bg</p>\n<p>date: yyyy-mm-dd</p>\n</div>` &&
        photoData === `<p>location: Bg</p>\n<p>date: yyyy-mm-dd</p>`
      ) {
        console.log("PASS");
      } else {
        console.log("FAIL");
        console.log("html:");
        console.log(html);
        console.log("div:");
        console.log(div);
        console.log("photoData");
        console.log(photoData);
      }
    });
  })();

  // Refactored
  (() => {
    function renderPerson(outStream, person) {
      const result = [];
      result.push(`<p>${person.name}</p>`);
      result.push(renderPhoto(person.photo));
      result.push(emitPhotoData(person.photo));
      return result.join("\n");
    }

    function photoDiv(p) {
      return ["<div>", emitPhotoData(p), "</div>"].join("\n");
    }

    function emitPhotoData(aPhoto) {
      return [
        `<p>title: ${aPhoto.title}</p>`,
        `<p>location: ${aPhoto.location}</p>`,
        `<p>date: ${aPhoto.date.toDateString()}</p>`,
      ].join("\n");
    }

    test("refactored", () => {
      const html = renderPerson(null, person);
      const div = photoDiv(person.photo);
      const photoData = emitPhotoData(person.photo);
      if (
        html ===
          `<p>keech</p>\n[this is the photo]\n<p>title: title</p>\n<p>location: Bg</p>\n<p>date: yyyy-mm-dd</p>` &&
        div ===
          `<div>\n<p>title: title</p>\n<p>location: Bg</p>\n<p>date: yyyy-mm-dd</p>\n</div>` &&
        photoData ===
          `<p>title: title</p>\n<p>location: Bg</p>\n<p>date: yyyy-mm-dd</p>`
      ) {
        console.log("PASS");
      } else {
        console.log("FAIL");
        console.log("html:");
        console.log(html);
        console.log("div:");
        console.log(div);
        console.log("photoData:");
        console.log(photoData);
      }
    });
  })();
})();

// Inverse: Move Statements To Callers

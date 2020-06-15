const fs = require("fs")
const path = require("path")
window.$ = window.jQuery = require('jquery')

let currentPath = path.join(__dirname, "folder")

showFolder = () => {
  fs.readdirSync(currentPath).forEach(file => {
    const stats = fs.statSync(path.join(currentPath, file))
    if (stats.isDirectory()) {
      $("body").append(
        $("<div></div>").addClass("file-icon").append(
          $("<img>")
            .attr("src", "folder.svg")
            .on("click", function () {
              $("body").empty()
              currentPath = path.join(currentPath, $(this).next().text())
              showFolder()
            }),
          $("<span></span>").text(file)
        )
      )
    } else {
      $("body").append(
        $("<div></div>").addClass("file-icon").append(
          $("<img>").attr("src", "file.svg"),
          $("<span></span>").text(file)
        )
      )
    }
  })
  $("body").append(
    $("<button>Back</button>")
      .on("click", function () {
        if (path.basename(currentPath) === "folder")
          return
        $("body").empty()
        currentPath = currentPath.substring(0, currentPath.lastIndexOf("\\"))
        showFolder()
      })
  )
}

showFolder()
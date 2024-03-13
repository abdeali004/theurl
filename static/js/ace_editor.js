const ace_editor_themes = {
  "Ambiance": "ambiance", "Chaos": "chaos", "Chrome": "chrome", "Cloud9 Day": "cloud9_day", "Cloud9 Night": "cloud9_night", "Cloud9 Night Low Color": "cloud9_night_low_color", "Clouds": "clouds", "Clouds Midnight": "clouds_midnight", "Cloud Editor": "cloud_editor", "Cloud Editor Dark": "cloud_editor_dark", "Cobalt": "cobalt", "Crimson Editor":
    "crimson_editor", "Dawn": "dawn", "Dracula": "dracula", "Dreamweaver": "dreamweaver", "Eclipse": "eclipse", "Github": "github", "Github Dark": "github_dark", "Gob": "gob", "Gruvbox": "gruvbox", "Gruvbox Dark Hard": "gruvbox_dark_hard", "Gruvbox Light Hard": "gruvbox_light_hard", "Idle Fingers": "idle_fingers", "Iplastic": "iplastic", "Katzenmilch": "katzenmilch", "Kr Theme": "kr_theme", "Kuroir": "kuroir", "Merbivore": "merbivore", "Merbivore Soft": "merbivore_soft", "Monokai": "monokai", "Mono Industrial": "mono_industrial", "Nord Dark": "nord_dark", "One Dark": "one_dark", "Pastel On Dark": "pastel_on_dark", "Solarized Dark": "solarized_dark", "Solarized Light": "solarized_light", "Sqlserver": "sqlserver", "Terminal": "terminal", "Textmate": "textmate", "Tomorrow": "tomorrow", "Tomorrow Night": "tomorrow_night", "Tomorrow Night Blue": "tomorrow_night_blue", "Tomorrow Night Bright": "tomorrow_night_bright", "Tomorrow Night Eighties": "tomorrow_night_eighties", "Twilight": "twilight", "Vibrant Ink": "vibrant_ink", "Xcode": "xcode"
}
const themes_dropdown_id = "editorThemesList";
const themes_modal_id = "myThemesModal";

const editor = ace.edit("editor", {
  mode: "ace/mode/text",
  selectionStyle: "text",
  showPrintMargin: false,
  theme: "ace/theme/github_dark",
});

function editorStartUpCode() {
  // editor.session.setUseWrapMode(true);
  editor.setOption("wrap", true);
  editor.setOption("hScrollBarAlwaysVisible", false);

}

function setThemesDropdownList(theme) {
  let final_string = "";
  for (var key in ace_editor_themes) {
    value = ace_editor_themes[key]
    final_string += '\n<li><a class="list-group-item themes-list-element" id="' + value + '" onclick="setThemesDropdownList(\'' + value + '\')">' + key + '</a></li>'
  }
  var theme_dropdown_component = document.getElementById(themes_dropdown_id);
  theme_dropdown_component.innerHTML = final_string;
  // Get the li element
  var liElement = document.getElementById(theme);
  // Add a class to the li element
  liElement.classList.add('active');
  // Setting theme
  editor.setTheme("ace/theme/" + theme);
  // console.log("hiding modal");
  $("#" + themes_modal_id).modal('hide');
}

function editorGetValue() {
  return editor.getValue(value);
}
function editorSetValue(value) {
  editor.setValue(value);
}
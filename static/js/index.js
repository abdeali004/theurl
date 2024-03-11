// Globals
const elementHeader = document.getElementById("json-card-header");
const DOUBLE_SLASH_SEPERATOR = "$#$DS$#$";
const COPY_BUTTON_SUCCESS_COLOR = "green";
const COPY_BUTTON_WAIT_TIME = 1000;
const maxUploadFileSize = 10 * 1024 * 1024; // 100 MB in bytes
let background_class = 'text-bg-warning';

window.onload = function () {
  setThemesDropdownList("github_dark");
  blockViewSource();
  getShortcuts();
  checkPastePermissionStatus();
  enablePopovers();
  enableLiveToasts();
  // toastMessage(
  //   "Current Beta Version",
  //   document.getElementById("current-version").innerHTML
  // );
};

// Onclick actions

document.getElementById("editorEncode").addEventListener("click", () => editorSetValue(encodeURIComponent(editorGetValue())));
document.getElementById("editorDecode").addEventListener("click", () => editorSetValue(decodeURIComponent(editorGetValue())));
document.getElementById("editorContentClear").addEventListener("click", () => editor.setValue(""));
document.getElementById("editorFileDownload").addEventListener("click", () => downloadEditorContent());
document.getElementById("editorFileUpload").addEventListener("click", () => triggerImportButton('editorFileInput'));
document.getElementById("editorThemes").addEventListener("click", () => $("#" + themes_modal_id).modal('show'));

$("#themesSearchInput").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#editorThemesList li").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

// Read file content from Upload file
document.getElementById('editorFileInput').addEventListener('change', function (event) {
  // console.log("Entered editorFileInput");
  var file = event.target.files[0];
  if (file.size > maxUploadFileSize) {
    toastMessage('Upload Limit Exceeds!', 'File size must be less than 10MB.', 'warning');
  }
  else {
    var reader = new FileReader();
    reader.onload = function (event) {
      var editorString = event.target.result;
      editor.setValue(editorString);
    };
    reader.readAsText(file);
  }
  this.value = null;
});



function triggerImportButton(id) {
  var fileInput = document.getElementById(id);
  // Trigger the click event
  fileInput.click();
}

function toastMessage(heading, message, type = "warning") {
  var toastLiveExample = document.getElementById("toast-body");
  var toast_message = document.getElementById("toast-message");
  toastLiveExample.classList.remove(background_class);
  background_class = "text-bg-" + type;
  // console.log(background_class);
  // document.getElementById("toast-heading").innerText = heading;
  if (heading.trim() !== "")
    heading = heading + ": ";
  toast_message.innerText = heading + message;
  toastLiveExample.classList.add(background_class);
  var toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

// paste functions
function openAboutPasteEnablingURL() {
  window.open("https://themilliseconds.netlify.app/" + "about#EnablePaste");
}

async function checkPastePermissionStatus() {
  const queryOpts = { name: "clipboard-read", allowWithoutGesture: false };
  const permissionStatus = await navigator.permissions.query(queryOpts);
  PASTE_PERMISSION_STATUS = permissionStatus.state;
}

function pasteText() {
  // Will be 'granted', 'denied' or 'prompt':
  // console.log(1,PASTE_PERMISSION_STATUS);
  if (PASTE_PERMISSION_STATUS.toLowerCase() == "denied") {
    toastMessage("", 'User must Enable Clipboard support to use Paste feature on our website by clicking \"Allow\" in the Prompt. If you \"Missed\" or \"Blocked\" by mistake then check the About page of https://themilliseconds.netlify.app/ website.', 'warning');
    openAboutPasteEnablingURL();
    return;
  }
  // console.log(2,PASTE_PERMISSION_STATUS);
  if (PASTE_PERMISSION_STATUS.toLowerCase() == "prompt") {
    toastMessage("", 'Allow us to enable paste feature by clicking on "Allow" in the above Prompt. Your Copied data is neither stored nor shared by our website.', 'warning');
    if (PASTE_PERMISSION_STATUS.toLowerCase() == "prompt")
      checkPastePermissionStatus();
  }
  // console.log(3,PASTE_PERMISSION_STATUS);
  pasteTextOnEditor();
}

async function pasteTextOnEditor() {
  // console.log("Inside setDateTimePasteText");
  try {
    const text = await navigator.clipboard.readText();
    editor.setValue(text);
  } catch (error) {
    // console.log(error);
    toastMessage("", 'User must Enable Clipboard support to use Paste feature on our website by clicking \"Allow\" in the Prompt. If you \"Missed\" or \"Blocked\" by mistake then check the About page of https://themilliseconds.netlify.app/ website.', 'warning');
    checkPastePermissionStatus();
  }
}


// Copy Function


function copyText(text) {
  navigator.clipboard.writeText(text);
}

function copyInnerText(this_block) {
  if (editor.getValue() != "") {
    // editor.focus();
    // editor.selectAll();
    // document.execCommand("copy");
    copyText(editor.getValue());
    var previous_color = this_block.style.color;
    this_block.style.color = COPY_BUTTON_SUCCESS_COLOR;
    toastMessage("Copied", "Content Copied Successfully.", "success");
    setTimeout(function () {
      this_block.style.color = previous_color;
    }, COPY_BUTTON_WAIT_TIME);
  }
  else {
    toastMessage("Copy Failed", "Content is empty.", "danger");
  }
}

function downloadEditorContent() {
  // Get the content from the paragraph tag
  var content = editor.getValue();

  if (content.trim() === "") {
    toastMessage("Download Failed!", "Content is empty.", "danger");
    return;
  }

  // Create a new Blob object using the content
  var blob = new Blob([content], { type: 'application/text' });

  // Create a link element
  var link = document.createElement('a');

  // Set the href and download attributes of the link
  link.href = URL.createObjectURL(blob);
  var timestamp = new Date().toISOString();
  // console.log(timestamp);
  link.download = 'theURL_' + timestamp + '.txt';

  // Append the link to the body
  document.body.appendChild(link);

  // Simulate a click on the link
  link.click();

  // Remove the link from the body
  document.body.removeChild(link);
}
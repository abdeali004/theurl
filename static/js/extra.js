function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

function getShortcuts() {
  document.addEventListener("keydown", (e) => {
    // USE THIS TO DISABLE CONTROL AND ALL FUNCTION KEYS
    // if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {
    // THIS WILL ONLY DISABLE CONTROL AND F12
    if (e.ctrlKey && e.key == "Enter")
      document.getElementById("validate-json-btn").click();
  });
}

function blockViewSource() {
  document.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
    },
    false
  );

  document.addEventListener("keydown", (e) => {
    // USE THIS TO DISABLE CONTROL AND ALL FUNCTION KEYS
    // if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {
    // THIS WILL ONLY DISABLE CONTROL AND F12

    if (
      e.keyCode === 123 ||
      ctrlShiftKey(e, "I") ||
      ctrlShiftKey(e, "J") ||
      ctrlShiftKey(e, "C") ||
      (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) ||
      (e.ctrlKey && e.keyCode >= 112)
    ) {
      e.stopPropagation();
      e.preventDefault();
    }
  });
}

function enablePopovers() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

function enableLiveToasts() {
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
}

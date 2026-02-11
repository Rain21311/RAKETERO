<script>
  function enableEdit() {
    // Select the elements you want to make editable
    const name = document.querySelector('.text-wrapper-15');
    const aboutText = document.querySelector('.lorem-ipsum-dolor');
    const editBtn = document.getElementById('edit-img');

    // Toggle contentEditable
    if (name.contentEditable !== "true") {
      name.contentEditable = "true";
      aboutText.contentEditable = "true";
      name.style.border = "1px dashed #666";
      aboutText.style.border = "1px dashed #666";
      alert("Edit mode enabled! You can now click on your name or bio to change them.");
    } else {
      name.contentEditable = "false";
      aboutText.contentEditable = "false";
      name.style.border = "none";
      aboutText.style.border = "none";
      alert("Changes saved (locally)!");
    }
  }
</script>

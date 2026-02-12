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
    <script>
  const profilePic = document.getElementById("profile-pic");
  const menu = document.getElementById("profile-menu");
  const fileInput = document.getElementById("file-input");

  // Show menu when clicking profile
  profilePic.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  function openGallery() {
    fileInput.click();
  }

  // When image selected
  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePic.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  function viewPhoto() {
    window.open(profilePic.src, "_blank");
  }

  function removePhoto() {
    profilePic.src = "default-profile.jpg";
  }

  // Click outside to close menu
  document.addEventListener("click", function(e) {
    if (!profilePic.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = "none";
    }
  });
</script>

  }
</script>

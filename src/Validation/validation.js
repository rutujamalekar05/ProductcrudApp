function validateCategory() {
    let name = document.frm.name.value.trim();

    // Empty check
    if (name === "") {
        alert("Category name is required");
        document.frm.name.focus();
        return false;
    }

    // Length check
    if (name.length < 3) {
        alert("Category name must be at least 3 characters long");
        document.frm.name.focus();
        return false;
    }

    // Only letters & spaces
    let pattern = /^[A-Za-z ]+$/;
    if (!pattern.test(name)) {
        alert("Category name should contain only alphabets");
        document.frm.name.focus();
        return false;
    }

    return true; // allow submit
}

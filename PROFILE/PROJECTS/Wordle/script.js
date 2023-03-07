$("input").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next('input').focus();
    }
});
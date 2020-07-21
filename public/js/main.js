$('#btn').click(() => {
  var username = $('#username').val();
  var password = $('#password').val();
  $.ajax({
    url: '/',
    type: 'POST',
    data: {
      username: username,
      password: password,
    },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

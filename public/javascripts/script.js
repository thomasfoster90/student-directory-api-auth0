var lock = new Auth0Lock('aphtGA2Y2JTF523YF0iBDwzIMBwhZYBg', 'emptyfoster.auth0.com', {
  auth: {
    params: {
      scope: 'openid email'
    }
  }
});

lock.on("authenticated", function(authResult) {
  localStorage.setItem('id_token', authResult.idToken);
  showStudentDirectory()
});


$(document).ready(function() {
  $('#btn-login').click(function(e) {
    e.preventDefault();
    lock.show();
  });
  if (localStorage.getItem('id_token')) {
    showStudentDirectory()
  }

  $("#newStudent").on("submit", createStudent)
});

function createStudent(e) {
  e.preventDefault()
  $.ajax({
    url: "/students",
    method:'POST',
    data:{
      firstName:$('#firstName').val(),
      lastName:$('#lastName').val()
    },
    headers:{
      'Authorization': "Bearer " +localStorage.getItem('id_token')
    }
  }).done(function (data) {
    loadStudent(data)
    $('#firstName').val('').focus()
    $('#lastName').val('')
  })
}

function showStudentDirectory() {
  $("#welcome").hide()
  $("#students-section").show()

  $.ajax({
    url:'/students',
    headers:{
      "Authorization":"Bearer " + localStorage.getItem('id_token')
    }
  }).done(function (data) {
    data.forEach(loadStudent)
  })
}

function loadStudent(student) {
  var li= $("<li />")
  li.text(student.firstName + " "+ student.lastName)
  $("ul#students").append(li)
}

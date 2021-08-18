

function loadData(){
    document.getElementById("jsonResult").innerHTML = "{TEST}"
  }
  $(function() {
    $('#convertForm').submit(function(event) {
      event.preventDefault();
      $.ajax({
        url: '/api/convert',
        type: 'get',
        data: $('#convertForm').serialize(),
        success: function(data) {
          $('#result').text(data.string || data);
          $('#jsonResult').text(JSON.stringify(data));
        }
      });
    });
  });
  

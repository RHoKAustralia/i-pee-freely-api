$(function() {
  $("#form").submit(function( event ) {
    var locationRef = $("#locationRef").val();
    var trackID = $("#trackID").val();
    var accessRating = $("#accessRating").val();
    var cleanRating = $("#cleanRating").val();
    var overallRating = $("#overallRating").val();
    var comments = $("#comments").val();

    $.ajax({
      url: "http://10.5.2.110:3000/api/feedback",
      method: "POST",
      data: {
        "dateTime": Date(),
        "comments": comments,
        "userAgent": navigator.userAgent,
        "trackingId": 0,
        "accessibility": accessRating,
        "cleanliness": cleanRating,
        "overallRating": overallRating,
        "locationRef": locationRef,
        "id": null
      },
      success: function( data ) {
        alert('Feedback submitted');
      }
    });

    event.preventDefault();
  });
});
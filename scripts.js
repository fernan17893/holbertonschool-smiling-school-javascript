

$(document).ready(
    function() {
    $('#carousel-quotes .carousel-inside').hide();
    $.ajax({
        url: "https://smileschool-api.hbtn.info/quotes",
        type: "GET",
        error: function(result) {
            alert('Error loading quotes');
        },
        success: function(response) {
            let i = 0;

            response.forEach(e => {
                $('#carousel-quotes .carousel-inside').append(`
                <div class="p-2 carousel-item justify-content-center w-100">
                    <div class="dblock w-75 d-flex flex-column flex-sm-row">
                <img class="rounded-circle mx-auto my-3 d-block" src="${e.pic_url}" width="150" height="150" alt="First slide">
                <div class="col-12">
                    <p class="text-center">${e.text}</p>
                    <span class="text-center font-weight-bold">${e.name}</span>
                    <span class="text-center font-italic">${e.title}</span>
                </div>
                </div>
                </div>
                `);
                if (i === 0) {
                    $('#carousel-quotes .carousel-inside .carousel-item').addClass('active');
                }
                i += 1;
            });
        }});
        setTimeout(() => {
            $('#carousel-quotes .loader').hide()
            $('#carousel-quotes .carousel-inside').show();
        }, 1000);

    }
    );

    
function createTutorials(data) {
    let row = 1;
    if (data.id > 4) {
      row = 2;
    }
    $('#addTutorials' + row).append(`
      <div class="mx-1 tutorial${data.id}">
          <div class="card video-card mx-auto my-3">
              <img class="card-img-top" src="${data.thumb_url}" alt="Thumbnail" width="255" height="154">
              <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
              <div class="card-body">
                  <p class="font-weight-bold">${data.title}<br>
                      <span class="text-secondary font-14 font-weight-normal">${data['sub-title']}</span>
                  </p>
                  <div class="row justify-content-start font-14 purple-text">
                      <div class="col-2">
                          <img class="rounded-circle" src="${data.author_pic_url}" width="30" height="30" alt="Profile" loading="lazy">
                      </div>
                      <div class="col mt-1">
                          ${data.author}
                      </div>
                  </div>
                  <div class="row justify-content-between mt-2">
                      <div class="col" id="stars-${data.id}">
                      </div>
                      <div class="col-4 text-right purple-text">
                          ${data.duration}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `);
  
    for (let i = 0; i < 5; i++) {
      if (i < data.star) {
        $('#stars-' + data.id).append(
          '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
        );
      } else {
        $('#stars-' + data.id).append(
          '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
        );
      }
    }
  }
  
  function createLatest(data) {
    for (let row = 1; row < 3; row++) {
      $('#addLatest' + row).append(`
        <div class="mx-1 tutorial${data.id}">
            <div class="card video-card mx-auto my-3">
                <img class="card-img-top" src="${data.thumb_url}" alt="Thumbnail" width="255" height="154">
                <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
                <div class="card-body">
                    <p class="font-weight-bold">${data.title}<br>
                        <span class="text-secondary font-14 font-weight-normal">${data['sub-title']}</span>
                    </p>
                    <div class="row justify-content-start font-14 purple-text">
                        <div class="col-2">
                            <img class="rounded-circle" src="${data.author_pic_url}" width="30" height="30" alt="Profile" loading="lazy">
                        </div>
                        <div class="col mt-1">
                            ${data.author}
                        </div>
                    </div>
                    <div class="row justify-content-between mt-2">
                        <div class="col" id="stars-latest-${data.id}">
                        </div>
                        <div class="col-4 text-right purple-text">
                            ${data.duration}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);
    }
    for (let i = 0; i < 5; i++) {
      if (i < data.star) {
        $(`#stars-latest-${data.id}:nth-child(1)`).append(
          '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
        );
      } else {
        $(`#stars-latest-${data.id}:nth-child(1)`).append(
          '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
        );
      }
    }
  }
  
  function createDropdowns(data) {
    $('.topicDefault').html(data.topics[0]);
    $('.sortDefault').html(data.sorts[0].replace('_', ' '));
    data.topics.forEach(function (topic) {
      $('#topicDropdown').append(
        `<a class="dropdown-item" sectionId="${topic}">${topic}</a>`
      );
    });
    data.sorts.forEach(function (sort) {
      $('#sortDropdown').append(
        `<a class="dropdown-item" sectionId="${sort}">${sort.replace(
          '_',
          ' '
        )}</a>`
      );
    });
    $('input').change(function () {
      displayCourseVideos(
        $('input').val(),
        $('.topicDefault').html(),
        $('.sortDefault').html().replace(' ', '_')
      );
    });
    $('#topicDropdown a').click(function () {
      $('.topicDefault').html($(this).attr('sectionId'));
      displayCourseVideos(
        $('input').val(),
        $('.topicDefault').html(),
        $('.sortDefault').html().replace(' ', '_')
      );
    });
    $('#sortDropdown a').click(function () {
      $('.sortDefault').html($(this).attr('sectionId').replace('_', ' '));
      displayCourseVideos(
        $('input').val(),
        $('.topicDefault').html(),
        $('.sortDefault').html().replace(' ', '_')
      );
    });
  }
  
  function displayCourseVideos(q, topic, sort) {
    $('.loader').show();
    $.ajax({
      type: 'GET',
      url: 'https://smileschool-api.hbtn.info/courses',
      dataType: 'json',
      data: {
        q,
        topic,
        sort,
      },
      success: function (response) {
        if (response.courses.length == 1) {
          $('#videoCount').html(`1 video`);
        } else {
          $('#videoCount').html(`${response.courses.length} videos`);
        }
        $('#courseResults').empty();
        response.courses.forEach(function (course) {
          $('#courseResults').append(`
              <div class="col-sm-6 col-md-4 col-lg-3">
                  <div class="card video-card my-3 mx-2">
                      <img class="card-img-top" src="${course.thumb_url}" alt="Thumbnail" width="255" height="154">
                      <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
                      <div class="card-body">
                          <p class="font-weight-bold">${course.title}<br>
                              <span class="text-secondary font-14 font-weight-normal">${course['sub-title']}</span>
                          </p>
                          <div class="row justify-content-start font-14 purple-text">
                              <div class="col-2">
                                  <img class="rounded-circle" src="images/profile_1.jpg" width="30" height="30" alt="Profile 1" loading="lazy">
                              </div>
                              <div class="col mt-1">
                                  ${course.author}
                              </div>
                          </div>
                          <div class="row justify-content-between mt-2">
                              <div class="col" id="stars-course-${course.id}">
                              </div>
                              <div class="col-4 text-right purple-text">
                                  ${course.duration}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          `);
          for (let i = 0; i < 5; i++) {
            if (i < course.star) {
              $(`#stars-course-${course.id}:nth-child(1)`).append(
                '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
              );
            } else {
              $(`#stars-course-${course.id}:nth-child(1)`).append(
                '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
              );
            }
          }
        });
        $('.loader').hide();
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  
  function queryQuotes() {
    $('.loader').show();
    $.ajax({
      type: 'GET',
      url: 'https://smileschool-api.hbtn.info/quotes',
      success: function (response) {
        response.forEach(function ({ name, pic_url, text, title }) {
          createQuotes(name, pic_url, text, title);
        });
        $('.carousel .carousel-item:first').addClass('active');
        $('.loader').hide();
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  
  function queryTutorials() {
    $('.loader').show();
    $.ajax({
      type: 'GET',
      url: 'https://smileschool-api.hbtn.info/popular-tutorials',
      contentType: 'json',
      success: function (response) {
        response.forEach(function (data) {
          createTutorials(data);
        });
        $('.tutorial2').addClass('d-none d-md-flex');
        $('.tutorial3').addClass('d-none d-lg-flex');
        $('.tutorial4').addClass('d-none d-lg-flex');
        $('.tutorial6').addClass('d-none d-md-flex');
        $('.tutorial7').addClass('d-none d-lg-flex');
        $('.loader').hide();
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  
  function queryLatest() {
    $('.loader').show();
    $.ajax({
      type: 'GET',
      url: 'https://smileschool-api.hbtn.info/latest-videos',
      contentType: 'json',
      success: function (response) {
        response.forEach(function (data) {
          createLatest(data);
        });
        $('.latest2').addClass('d-none d-md-flex');
        $('.latest3').addClass('d-none d-lg-flex');
        $('.latest4').addClass('d-none d-lg-flex');
        $('.loader').hide();
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  
  function queryCourses() {
    $('.loader').show();
    $.ajax({
      type: 'GET',
      url: 'https://smileschool-api.hbtn.info/courses',
      dataType: 'json',
      success: function (response) {
        createDropdowns(response);
        $('.loader').hide();
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  
  queryTutorials();
  queryLatest();
  queryCourses();
  displayCourseVideos();
  
    
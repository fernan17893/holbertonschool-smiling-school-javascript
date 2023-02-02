

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
    
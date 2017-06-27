
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');


    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    // YOUR CODE GOES HERE!

    var myKey = config.NYTIMES_KEY;

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': myKey,
        'q': cityStr
    });

    $.getJSON(url, function(data) {
        var items = [];
        $.each( data.response.docs, function( i, data ) {
            var web_url = data.web_url;
            var headline = data.headline.print_headline;
            var snippet = data.snippet;

            $('#nytimes-articles').append('<li class="article"> <a href="'+web_url+'">'+headline+'</a> <p>'+snippet+'</p></li>');
        });
    });

    return false;
};

$('#form-container').submit(loadData);

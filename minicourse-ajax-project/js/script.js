
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
            var headline = data.headline.main;
            var snippet = data.snippet;

            $nytElem.append('<li class="article"> <a href="'+web_url+'">'+headline+'</a> <p>'+snippet+'</p></li>');
        });
    }).error(function() {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    var wikiRequestTimeout = setTimeout( function() {
        $wikiElem.text("failed to get wikipedia resources.");
    }, 8000);

    $.ajax({
        url: 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallback',
        dataType: "jsonp",
        success: function(response){
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                var articleStr = articleList[i];
                var wikiUrl = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="'+wikiUrl+'">'+articleStr+'</li>');
            }
            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

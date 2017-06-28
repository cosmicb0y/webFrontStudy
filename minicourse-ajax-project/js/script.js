
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

    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&titles='+ cityStr+'&prop=info&inprop=url&format=json',
        dataType: "jsonp",
        success: function(data){
            for (var key in data.query.pages){
              var title = data.query.pages[key].title;
              var full_url = data.query.pages[key].fullurl;
              $wikiElem.append('<li><a href="'+full_url+'">'+title+'</li>');
            };
        }
    });

    return false;
};

$('#form-container').submit(loadData);

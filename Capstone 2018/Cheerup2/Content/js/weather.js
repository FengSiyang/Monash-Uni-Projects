
function leaveChange() {
    if (document.getElementById("ddlday").value == "1") {
        // alert("1");
        //hide
        document.getElementById("row2").style.visibility = 'hidden';
        document.getElementById("row3").style.visibility = 'hidden';
        document.getElementById("row4").style.visibility = 'hidden';
        document.getElementById("row5").style.visibility = 'hidden';
        //visible
        document.getElementById("row1").style.visibility = '';
    }
    else if (document.getElementById("ddlday").value == "2") {

        //hide
        document.getElementById("row1").style.visibility = 'hidden';
        document.getElementById("row3").style.visibility = 'hidden';
        document.getElementById("row4").style.visibility = 'hidden';
        document.getElementById("row5").style.visibility = 'hidden';
        //visible
        document.getElementById("row2").style.visibility = '';
    }
    else if (document.getElementById("ddlday").value == "3") {
        //hide
        document.getElementById("row1").style.visibility = 'hidden';
        document.getElementById("row2").style.visibility = 'hidden';
        document.getElementById("row4").style.visibility = 'hidden';
        document.getElementById("row5").style.visibility = 'hidden';
        //visible
        document.getElementById("row3").style.visibility = '';
    }
    else if (document.getElementById("ddlday").value == "4") {
        //hide
        document.getElementById("row1").style.visibility = 'hidden';
        document.getElementById("row2").style.visibility = 'hidden';
        document.getElementById("row3").style.visibility = 'hidden';
        document.getElementById("row5").style.visibility = 'hidden';
        //visible
        document.getElementById("row4").style.visibility = '';
    }
    else if (document.getElementById("ddlday").value == "5") {
        //hide
        document.getElementById("row1").style.visibility = 'hidden';
        document.getElementById("row2").style.visibility = 'hidden';
        document.getElementById("row3").style.visibility = 'hidden';
        document.getElementById("row4").style.visibility = 'hidden';
        //visible
        document.getElementById("row5").style.visibility = '';
    }
    else {
        document.getElementById("row1").style.visibility = '';
        document.getElementById("row2").style.visibility = '';
        document.getElementById("row3").style.visibility = '';
        document.getElementById("row4").style.visibility = '';
        document.getElementById("row5").style.visibility = '';
    }
}
function Suggestion(temp_max, temp_min, sb) {
    var tempC_max = Math.round((temp_max - 32) * (5 / 9));
    var tempC_min = Math.round((temp_min - 32) * (5 / 9));
    var temp_diff = tempC_max - tempC_min;
    //console.log(tempC_max);
    //console.log(tempC_min);
    //console.log(temp_diff);
    //console.log("   ");
    //make suggestion changes here as per temperature 'temp'
    if (tempC_min <= 0) {
        if (temp_diff <= 10)
            document.getElementById(sb).innerHTML = "Very cold today. We don't suggest you to somewhere far away from Melbourne City."
        else
            document.getElementById(sb).innerHTML = "Take care in the morning and it should be cold. Noon should be good to go outside. Take care of the large temperature difference."
    }
    else {
        if (temp_diff <= 10) {
            if (tempC_max < 10)
                document.getElementById(sb).innerHTML = "Very cold day and remember take heavy clothes when you go outside. Take care of the cold wind.";
            else if (tempC_max < 16)
                document.getElementById(sb).innerHTML = "Little bit cold. Take heavy clothes when you decide to go outside.";
            else if (tempC_max < 26)
                document.getElementById(sb).innerHTML = "Good day to go outside. Warm but not hot. Don't forget to take a coat to prevent wind.";
            else if (tempC_max < 32)
                document.getElementById(sb).innerHTML = "Take care of potential UV. Melbourne always has stronge UV outside. Not forget take your suntan oil.";
            else
                document.getElementById(sb).innerHTML = "Hot all day and we really don't recommend you to go outside. It couldn't relax you."
        }
        else {
            if (tempC_max < 16)
                document.getElementById(sb).innerHTML = "Large difference in temperature and cold outside. It's better don't go outside or take some heavy clothes.";
            else if (tempC_max < 26)
                document.getElementById(sb).innerHTML = "Cool day to go to nature but take care of the defference temperature from morning to night.";
            else if (tempC_max < 32)
                document.getElementById(sb).innerHTML = "Warm day to have some exercise outside. But don't forget to take your suntan oil or parasol.";
            else
                document.getElementById(sb).innerHTML = "Hot day but morning and night will be suitable for some outside exercise. Don't forget to protect UV from 11am to 3pm."
        }
    }
}

function titleCase(str) {
    return str.split(' ').map(function (word) {
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');
}



function fullDay(str) {
    switch (str) {
        case 'Tue':
            return 'Tuesday';
        case 'Wed':
            return 'Wednesday';
        case 'Thu':
            return 'Thursday';
        case 'Sat':
            return 'Saturday';
        default:
            return str + 'day';
    }
}


$(function () {

    var $wrapper = $('.wrapper'),
        $panel = $wrapper.find('.panel'),
        $city = $panel.find('#city'),
        $weather = $panel.find('.weather'),
        $group = $panel.find('.group'),
        $dt = $group.find('#dt'),
        $description = $group.find('#description'),
        $wind = $group.find('#wind'),
        $humidity = $group.find('#humidity'),
        $temperature = $weather.find('#temperature'),
        $temp = $temperature.find('#temp'),
        $icon = $temp.find('#condition'),
        $tempNumber = $temp.find('#num'),
        $celsius = $temp.find('#celsius'),
        $fahrenheit = $temp.find('#fahrenheit'),
        $forecast = $weather.find('#forecast'),
        $search = $wrapper.find('search'),
        $form = $search.find('form'),
        $button = $form.find('#button');

    $.ajax({
        dataType: 'json',
        url: 'https://ipapi.co/118.139.69.56/json'
    })
        .then(function (data) {
            var yourLocation = data.city + ',' + data.postal + ',' + data.country;
            getWeather(yourLocation);
        });

    function getWeather(input) {

        var appid = '58b6f7c78582bffab3936dac99c31b25';
        var requestWeather = $.ajax({
            dataType: 'json',
            url: '//api.openweathermap.org/data/2.5/weather',
            data: {
                q: input,
                units: 'imperial',
                appid: appid
            }
        });
        var requestForecast = $.ajax({
            dataType: 'json',
            url: '//api.openweathermap.org/data/2.5/forecast/daily',
            data: {
                q: input,
                units: 'imperial',
                cnt: '6',
                appid: appid
            }
        });

        $fahrenheit.addClass('active').removeAttr('href');
        $celsius.removeClass('active').attr("href", '#');
        $icon.removeClass();
        $button.removeClass().addClass('button transparent');

        requestWeather.done(function (data) {

            var weather = document.getElementById('weather');
            if (data.cod === '404') {
                $city.html('city not found');
                setBackground('color404', 'button404');
                weather.style.display = 'none';
            } else weather.style.display = '';

            var dt = new Date(data.dt * 1000).toString().split(' ');

            var title = data.sys.country
                ? data.name + ', ' + data.sys.country
                : data.name;

            $city.html(title);
            $tempNumber.html(Math.round(data.main.temp));
            
            $description.html(titleCase(data.weather[0].description));
            $wind.html('Wind: ' + data.wind.speed + ' mph');
            $humidity.html('Humidity ' + data.main.humidity + '%');
            $dt.html(fullDay(dt[0]) + ' ' + dt[4].substring(0, 5));
          //  alert(fullDay(dt[0]) );//sunday

            $celsius.on('click', toCelsius);
            $fahrenheit.on('click', toFahrenheit);

            function toCelsius() {
                $(this).addClass('active').removeAttr('href');
                $fahrenheit.removeClass('active').attr('href', '#');
                $tempNumber.html(Math.round((data.main.temp - 32) * (5 / 9)));

            }

            function toFahrenheit() {
                $(this).addClass('active').removeAttr('href');
                $celsius.removeClass('active').attr("href", '#');
                $tempNumber.html(Math.round(data.main.temp));
            }

            function setBackground(background, button) {
                $('body').removeClass().addClass(background);
                $button.off().hover(function () {
                    $(this).removeClass('transparent').addClass(button);
                }, function () {
                    $(this).removeClass().addClass('button transparent');
                });
            }

            if (data.main.temp >= 80) setBackground('hot', 'button-hot');
            else if (data.main.temp >= 70) setBackground('warm', 'button-warm');
            else if (data.main.temp >= 60) setBackground('cool', 'button-cool');
            else setBackground('cold', 'button-cold');

            switch (data.weather[0].icon) {
                case '01d':
                    $icon.addClass('wi wi-day-sunny');
                    break;
                case '02d':
                    $icon.addClass('wi wi-day-sunny-overcast');
                    break;
                case '01n':
                    $icon.addClass('wi wi-night-clear');
                    break;
                case '02n':
                    $icon.addClass('wi wi-night-partly-cloudy');
                    break;
            }

            switch (data.weather[0].icon.substr(0, 2)) {
                case '03':
                    $icon.addClass('wi wi-cloud');
                    break;
                case '04':
                    $icon.addClass('wi wi-cloudy');
                    break;
                case '09':
                    $icon.addClass('wi wi-showers');
                    break;
                case '10':
                    $icon.addClass('wi wi-rain');
                    break;
                case '11':
                    $icon.addClass('wi wi-thunderstorm');
                    break;
                case '13':
                    $icon.addClass('wi wi-snow');
                    break;
                case '50':
                    $icon.addClass('wi wi-fog');
                    break;
            }
        });

        requestForecast.done(function (data) {

            $celsius.on('click', toCelsius);
            $fahrenheit.on('click', toFahrenheit);

            var forecast = [];
            var length = data.list.length;

            var sizex = document.getElementById("ddlday").length;

            if (sizex > 5) {

                var x = document.getElementById("ddlday");
                x.remove(1);
                x.remove(2);
                x.remove(3);
                x.remove(4);
                x.remove(5);
            }

            var html = '<select name="Day" id="ddlday" onchange="leaveChange()" ><option value="All">All</option></select>';
            $("#ddlday").replaceWith(html);

            for (var i = 1; i < length; i++) {
                forecast.push({
                    date: new Date(data.list[i].dt * 1000).toString().split(' ')[0],
                    fahrenheit: {
                        high: Math.round(data.list[i].temp.max),
                        low: Math.round(data.list[i].temp.min),
                    },
                    celsius: {
                        high: Math.round((data.list[i].temp.max - 32) * (5 / 9)),
                        low: Math.round((data.list[i].temp.min - 32) * (5 / 9))

                    }

                });

                //  var sizex = document.getElementById("ddlday").length;
                //  alert(sizex);
                //if (sizex < 7) { 


                var x = document.getElementById("ddlday");
                var option = document.createElement("option");
                option.text = new Date(data.list[i].dt * 1000).toString().split(' ')[0].toString();
                option.value = i;

                x.add(option);
             
                if (i == 1) {
                    document.getElementById("ct1").innerHTML = "" + Math.round((data.list[i].temp.max - 32) * (5 / 9)) + "°C";
                    Suggestion(data.list[i].temp.max, data.list[i].temp.min, "sg1");
                }

                else if (i == 2) {
                    document.getElementById("ct2").innerHTML = "" + Math.round((data.list[i].temp.max - 32) * (5 / 9)) + "°C";
                    var temp = Math.round((data.list[i].temp.max - 32) * (5 / 9));
                    //Suggestion((Math.round((data.list[i].temp.max - 32) * (5 / 9))), "sg2");
                    Suggestion(data.list[i].temp.max, data.list[i].temp.min, "sg2");
                }
                else if (i == 3) {
                    document.getElementById("ct3").innerHTML = "" + Math.round((data.list[i].temp.max - 32) * (5 / 9)) + "°C";
                    //Suggestion((Math.round((data.list[i].temp.max - 32) * (5 / 9))), "sg3");
                    Suggestion(data.list[i].temp.max, data.list[i].temp.min, "sg3");
                }
               
                else if (i == 4) {
                    document.getElementById("ct4").innerHTML = "" + Math.round((data.list[i].temp.max - 32) * (5 / 9)) + "°C";
                    //Suggestion((Math.round((data.list[i].temp.max - 32) * (5 / 9))), "sg4");
                    Suggestion(data.list[i].temp.max, data.list[i].temp.min, "sg4");
                }
                 
                else if (i == 5) {
                    document.getElementById("ct5").innerHTML = "" + Math.round((data.list[i].temp.max - 32) * (5 / 9)) + "°C";
                    //Suggestion((Math.round((data.list[i].temp.max - 32) * (5 / 9))), "sg5");
                    Suggestion(data.list[i].temp.max, data.list[i].temp.min, "sg5");
                }
                //}   
         
            }

            function toCelsius() {
                doForecast('celsius');
            }

            function toFahrenheit() {
                doForecast('fahrenheit');
            }

            function doForecast(unit) {
                var arr = [];
                var length = forecast.length;
                for (var i = 0; i < length; i++) {
                    arr[i] = ("<div class='block'><h3 class='secondary'>" + forecast[i].date + "</h3><h2 class='high'>" + forecast[i][unit].high + "</h2><h4 class='secondary'>" + forecast[i][unit].low + "</h4></div>");
             

                    if (i == 0)
                        document.getElementById("d1").innerHTML = forecast[i].date;
                    else if (i == 1)
                        document.getElementById("d2").innerHTML = forecast[i].date;
                    else if (i == 2)
                        document.getElementById("d3").innerHTML = forecast[i].date;
                    else if (i == 3)
                        document.getElementById("d4").innerHTML = forecast[i].date;
                    else if (i == 4)
                        document.getElementById("d5").innerHTML = forecast[i].date;

                }
                $forecast.html(arr.join(''));
            }

            doForecast('fahrenheit');
        });
    }

    $form.submit(function (event) {
        var input = document.getElementById('search').value;
        var inputLength = input.length;
        if (inputLength) getWeather(input);
        event.preventDefault();
    });

});
$(".cc-more").click(function () {
    $(".nature-total").hide();
    $("#even-nature").hide();
    $(".nature-more").show();
});
//$('.fancybox').on('click', function (e) {
//    e.preventDefault();
//    console.log($(this).data('url'));
//});
//$("select").on('change', function () {
//    var html1 = '<div class="row cc-row cc-container" > <div class="col-sm-4 col-xs-12"><figure class="wow fadeInLeft animated portfolio-item animated" data-wow-duration="500ms" data-wow-delay="0ms" style="visibility: visible; animation-duration: 300ms; -webkit-animation-duration: 300ms; animation-delay: 0ms; -webkit-animation-delay: 0ms; animation-name: fadeInLeft; -webkit-animation-name: fadeInLeft;"><div class="img-wrapper"><img src="images/portfolio/item-1.jpg" class="img-responsive" alt="this is a title"><div class="overlay"><div class="buttons"><a rel="gallery" class="fancybox" href="images/portfolio/item-1.jpg">Detailed</a></div></div></div></figure></div></div>';
//    var a = this.value;
//    $("div.cc-container").replaceWith(a);
//    console.log(a);
//});

// Inside mel nature
$("#inside").click(function () {
    $(".nature-total").hide();
    $("#even-nature").hide();
    $(".nature-more").hide();
    $(".outside").hide();
    $(".inside").show();
});

// Outside mel nature
$("#outside").click(function () {
    $(".nature-total").hide();
    $("#even-nature").hide();
    $(".nature-more").hide();
    $(".outside").show();
    $(".inside").hide();
});


$("#event-nat").click(function () {
    $('html, body').animate({ scrollTop: $("#even-nature").offset().top }, 500, 'linear');
});

//$(function () {
//    $('#event-nat').on('click', function () {
        
//        $('html, body').animate({ scrollTop: $("#even-nature").offset().top }, 500, 'linear');
//    });
//});



$(".close").click(function () {
    $("#nature-choose").hide();
})


/* Sports single dog */
//var row2 = '</div>';
//var row3 = '<div class="container" id="cc-img-wrapper">';
$(".cc-img-wrapper1").click(function () {
    ////var i;
    //var html = '';
    ////for (i = 0; i < 10; i++) {
    ////html += '<div class="row"> <div class="col-xs-3 head-sports wow fadeInLeftBig animated" data-wow-delay=".3s" data-wow-duration="1000ms"> <img src="/Content/images/sports/yoga.png"/> </div><div class="col-xs-9 wow fadeInUp animated" data-wow-delay=".5s" data-wow-duration="1000ms"> <div class="speech"> <div class="overlay"> <p><b>Yoga</b> is a activity which can be performed at home or in a natural space. Various studies have consistently proven the usefulness of Yoga and how it affects people suffering from depression, ADHD, stress or the people who are prone to it. Some of its useful and recommended yoga asanas to prevent mental health is Corpse Pose (Savasana), headstand (Sirsasana), Legs Up the Wall Pose (Viparita Karani) etc.</p><div> <iframe width="300" height="215" src="https://www.youtube.com/embed/Ja5lkB3aFBI?autoplay=0" frameborder="0" allowfullscreen></iframe></div></div></div></div></div><div class="row"> <div class="col-xs-9 wow fadeInUp animated" data-wow-delay=".5s" data-wow-duration="1000ms"> <div class="speech-right"> <div class="overlay"> <p><b>Running/Walking</b> Stressed or anxious??? Lace up your shoes and go for a spin. Running and walking is the among the best exercise to get relieved and feel jolly. Multiple studies have proven that running and walking have significant amount of benefits, especially on the mental health. Some of the benefits include alleviating anxiety, improved sleep patterns, boosting self-esteem and protecting the brain from aging.</p><div> <iframe width="300" height="215" src="https://www.youtube.com/embed/Z16hyGgemgY?autoplay=0" frameborder="0" allowfullscreen></iframe></div></div></div></div><div class="col-xs-3 head-sports wow fadeInRightBig animated" data-wow-delay=".3s" data-wow-duration="1000ms"> <img src="/Content/images/sports/running.png"/> </div></div><div class="row"> <div class="col-xs-3 head-sports wow fadeInLeftBig animated" data-wow-delay=".3s" data-wow-duration="1000ms"> <img src="/Content/images/sports/cycling.png"/> </div><div class="col-xs-9 wow fadeInUp animated" data-wow-delay=".5s" data-wow-duration="1000ms"> <div class="speech"> <div class="overlay"> <p><b>Cycling</b> In today’s stressful environment, people are always looking to find ways to relax and like running and walking, cycling is among the most common individual sport activity people tend to do. The Psychological benefits of cycling are proven in so many researches and yet incredibly under-publicized. Some of its benefits include reducing the risk of depression through ease of mind, helping with sleep insomnia, helps in reducing stress and the list just goes on.</p><div> <iframe width="300" height="215" src="https://www.youtube.com/embed/mIvX0s-ceHk?autoplay=0" frameborder="0" allowfullscreen></iframe></div></div></div></div></div><div class="row"> <div class="col-xs-9 wow fadeInUp animated" data-wow-delay=".5s" data-wow-duration="1000ms"> <div class="speech-right"> <div class="overlay"> <p><b>Swimming</b> Like other mentioned in this list, swimming can also be a great stress buster and have a positive impact on the individual’s health and well-being, whether physically or mentally and at greater extent than others. Researchers believe that swimming for half an hour, 3 times a week can lower stress levels, raise mood and decrease the incidences of depression and anxiety.</p><div> <iframe width="300" height="215" src="https://www.youtube.com/embed/608ClNBaBHo?autoplay=0" frameborder="0" allowfullscreen></iframe></div></div></div></div><div class="col-xs-3 head-sports wow fadeInRightBig animated" data-wow-delay=".3s" data-wow-duration="1000ms"> <img src="/Content/images/sports/swimming.png"/> </div></div><div class="row"> <div class="col-xs-3 head-sports wow fadeInLeftBig animated" data-wow-delay=".3s" data-wow-duration="1000ms"> <img src="/Content/images/sports/wkdog.png"/> </div><div class="col-xs-9 wow fadeInUp animated" data-wow-delay=".5s" data-wow-duration="1000ms"> <div class="speech"> <div class="overlay"> <p><b>Dog Walking</b> Activity like dog walking benefits the individual at great extent. It pushes the individual to go out in the nature and feel positive. Its benefit may include building social connections, improved cardiovascular fitness, lower blood pressure and decreased stress.</p><div> <iframe width="300" height="215" src="https://www.youtube.com/embed/6-DRAV6JSO0?autoplay=0" frameborder="0" allowfullscreen></iframe></div></div></div></div></div><div class="row"> <div class="col-xs-9 wow fadeInUp animated" data-wow-delay=".5s" data-wow-duration="1000ms"> <div class="speech-right"> <div class="overlay"> <p><b>Squash</b> Squash is a game which is suitable for every age group and played in a four-walled court with a small, hollow rubber ball and requires a lot more energy than other sports. It is easier to learn and can be modified according to the skill level and available equipment. Its benefit to mental health clearly overcomes the benefit of physical health. Its benefit includes stress release, improved concentration, improved social well-being etc.</p><div> <iframe width="300" height="215" src="https://www.youtube.com/embed/9rWdxb2U88U?autoplay=0" frameborder="0" allowfullscreen></iframe></div></div></div></div><div class="col-xs-3 head-sports wow fadeInRightBig animated" data-wow-delay=".3s" data-wow-duration="1000ms"> <img src="/Content/images/sports/squash.jpg"/> </div></div>';
    ////}
    //html = row3 + html + row2;
    //$("#cc-img-wrapper").replaceWith(html);
    $("#cc-img-wrapper").show();
    $("#spfb").hide();
});



/* Sports Events */
$(".cc-img-wrapper2").click(function () {
    //var html = '';
    ////   for (i = 0; i < 10; i++) {
    ////   html += '<div class="col-sm-4 col-xs-12"> <figure class="wow fadeInLeft animated portfolio-item animated" data-wow-duration="500ms" data-wow-delay="0ms" style="visibility: visible; animation-duration: 300ms; -webkit-animation-duration: 300ms; animation-delay: 0ms; -webkit-animation-delay: 0ms; animation-name: fadeInLeft; -webkit-animation-name: fadeInLeft;"><div class="img-wrapper"> <img src="images/portfolio/item-1.jpg" class="img-responsive" alt="this is a title"><div class="overlay"><div class="buttons"> <a rel="gallery" class="fancybox" href="images/portfolio/item-1.jpg">Detailed</a></div></div></div> </figure></div><div class="col-sm-4 col-xs-12"> <figure class="wow fadeInLeft animated animated" data-wow-duration="500ms" data-wow-delay="300ms" style="visibility: visible; animation-duration: 300ms; -webkit-animation-duration: 300ms; animation-delay: 300ms; -webkit-animation-delay: 300ms; animation-name: fadeInLeft; -webkit-animation-name: fadeInLeft;"><div class="img-wrapper"> <img src="images/portfolio/item-2.jpg" class="img-responsive" alt="this is a title"><div class="overlay"><div class="buttons"> <a rel="gallery" class="fancybox" href="images/portfolio/item-2.jpg">Detailed</a></div></div></div> </figure></div><div class="col-sm-4 col-xs-12"> <figure class="wow fadeInLeft animated animated" data-wow-duration="500ms" data-wow-delay="300ms" style="visibility: visible; animation-duration: 300ms; -webkit-animation-duration: 300ms; animation-delay: 300ms; -webkit-animation-delay: 300ms; animation-name: fadeInLeft; -webkit-animation-name: fadeInLeft;"><div class="img-wrapper"> <img src="images/portfolio/item-2.jpg" class="img-responsive" alt="this is a title"><div class="overlay"><div class="buttons"> <a rel="gallery" class="fancybox" href="images/portfolio/item-2.jpg">Detailed</a></div></div></div> </figure></div>';

    //// }
    //html = row3 + html + row2;
    //$("#cc-img-wrapper").replaceWith(html);
    $("#cc-img-wrapper").hide();
    $("#spfb").show();
});

/*Landing page statistics */
//$('#cc-lines').animateNumber({ number: 165 });
setTimeout(function () { $('#cc-lines').animateNumber({ number: 3000000 }, 2000) }, 2000);



/***************************************/
/* cc-pop */
/*****************************************/
// Get the modal
var modal = document.getElementById('cc-modal');

// Get the button that opens the modal
var ccpopmyBtn = document.getElementById("cc-pop-myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//When the user clicks on the button, open the modal 
ccpopmyBtn.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


$(document).ready(function () {
    modal.style.display = "block";
});


// Schedule main part !
// intro button click
$(".intro-schedule").click(function () {
    $("#des-schedule").hide();
    $("#first-question").show();
    $("#nature-question").hide();
    $("#sports-question").hide();
});
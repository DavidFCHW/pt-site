$(document).ready(function(){
    let title = $("head title").text();
    if(title === "Pilgrim Tabernacle"){
        $.getJSON("data/sermons.json", function (data) {
            let obj = data[0];
            $("#f-sermon-title").text(data[0].title);
            $("#f-speaker").text(data[0].speaker);
            $("#f-date").text(data[0].date);
            $("#f-player").attr("src", data[0].path);

            $("#s-sermon-title").text(data[1].title);
            $("#s-speaker").text(data[1].speaker);
            $("#s-date").text(data[1].date);
            $("#s-player").attr("src", data[1].path);
        });
    } else if(title === "Sermons"){
        console.log("This isn't the homepage");
    }
});
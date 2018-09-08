$(document).ready(function(){
    let title = $("head title").text();
    if(title === "Pilgrim Tabernacle"){
        $.getJSON("data/sermons.json", function (data) {
            $("#f-sermon-title").text(data[0].title);
            $("#f-scripture").text(data[0].scripture);
            $("#f-speaker").text("By " + data[0].speaker);
            $("#f-date").text(data[0].date_pretty);
            $("#f-player").attr("src", data[0].path);

            $("#s-sermon-title").text(data[1].title);
            $("#s-scripture").text(data[1].scripture);
            $("#s-speaker").text("By " + data[1].speaker);
            $("#s-date").text(data[1].date_pretty);
            $("#s-player").attr("src", data[1].path);
        });
    } else if(title === "Sermons"){
        console.log("This isn't the homepage");
        $.getJSON("data/sermons.json", sermons => {
           sermons.forEach(sermon => {
               $(".list-group").append("<li class=\"list-group-item\">" +
                   "<h6>" + sermon.title + "<span>" + sermon.date_pretty + "</span>" +"</h6>" +
                   "<audio class='sermon-list-player'" + "src= '" + sermon.path + "' controls></audio>"+ "<br>"+
                   "<span class='speaker'>Speaker: " + sermon.speaker +"</span>"+
                   "<span class='scripture'> Scripture: " + sermon.scripture + "</span>"+
                   "</li>");
           });
        });
        $('#search').on('click','button', event => {
            event.preventDefault(); //to skip over the form's default "action" attribute.
            $('.list-group-item').remove();
            let searchVal = $(':text').val().toLowerCase();
            if(searchVal != null){
                $.getJSON('data/sermons.json', sermons => {
                    sermons.forEach(sermon => {
                        let sermon_pretty = sermon.title.toLowerCase().trim().includes(searchVal);
                        if(sermon_pretty){
                            $(".list-group").append("<li class=\"list-group-item\">" +
                                "<h6>" + sermon.title + "<span style='display: inline-block; float: right'>" + sermon.date_pretty + "</span>" +"</h6>" + //put two elements on the same line
                                "</li>");
                        }
                    })
                })
            }
        });
        /*$("input").keypress(function(){
            event.preventDefault(); //to skip over the form's default "action" attribute.
            $('.list-group-item').remove();
            let searchVal = $(':text').val().toLowerCase();
            if(searchVal != null){
                $.getJSON('data/sermons.json', sermons => {
                    sermons.forEach(sermon => {
                        let sermon_pretty = sermon.title.toLowerCase().trim().includes(searchVal);
                        if(sermon_pretty){
                            $(".list-group").append("<li class=\"list-group-item\">" +
                                "<h6>" + sermon.title + "<span style='display: inline-block; float: right'>" + sermon.date_pretty + "</span>" +"</h6>" + //put two elements on the same line
                                "</li>");
                        }
                    })
                })
            }
        });*/
    }
});
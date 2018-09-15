$(document).ready(function(){
    let title = $("head title").text();
    /*if(title != "Pilgrim Tabernacle"){
        $(".jumbotron .container").prepend("<h1 class='display-1'>"+title+"</h1>");
    }*/
    $(".jumbotron .container").prepend("<h1 class='display-1'>"+title+"</h1>");
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
        function setAccordion(sermon, x){
            $(".accordion").append(
                "<div class='card'>" +
                    "<div class='card-header bg-light' id='" + x + "'>" +
                        "<h6 class='mb-0'>" +
                            "<button class='btn btn-outline-light text-dark btn-link' type='button' data-toggle='collapse' data-target='#collapse" + x +"' aria-expanded='true' aria-controls='collapse" + x +"'>" +
                                "<b>"+sermon.title+"</b>" +
                            "</button>" +
                            "<span>"+sermon.date_pretty+"</span>"+
                        "</h6>" +
                    "</div>"+
                    "<div id='collapse"+ x +"' class='collapse' aria-labelledby='" + x + "' data-parent='#sermon-accordion'>" +
                        "<div class='card-body'>" +
                            "<audio class='sermon-list-player'" + "src= '" + escape(sermon.path) + "' controls></audio>"+ "<br>"+
                            "<span class='speaker'>Speaker: " + sermon.speaker +"</span>"+
                            "<span class='scripture'> Scripture: " + sermon.scripture + "</span>"+
                        "</div>" +
                    "</div>"+
                "</div>"
            );
        }
        function setAccordion2(sermon, x){
            $(".accordion").append(
                "<div class='card'>" +
                    "<div class='card-header bg-light' id='" + x + "'>" +
                        "<h6 class='mb-0'>" +
                            "<button class='btn btn-outline-light text-dark btn-link' type='button' data-toggle='collapse' data-target='#collapse" + x +"' aria-expanded='true' aria-controls='collapse" + x +"'>" +
                                "<b>"+sermon.title+"</b>" +
                            "</button>" +
                            "<span>"+sermon.date_pretty+"</span>"+
                        "</h6>" +
                    "</div>"+
                    "<div id='collapse"+ x +"' class='collapse' aria-labelledby='" + x + "' data-parent='#sermon-accordion'>" +
                        "<div class='card-body'>" +
                            "<audio class='sermon-list-player'" + "src= '" + sermon.path + "' controls></audio>"+ "<br>"+
                            "<span class='speaker'>Speaker: " + sermon.speaker +"</span>"+
                            "<span class='scripture'> Scripture: " + sermon.scripture + "</span>"+
                        "</div>" +
                    "</div>"+
                "</div>"
            );
        }
        $.getJSON("data/sermons.json", sermons => {
            let x = 0;
           sermons.forEach(sermon => {
               if(!sermon.path.includes('dropbox')){
                   setAccordion(sermon, x);
                   x++;
               } else{
                   setAccordion2(sermon, x);
                   x++;
               }
           });
        });
        $('#search').on('click','button', event => {
            event.preventDefault(); //to skip over the form's default "action" attribute.
            $('.card').remove();
            let searchVal = $(':text').val().toLowerCase();
            if(searchVal != null){
                $.getJSON('data/sermons.json', sermons => {
                    let x=0;
                    sermons.forEach(sermon => {
                        let sermon_pretty = sermon.title.toLowerCase().trim().includes(searchVal);
                        if(sermon_pretty){
                            if(!sermon.path.includes('dropbox')){
                                setAccordion(sermon, x);
                                x++;
                            } else{
                                setAccordion2(sermon, x);
                                x++;
                            }
                        }
                    })
                })
            }
        });
        $.getJSON('data/sermons.json', data => {
            for(let i = 1; i <= data[data.length - 1].pages; i++){
                $('.page-buttons').append(" " + "<button class='btn btn-outline-dark' type='button' id=" + i + ">" + i + "</button>");
            }
        });
        $('.page-buttons').on('click', 'button', function(){
            $('.card').remove();
            let page = $(this).attr('id');
            $.getJSON('data/sermons.json', data =>{
                let page_data = data.filter(sermon => sermon.pages == page);
                let x = 0;
                page_data.forEach(sermon => {
                    if(!sermon.path.includes('dropbox')){
                        setAccordion(sermon, x);
                        x++;
                    } else{
                        setAccordion2(sermon, x);
                        x++;
                    }
                })
            });
        })
    } else if(title === "About Us"){

    }
});
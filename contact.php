<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Contact Us</title>
        <link rel="stylesheet" type="text/css" href="styles/main.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords" contents="Gospel, Jesus, Christ, Church, Evangelism, Pilgrim Tabernacle, Wood Green">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <script src="node_modules/jquery/dist/jquery.js"></script>
        <script src="node_modules/bootstrap/dist/js/bootstrap.js"></script>
        <script type="text/javascript" src="scripts/frontend.js"></script>
        <noscript>Your browser does not support JavaScript. Please use a browser like Chrome (recommended) or Mozilla Firefox.
            Or perhaps have JavaScript enabled on your browser.</noscript>
    </head>
    <body>
        <header class="def-header">
            <div class="container">
                <div class="row">
                    <div class="logo col-md-6 col-lg-4 col-sm-12 col-xs-12">
                        <a class="site-title" href="index.html"><h2>PILGRIM TABERNACLE</h2></a>
                    </div>
                    <div class="links col-md-6 col-lg-8 col-sm-12 col-xs-12">
                        <!-- possibly make the links buttons instead of anchor tag !-->
                        <ul class="menu">
                            <li><h6><a href="index.html">Home</a></h6></li> &nbsp;
                            <li><h6><a href="about.html">About Us</a></h6></li> &nbsp;
                            <li><h6><a href="sermons.html">Sermons</a></h6></li> &nbsp;
                            <li><h6><a href="location.html">Location</a></h6></li> &nbsp;
                            <li><h6><a href="contact.php">Contact</a></h6></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <main class="homepage">
            <div class="jumbotron jumbotron-fluid text-white text-center bg-secondary">
                <div class="container">

                </div>
            </div>
            <div class="container">
                <!--<p>At the moment you can contact our minister John Sherwood via his mobile on 07814507432. In the near future there will be other forms of contact. Thank you for your patience.</p>-->
                <p>If you have any questions or enquiries about the bible or about the church, please feel free to contact us via the form below, and we will try our best to get back to you as soon as possible*.
                Messages will be sent to our church email: contactus@pilgrimtabernacle.co.uk. You can also email us directly using this address.</p>
            </div>
            <!--<div class="container">
                <form>
                    Name (required):<br><input type="text"><br><br>
                    Email (required):<br><input type="text"><br><br>
                    Message(required):<br><textarea></textarea><br><br>
                </form>
            </div>-->
            <div class="container">
                <form method="post" action="<?php echo htmlspecialchars("scripts/email.php"); ?>" >
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="input-name">Name (required)</label>
                            <input type="text" class="form-control" id="input-name" name="name" placeholder="Name" required>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="input-email">Email (required)</label>
                            <input type="email" class="form-control" id="input-email" name="email" placeholder="Email" required>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="input-mobile">Mobile</label>
                            <input type="text" class="form-control" id="input-mobile" name="mobile" placeholder="Mobile">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="input-message">Message (required)</label>
                            <textarea class="form-control" id="input-message" name="message" placeholder="Put message in here..." required></textarea>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <button type="submit" class="btn btn-outline-secondary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <br>
            <div class="container">
                <p>Alternatively, you can also contact our minister John Sherwood via his mobile on 07814507432.<br></p>
                   <p style="padding-bottom:10px;"><small>*Upon sending your message, you should receive an email informing you that we have received your email. This email should NOT be replied to. Thank you and God bless.</small></p>
            </div>
        </main>
        <footer class="footer bg-light">
            <div class="container">
                <!--<p>&copy; Pilgrim Tabernacle</p>-->
                <p><b>Contact Us: 07814507432</b></p>
            </div>
        </footer>
    </body>
</html>
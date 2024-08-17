// Create an iframe for the overlay
let overlayIframe = document.createElement('iframe');
overlayIframe.className = 'overlay';
overlayIframe.style.position = 'fixed';
overlayIframe.style.top = '0';
overlayIframe.style.left = '0';
overlayIframe.style.width = '100%';
overlayIframe.style.height = '100%';
overlayIframe.style.zIndex = '9999';
overlayIframe.style.border = 'none';
overlayIframe.style.backgroundColor = 'transparent';

// Create the overlay HTML content
const overlayHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Overlay</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <style>
        /* General Styles */
        html, body {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #252525;
            color: #ffffff;
        }

        /* Wrapper to make the footer sticky */
        .wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100%;
        }

        /* Content Container */
        .content {
            flex: 1;
            padding: 20px;
            margin-left: 70px; /* Adjust this to move content away from sidebar */
        }

        /* Sidebar Styles */
        .sidebar {
            height: 100vh;
            width: 50px;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #1c1c1c;
            color: #ffffff;
            padding: 15px;
        }

        .sidebar ul {
            list-style-type: none;
            padding: 0;
        }

        .sidebar ul li {
            margin: 15px 0;
        }

        .sidebar ul li a {
            color: #fff;
            text-decoration: none;
            display: block;
            padding: 10px;
            border-radius: 4px;
        }

        .material-symbols-outlined {
            color: #5a5fec;
            font-size: 24px;
            transition: all 0.3s ease;
        }

        .material-symbols-outlined:hover {
            text-shadow: 0 0 8px #5a5fec, 0 0 16px #5a5fec, 0 0 24px #5a5fec;
        }

        /* Footer Styles */
        .footer {
            background-color: #333;
            color: #fff;
            padding: 20px 0;
            text-align: center;
            font-size: 14px;
        }

        .footer .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .footer-left p {
            margin-left: 80px;
        }

        .footer-right {
            display: flex;
        }

        .footer-links {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 15px;
        }

        .footer-links a {
            color: #fff;
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-links a:hover {
            color: #5a5fec;
        }

        /* Content Box Styles */
        .container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 20px;
        }

        .content-box {
            flex: 1;
            background-color: #424242;
            border-radius: 5px;
            padding: 20px;
            box-sizing: border-box;
            white-space: pre-wrap;
        }

        .bold {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="sidebar">
            <ul>
                <li><a href="https://example.com/home" target="_blank"><img src="https://i.imgur.com/DDLafqj.png" alt="Logo"></a></li>
                <li><a href="https://abhs.daymap.net/daymap/student/dayplan.aspx" target="_blank"><span class="material-symbols-outlined">home</span></a></li>
                <li><a href="https://example.com/profile" target="_blank"><span class="material-symbols-outlined">person</span></a></li>
                <li><a href="https://abhs.daymap.net/daymap/student/portfolio.aspx" target="_blank"><span class="material-symbols-outlined">menu_book</span></a></li>
                <li><a href="https://abhs.daymap.net/daymap/coms/Messaging.aspx" target="_blank"><span class="material-symbols-outlined">inbox</span></a></li>
                <li><a href="https://abhs.daymap.net/daymap/student/assignments.aspx" target="_blank"><span class="material-symbols-outlined">school</span></a></li>
                <li><a href="https://abhs.daymap.net/daymap/calendar/MyCalendar.aspx" target="_blank"><span class="material-symbols-outlined">calendar_month</span></a></li>
            </ul>
        </div>

        <div class="content">
            <div class="container">
                <div id="div1" class="content-box">Loading...</div>
                <div id="div2" class="content-box">Loading...</div>
                <div id="div3" class="content-box">
                    <div id="div3Content">Loading...</div>
                    <div id="div4Content">Loading...</div>
                </div>
            </div>
        </div>

        <footer class="footer">
            <div class="container">
                <div class="footer-left">
                    <p>&copy; 2024 Night Atlas. All rights reserved.</p>
                </div>
                <div class="footer-right">
                    <ul class="footer-links">
                        <li><a href="https://mileshedrick.com">Made by Miles</a></li>
                        <li><a href="https://github.com">Open-Source</a></li>
                        <li><a>Update 0.3.06</a></li>
                        <li><a>Time Spenton the project: 2h</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>

    <script>
        window.addEventListener('message', (event) => {
            if (event.data.type === 'UPDATE_TEXT') {
                document.getElementById('div1').innerHTML = event.data.div1Text || 'No content found';
                document.getElementById('div2').innerHTML = event.data.div2Text || 'No content found';
                document.getElementById('div3Content').innerHTML = event.data.div3Text || 'No content found';
                document.getElementById('div4Content').innerHTML = event.data.div4Text || 'No content found';
            }
        });
    </script>
</body>
</html>


`;

// Function to create a Blob URL for the overlay HTML
function createOverlayBlobURL(html) {
    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
}

// Set the iframe source to the Blob URL of the overlay HTML
overlayIframe.src = createOverlayBlobURL(overlayHTML);
document.body.appendChild(overlayIframe);

function getTextFromUnderlyingPage() {
    let div1Content = document.querySelector('#ctl00_cp_divEvents')?.innerHTML || 'Content not found';
    let div2Content = document.querySelector('#msgCnt')?.innerHTML || 'Content not found';
    let div3Content = document.querySelector('.sname')?.innerHTML || 'Content not found'; // Updated to select by class
    let div4Content = document.querySelector('#divIndicators')?.innerHTML || 'Content not found';

    return {
        div1Text: formatContent(div1Content),
        div2Text: formatContent(div2Content),
        div3Text: formatContent(div3Content),
        div4Text: formatContent(div4Content)
    };
}


// Helper function to format content and add bold text for days of the week
function formatContent(content) {
    let lines = content.split('\n');
    return lines.map(line => {
        if (/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/.test(line)) {
            return `<div class="bold">${line}</div>`;
        }
        return `<div>${line}</div>`;
    }).join('');
}

// Communicate with the iframe to send the formatted text
function updateOverlay() {
    let content = getTextFromUnderlyingPage();
    overlayIframe.contentWindow.postMessage({ 
        type: 'UPDATE_TEXT', 
        div1Text: content.div1Text, 
        div2Text: content.div2Text, 
        div3Text: content.div3Text, 
        div4Text: content.div4Text 
    }, '*');
}

// Add a delay before running the updateOverlay function
setTimeout(() => {
    updateOverlay();
    setInterval(updateOverlay, 5000); // Update every 5 seconds
}, 3000); // 3000ms delay (3 seconds)
